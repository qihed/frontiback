import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Настройка base для GitHub Pages
  // Если репозиторий называется "frontiback", то base должен быть "/frontiback/"
  // Если это корневой репозиторий пользователя (username.github.io), то base = "/"
  base: '/frontiback/',
})
