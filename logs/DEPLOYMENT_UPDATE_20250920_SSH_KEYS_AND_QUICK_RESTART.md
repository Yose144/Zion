# Deployment Update – 2025-09-20 – SSH klíče a rychlý restart

Shrnutí změn a operací provedených pro snížení nutnosti zadávání hesla a rychlý restart stacku.

## Změny ve zdrojích
- Přidán `scripts/ssh-key-setup.sh` – generuje ED25519 klíč, nainstaluje ho na server a nastaví SSH multiplexing (ControlMaster/ControlPersist) pro opakované příkazy bez hesla.
- Přidán `scripts/quick-restart-remote.sh` – rychlý restart vzdálených služeb (seed1, seed2, redis, rpc-shim, uzi-pool) přes docker compose.
- Vylepšen `scripts/ssh-redeploy-pool.sh` – doplněn hint na použití `ssh-key-setup.sh` nebo password-based `deploy-ssh-pool.sh` při chybě bezheslového přístupu.

## Provedené operace
1) Nastaveny SSH klíče a multiplexing na hostiteli macOS pro `root@91.98.122.165`.
2) Spuštěn rychlý restart – recreate/up všech služeb. Seed nody jsou healthy, pool běží na 3333.
3) Pool logy po restartu: přechodně `ECONNREFUSED` (po startu seed1) a následně `{"code":-9,"message":"Core is busy"}` při `getblocktemplate` – očekává se ustálení daemonu, případně prodloužení backoffu.

## Stav služeb (výňatek)
```
zion-seed1  Up (healthy)      18080-18081/tcp
zion-seed2  Up (healthy)      18080-18081/tcp
zion-redis  Up                6379/tcp
zion-rpc-shim Up              18089/tcp
zion-uzi-pool Up              3333/tcp
```

## Další kroky
- Nechat daemon chvíli ustálit; pokud `Core is busy` přetrvá, zvýšit intervaly (už sníženo na 5s) nebo provést jednorázový restart seed1.
- Spustit test miner a ověřit, že pool začíná přidělovat joby a akceptuje share.
