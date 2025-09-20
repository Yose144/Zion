// Zion RPC shim: exposes a Monero-like JSON-RPC for pool compatibility and calls ziond RPC underneath.

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
// Custom tolerant JSON parser to handle both single and batch requests
app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', () => {
    try {
      req.body = JSON.parse(data);
    } catch (e) {
      console.error('shim JSON parse error:', e.message, 'body snippet=', (data || '').slice(0, 100));
      req.body = undefined;
    }
    next();
  });
});

const URL_ENV = process.env.ZION_RPC_URLS || process.env.ZION_RPC_URL || 'http://seed1:18081/json_rpc';
const ZION_RPC_URLS = URL_ENV.split(',').map(s => s.trim()).filter(Boolean);
let CUR_URL_IDX = 0;
function currentRpcUrl() { return ZION_RPC_URLS[CUR_URL_IDX % ZION_RPC_URLS.length]; }
const PORT = parseInt(process.env.SHIM_PORT || '18089', 10);

// Low-level JSON-RPC call to ziond; throws Error with optional .code
async function zionRpc(method, params = {}) {
  const payload = { jsonrpc: '2.0', id: '0', method, params };
  try {
    const { data } = await axios.post(currentRpcUrl(), payload, { timeout: 8000 });
    if (data && data.error) {
      const err = new Error(data.error.message || 'ziond error');
      if (typeof data.error.code !== 'undefined') err.code = data.error.code;
      err.data = data.error.data;
      throw err;
    }
    return data && data.result;
  } catch (e) {
    // Preserve axios response error codes if present
    if (e.response && e.response.data && e.response.data.error) {
      const de = e.response.data.error;
      const err = new Error(de.message || e.message);
      if (typeof de.code !== 'undefined') err.code = de.code;
      err.data = de.data;
      throw err;
    }
    throw e;
  }
}

// Helper: try multiple method/param variants, return first success; else throw last error
async function tryVariants(variants) {
  const errors = [];
  for (const v of variants) {
    try {
      console.log('[shim->ziond]', v.method, JSON.stringify(v.params));
      const r = await zionRpc(v.method, v.params);
      return r;
    } catch (e) {
      const code = typeof e.code !== 'undefined' ? e.code : 'n/a';
      console.warn('[shim ziond error]', v.method, 'code=', code, 'msg=', e.message);
      errors.push(e);
      // Continue to next variant on method/param related errors
    }
  }
  // Prefer reporting a busy (-9) error if encountered, else the first error
  const busy = errors.find(er => typeof er.code !== 'undefined' && Number(er.code) === -9);
  if (busy) throw busy;
  if (errors.length) throw errors[0];
  throw new Error('all variants failed');
}

// Sleep helper
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Simple mutex to serialize getblocktemplate calls
let gbtInFlight = false;
async function withGbtMutex(fn) {
  // Wait until not in flight
  while (gbtInFlight) {
    await sleep(50);
  }
  gbtInFlight = true;
  try {
    return await fn();
  } finally {
    gbtInFlight = false;
  }
}

// Robust getblocktemplate with retry/backoff on transient busy errors
async function getBlockTemplateRobust(wal, reserve) {
  return withGbtMutex(async () => {
    // Force small reserve size to reduce payload/pressure
    reserve = 4;
    const variants = [
      // Keep only methods observed to exist in ziond; avoid underscore variant to prevent -32601 propagation
      { method: 'getblocktemplate', params: { wallet_address: wal, reserve_size: reserve } },
      { method: 'getblocktemplate', params: { address: wal, reserve_size: reserve } },
      { method: 'getblocktemplate', params: [wal, reserve] }
    ];
    let lastErr;
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        return await tryVariants(variants);
      } catch (e) {
        lastErr = e;
        if (typeof e.code !== 'undefined' && Number(e.code) === -9) {
          // Core is busy: back off and retry
          const delay = Math.min(5000, 250 + attempt * 500);
          console.warn(`[shim] getblocktemplate busy (-9), retrying in ${delay}ms (attempt ${attempt+1}/10)`);
          // rotate backend to spread load if multiple URLs configured
          if (ZION_RPC_URLS.length > 1) {
            CUR_URL_IDX = (CUR_URL_IDX + 1) % ZION_RPC_URLS.length;
            console.warn('[shim] rotating RPC backend to', currentRpcUrl());
          }
          await sleep(delay);
          continue;
        }
        // Non-busy error: stop immediately
        break;
      }
    }
    throw lastErr || new Error('getblocktemplate failed');
  });
}

async function handleSingle(id, method, params) {
  const m = (method || '').toString().toLowerCase();
  const mu = m.replace(/_/g, '');
  switch (mu) {
      // Height aliases
  case 'getheight': {
    const r = await tryVariants([
      { method: 'getheight', params: {} },
      { method: 'get_height', params: {} }
    ]);
        // Map to monero-like shape
        return { jsonrpc: '2.0', id, result: { height: r.height, count: r.height } };
      }
      case 'getinfo': {
        // Minimal getinfo emulation for pools that ping daemon state
        const h = await tryVariants([
          { method: 'getheight', params: {} },
          { method: 'get_height', params: {} }
        ]);
        return { jsonrpc: '2.0', id, result: { height: h.height, status: 'OK' } };
      }
      // Block template aliases
  case 'getblocktemplate': {
        // Pool may send object or array params. Accept both:
        // - Object: { wallet_address, reserve_size } or { address, reserve_size }
        // - Array: [wallet_address, reserve_size]
        let wal, reserve;
        if (Array.isArray(params)) {
          wal = params[0];
          reserve = params[1];
        } else {
          const { wallet_address, reserve_size, address, reserve_size: rs } = params || {};
          wal = address || wallet_address;
          reserve = typeof reserve_size !== 'undefined' ? reserve_size : rs;
        }
        // Sensible defaults
        if (typeof reserve === 'undefined' || reserve === null) reserve = 4;
        const r = await getBlockTemplateRobust(wal, reserve);
        // Map fields (template_blob, difficulty, height, seed_hash ... adjust as ziond provides)
        const result = {
          blocktemplate_blob: r.blocktemplate_blob || r.template || '',
          difficulty: r.difficulty,
          height: r.height,
          prev_hash: r.prev_hash || r.previous || '',
          seed_hash: r.seed_hash || '',
          reserved_offset: r.reserved_offset || 0
        };
        return { jsonrpc: '2.0', id, result };
      }
      // Submit block aliases
  case 'submitblock': {
        const blob = Array.isArray(params) ? params[0] : (params && (params.blob || params.block)) || undefined;
        const r = await tryVariants([
          { method: 'submitblock', params: [blob] },
          { method: 'submit_block', params: [blob] },
          { method: 'submitblock', params: { block: blob } },
          { method: 'submit_block', params: { block: blob } }
        ]);
        return { jsonrpc: '2.0', id, result: r || true };
      }
      // Optional helpers used by some pools
  case 'getblockcount': {
        const r = await tryVariants([
          { method: 'getheight', params: {} },
          { method: 'get_height', params: {} }
        ]);
        return { jsonrpc: '2.0', id, result: { count: r.height } };
      }
      case 'getlastblockheader': {
        try {
          const r = await tryVariants([
            { method: 'getlastblockheader', params: {} },
            { method: 'get_last_block_header', params: {} }
          ]);
          return { jsonrpc: '2.0', id, result: r };
        } catch (e) {
          // Fallback: return minimal header
          const h = await tryVariants([
            { method: 'getheight', params: {} },
            { method: 'get_height', params: {} }
          ]);
          return { jsonrpc: '2.0', id, result: { block_header: { height: h.height } } };
        }
      }
      default:
        return { jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not implemented in shim' } };
  }
}

app.post('/json_rpc', async (req, res) => {
  const body = req.body;
  try {
    // Simple logging of incoming methods for debugging
    if (Array.isArray(body)) {
      console.log('shim batch size=', body.length, 'methods=', body.map(x => x && x.method));
      const results = [];
      for (const call of body) {
        const out = await handleSingle(call.id, call.method, call.params);
        results.push(out);
      }
      return res.json(results);
    } else {
      const { id, method, params } = body || {};
      console.log('shim method=', method, 'params=', JSON.stringify(params));
      const out = await handleSingle(id, method, params);
      return res.status(out.error ? (out.error.code === -32601 ? 501 : 500) : 200).json(out);
    }
  } catch (e) {
    const id = (body && body.id) || '0';
    const code = typeof e.code !== 'undefined' ? e.code : -32000;
    return res.status(500).json({ jsonrpc: '2.0', id, error: { code, message: e.message || 'shim error' } });
  }
});

// Simple healthcheck & info
app.get('/', (_req, res) => {
  res.json({ status: 'ok', proxy: currentRpcUrl(), backends: ZION_RPC_URLS });
});

app.listen(PORT, () => {
  console.log(`zion-rpc-shim listening on 0.0.0.0:${PORT}, proxying to ${currentRpcUrl()}`);
});
