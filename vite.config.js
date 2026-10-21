import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Percorsi relativi: il sito funziona sia su <utente>.github.io/<repo>/ sia su un dominio custom.
  base: './',
})
