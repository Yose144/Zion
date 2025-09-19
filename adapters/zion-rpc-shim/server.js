// Zion RPC shim: exposes a Monero-like JSON-RPC for pool compatibility and calls ziond RPC underneath.

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '1mb' }));

const ZION_RPC_URL = process.env.ZION_RPC_URL || 'http://seed1:18081/json_rpc';
const PORT = parseInt(process.env.SHIM_PORT || '18089', 10);

async function zionRpc(method, params = {}) {
  // Expected ziond JSON-RPC endpoint and shape; adjust if different.
  const payload = { jsonrpc: '2.0', id: '0', method, params };
  const { data } = await axios.post(ZION_RPC_URL, payload, { timeout: 5000 });
  if (data.error) throw new Error(data.error.message || 'ziond error');
  return data.result;
}

app.post('/json_rpc', async (req, res) => {
  const { id, method, params } = req.body || {};
  try {
    switch (method) {
      case 'get_height': {
        const r = await zionRpc('get_height');
        // Map to monero-like shape
        return res.json({ jsonrpc: '2.0', id, result: { height: r.height } });
      }
      case 'get_block_template': {
        // Pool typically sends { wallet_address, reserve_size }
        const { wallet_address, reserve_size } = params || {};
        const r = await zionRpc('get_block_template', { address: wallet_address, reserve_size });
        // Map fields (template_blob, difficulty, height, seed_hash ... adjust as ziond provides)
        const result = {
          blocktemplate_blob: r.blocktemplate_blob || r.template || '',
          difficulty: r.difficulty,
          height: r.height,
          prev_hash: r.prev_hash || r.previous || '',
          seed_hash: r.seed_hash || '',
          reserved_offset: r.reserved_offset || 0
        };
        return res.json({ jsonrpc: '2.0', id, result });
      }
      case 'submit_block': {
        const r = await zionRpc('submit_block', { blob: params && params[0] ? params[0] : params?.blob });
        return res.json({ jsonrpc: '2.0', id, result: r || true });
      }
      default: {
        return res.status(501).json({ jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not implemented in shim' } });
      }
    }
  } catch (e) {
    return res.status(500).json({ jsonrpc: '2.0', id, error: { code: -32000, message: e.message || 'shim error' } });
  }
});

app.listen(PORT, () => {
  console.log(`zion-rpc-shim listening on 0.0.0.0:${PORT}, proxying to ${ZION_RPC_URL}`);
});
