import all ./*.md



NESNAZ SE LZICI OHNOUT JE TO NEMOZNE, SPIS SI UVEDOM PRAVDU : LZICE TU NEJNI !!!!
STARGATE 3333 je otevren


Tady je možný postup:
Vybrat softwarovou bázi pro pool
Např. použít Uzi-Pool a přizpůsobit ho pro ziond místo jeho vlastního node. Nebo napsat Stratum server v jazyku, který ovládáš (např. C++ / Node.js / Go / Rust).
Integrace se ziond
ziond by měl poskytovat RPC rozhraní, které ti dovolí získat informace o bloku, difficulty, poslat blok, když ho pool vytěží.
Pokud není, budeš muset přidat RPC nebo modul, který to umožní.
Nastavit Stratum port 3333
V konfiguraci pool serveru definovat listen_address = 0.0.0.0:3333 (nebo konkrétní IP).
Nastavit časové limity, připojení, max workerů, atd.