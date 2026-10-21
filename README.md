# Poker Friday ♠

Classifica del poker del venerdì. Sito statico (Vue 3 + Vite) pubblicato su GitHub Pages.

## Aggiornare la classifica

Modifica solo `src/data/leaderboard.json`:

```json
{
  "updatedAt": "2026-10-24",
  "players": [
    { "name": "Floris", "wins": 3, "games": 7, "money": 42.5 }
  ]
}
```

- `avatar` — foto profilo in `public/avatars/` (facoltativa: senza, mostra le iniziali)
- `wins` — partite vinte
- `games` — partite giocate
- `money` — saldo totale in euro (può essere negativo)
- `updatedAt` — data dell'ultimo aggiornamento (`AAAA-MM-GG`)

La classifica è ordinata per soldi, poi vittorie, poi meno partite giocate; chi non ha ancora giocato sta in fondo. A parità completa vale l'ordine in cui i giocatori compaiono nel file.

Poi:

```sh
git commit -am "Aggiorna classifica"
git push
```

Il push su `main` avvia il workflow `.github/workflows/deploy.yml`, che builda e pubblica il sito in un paio di minuti.

## Sviluppo locale

```sh
npm install
npm run dev
```

## Prima pubblicazione

1. Crea un repository su GitHub (es. `pokerfriday`) e fai push di questo progetto sul branch `main`.
2. Su GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Il sito sarà su `https://<utente>.github.io/pokerfriday/`.
