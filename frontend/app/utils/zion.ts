export function isValidZionAddress(addr: string): boolean {
  // Align with relaxed pool regex: starts with Z or a, base58-like, length 95
  return /^[Za][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{94}$/.test(addr);
}

export function buildXmrigCommand(opts: {
  host: string;
  port?: number;
  address: string;
  algo?: string;
  rigId?: string;
  tls?: boolean;
}): string {
  const { host, port = 3333, address, algo = 'rx/0', rigId = 'WEB', tls = false } = opts;
  const url = `${tls ? 'stratum+ssl' : 'stratum+tcp'}://${host}:${port}`;
  return [
    'xmrig',
    `--url ${url}`,
    `--algo ${algo}`,
    `--user ${address}`,
    '--pass x',
    '--keepalive',
    `--rig-id ${rigId}`,
    '--donate-level 0',
  ].join(' ');
}
