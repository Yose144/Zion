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

const ZION_RPC_URL = process.env.ZION_RPC_URL || 'http://seed1:18081/json_rpc';
const PORT = parseInt(process.env.SHIM_PORT || '18089', 10);

async function zionRpc(method, params = {}) {
  // Expected ziond JSON-RPC endpoint and shape; adjust if different.
  const payload = { jsonrpc: '2.0', id: '0', method, params };
  const { data } = await axios.post(ZION_RPC_URL, payload, { timeout: 5000 });
  if (data.error) throw new Error(data.error.message || 'ziond error');
  return data.result;
}

async function handleSingle(id, method, params) {
  const m = (method || '').toString().toLowerCase();
  const mu = m.replace(/_/g, '');
  switch (mu) {
      // Height aliases
  case 'getheight': {
        const r = await zionRpc('get_height');
        // Map to monero-like shape
        return { jsonrpc: '2.0', id, result: { height: r.height, count: r.height } };
      }
      // Block template aliases
  case 'getblocktemplate': {
        // Pool typically sends { wallet_address, reserve_size }
        const { wallet_address, reserve_size, address } = params || {};
        const r = await zionRpc('get_block_template', { address: address || wallet_address, reserve_size });
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
        const r = await zionRpc('submit_block', { blob });
        return { jsonrpc: '2.0', id, result: r || true };
      }
      // Optional helpers used by some pools
  case 'getblockcount': {
        const r = await zionRpc('get_height');
        return { jsonrpc: '2.0', id, result: { count: r.height } };
      }
      case 'getlastblockheader': {
        try {
          const r = await zionRpc('get_last_block_header');
          return { jsonrpc: '2.0', id, result: r };
        } catch (e) {
          // Fallback: return minimal header
          const h = await zionRpc('get_height');
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
      console.log('shim method=', method);
      const out = await handleSingle(id, method, params);
      return res.status(out.error ? (out.error.code === -32601 ? 501 : 500) : 200).json(out);
    }
  } catch (e) {
    const id = (body && body.id) || '0';
    return res.status(500).json({ jsonrpc: '2.0', id, error: { code: -32000, message: e.message || 'shim error' } });
  }
});

app.listen(PORT, () => {
  console.log(`zion-rpc-shim listening on 0.0.0.0:${PORT}, proxying to ${ZION_RPC_URL}`);
});
