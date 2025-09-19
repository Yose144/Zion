# ZION Frontend (Next.js)

Minimal skeleton wired to the Amenti Library manifest in `../data/amenti/library.json`.

## Run

```bash
cd frontend
npm install
npm run dev
# open http://localhost:3000
```

Pages:
- `/` – Home
- `/amenti` – Amenti Library (reads via `/api/amenti`)

## Pool connectivity test

Testovací endpoint pro ověření Stratum poolu je dostupný na `/amenti/pool-test`.

Volitelná konfigurace host/port přes env proměnné:

```bash
export NEXT_PUBLIC_POOL_HOST=91.98.122.165
export NEXT_PUBLIC_POOL_PORT=3333
npm run dev
# open http://localhost:3000/amenti/pool-test
```

API route `/api/pool-test` naváže TCP spojení na pool a odešle JSON-RPC `login` s workerem `web-test`.
