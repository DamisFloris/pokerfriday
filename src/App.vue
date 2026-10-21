<script setup>
import { Crown } from 'lucide-vue-next'
import { computed } from 'vue'
import data from './data/leaderboard.json'

// Classifica: chi non ha mai giocato va in fondo; poi soldi totali, vittorie, meno partite giocate.
// A parità completa vale l'ordine del file JSON (il sort è stabile).
const compare = (a, b) =>
  (a.games === 0) - (b.games === 0) || b.money - a.money || b.wins - a.wins || a.games - b.games

const rows = computed(() => [...data.players].sort(compare).map((p, i) => ({ ...p, rank: i + 1 })))

const totalGames = computed(() => Math.max(0, ...data.players.map((p) => p.games)))

const money = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  signDisplay: 'exceptZero',
})

const updatedAt = new Date(`${data.updatedAt}T00:00:00`).toLocaleDateString('it-IT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const avatarUrl = (path) => import.meta.env.BASE_URL + path

const initials = (name) => {
  const words = name.split(/\s+/)
  return (words.length > 1 ? words.map((w) => w[0]).join('') : name).slice(0, 2).toUpperCase()
}

const tone = (v) => (v > 0 ? 'pos' : v < 0 ? 'neg' : 'zero')
</script>

<template>
  <main class="page">
    <header class="brand">
      <span class="suits" aria-hidden="true">♠ ♥ ♣ ♦</span>
      <h1>Poker <span>Friday</span></h1>
    </header>

    <p class="nights">
      <strong>{{ totalGames }}</strong>
      {{ totalGames === 1 ? 'serata giocata' : 'serate giocate' }}
    </p>

    <section class="board" aria-labelledby="board-title">
      <h2 id="board-title" class="sr-only">Classifica</h2>
      <table>
        <thead>
          <tr>
            <th scope="col" class="c-rank">#</th>
            <th scope="col" class="c-name">Giocatore</th>
            <th scope="col" class="c-num"><span class="long">Vittorie</span><abbr class="short" title="Vittorie">V</abbr></th>
            <th scope="col" class="c-num"><span class="long">Partite</span><abbr class="short" title="Partite">P</abbr></th>
            <th scope="col" class="c-num">Totale</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in rows" :key="p.name" :class="`rank-${p.rank}`">
            <td class="c-rank">
              <span class="badge">{{ p.rank }}</span>
            </td>
            <th scope="row" class="c-name">
              <span class="player">
                <span class="avatar">
                  <img v-if="p.avatar" :src="avatarUrl(p.avatar)" alt="" width="256" height="256" loading="lazy" />
                  <span v-else class="initials" aria-hidden="true">{{ initials(p.name) }}</span>
                  <Crown v-if="p.rank === 1" class="crown" aria-label="Primo classificato" />
                </span>
                <span class="player-name">{{ p.name }}</span>
              </span>
            </th>
            <td class="c-num">{{ p.wins }}</td>
            <td class="c-num">{{ p.games }}</td>
            <td class="c-num money" :class="tone(p.money)">{{ money.format(p.money) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <footer class="meta">
      Aggiornato il {{ updatedAt }}
    </footer>
  </main>
</template>
