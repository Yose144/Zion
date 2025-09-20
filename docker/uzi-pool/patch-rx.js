#!/usr/bin/env node
/*
  Runtime patcher for node-cryptonote-pool to support RandomX on ARM64 by:
  - Removing/bypassing CryptoNight multi-hashing paths (which crash on ARM64)
  - Injecting a processShare implementation that trusts miner's resultHash and
    computes difficulty via bignum only
  - Simplifying IsBannedIp to just return ban status (no share processing there)
*/

const fs = require('fs');
const path = '/app/lib/pool.js';

function apply() {
  if (!fs.existsSync(path)) {
    console.log('[patch-rx] pool.js not found, skipping');
    return;
  }
  let src = fs.readFileSync(path, 'utf8');
  const original = src;

  // 1) Simplify IsBannedIp function (remove corrupted cryptoNight code)
  src = src.replace(/function IsBannedIp\(ip\)\{[\s\S]*?\n\}\n/, (
    'function IsBannedIp(ip){\n' +
    '    if (!banningEnabled || !bannedIPs[ip]) return false;\n' +
    '    var bannedTime = bannedIPs[ip];\n' +
    '    var bannedTimeAgo = Date.now() - bannedTime;\n' +
    '    var timeLeft = config.poolServer.banning.time * 1000 - bannedTimeAgo;\n' +
    '    return timeLeft > 0;\n' +
    '}\n'
  ));

  // 2) Inject processShare before handleMinerMethod, only if not already present
  if (!/function\s+processShare\s*\(/.test(src)) {
    src = src.replace(/(function\s+handleMinerMethod\s*\()/, (
      "function processShare(miner, job, blockTemplate, nonce, resultHash){\n" +
      "    var shareType = 'trusted';\n" +
      "    if (!resultHash || typeof resultHash !== 'string' || resultHash.length !== 64){\n" +
      "        log('warn', logSystem, 'Malformed result hash from %s@%s', [miner.login, miner.ip]);\n" +
      "        return false;\n" +
      "    }\n" +
      "    var hash;\n" +
      "    try{ hash = Buffer.from(resultHash, 'hex'); } catch(e){\n" +
      "        log('warn', logSystem, 'Invalid result hash hex from %s@%s', [miner.login, miner.ip]);\n" +
      "        return false;\n" +
      "    }\n" +
      "    if (hash.toString('hex') !== resultHash.toLowerCase()){\n" +
      "        log('warn', logSystem, 'Bad hash from miner %s@%s', [miner.login, miner.ip]);\n" +
      "        return false;\n" +
      "    }\n" +
      "    var hashArray = hash.toJSON();\n" +
      "    if (hashArray && hashArray.data) hashArray = hashArray.data;\n" +
      "    hashArray.reverse();\n" +
      "    var hashNum = bignum.fromBuffer(Buffer.from(hashArray));\n" +
      "    var hashDiff = diff1.div(hashNum);\n" +
      "    if (hashDiff.ge(blockTemplate.difficulty)){\n" +
      "        try {\n" +
      "            if (cnUtil && cnUtil.construct_block_blob){\n" +
      "                var shareBuffer = cnUtil.construct_block_blob(blockTemplate, Buffer.from(nonce, 'hex'));\n" +
      "                apiInterfaces.rpcDaemon('submitblock', [shareBuffer.toString('hex')], function(error, result){\n" +
      "                    if (error){\n" +
      "                        log('error', logSystem, 'Error submitting block at height %d from %s@%s, share type: %s - %j', [job.height, miner.login, miner.ip, shareType, error]);\n" +
      "                        recordShareData(miner, job, hashDiff.toString(), false, null, shareType);\n" +
      "                    } else {\n" +
      "                        var blockFastHash = resultHash;\n" +
      "                        log('info', logSystem, 'Block %s found at height %d by miner %s@%s - submit result: %j', [blockFastHash.substr(0, 6), job.height, miner.login, miner.ip, result]);\n" +
      "                        recordShareData(miner, job, hashDiff.toString(), true, blockFastHash, shareType, blockTemplate);\n" +
      "                        jobRefresh();\n" +
      "                    }\n" +
      "                });\n" +
      "            } else {\n" +
      "                recordShareData(miner, job, hashDiff.toString(), true, resultHash, shareType, blockTemplate);\n" +
      "                jobRefresh();\n" +
      "            }\n" +
      "        } catch(e){\n" +
      "            log('error', logSystem, 'Block submit path failed: %j', [e && e.message ? e.message : e]);\n" +
      "            recordShareData(miner, job, hashDiff.toString(), true, resultHash, shareType, blockTemplate);\n" +
      "            jobRefresh();\n" +
      "        }\n" +
      "        return true;\n" +
      "    } else if (hashDiff.lt(job.difficulty)){\n" +
      "        log('warn', logSystem, 'Rejected low difficulty share of %s from %s@%s', [hashDiff.toString(), miner.login, miner.ip]);\n" +
      "        return false;\n" +
      "    } else {\n" +
      "        recordShareData(miner, job, hashDiff.toString(), false, null, shareType);\n" +
      "        return true;\n" +
      "    }\n" +
      "}\n\n$1"
    ));
  }

  if (src !== original) {
    fs.writeFileSync(path, src, 'utf8');
    console.log('[patch-rx] Patched pool.js for RandomX/ARM64');
  } else {
    console.log('[patch-rx] No changes applied (already patched?)');
  }
}

try { apply(); } catch (e) { console.error('[patch-rx] failed:', e && e.message ? e.message : e); process.exit(1); }
