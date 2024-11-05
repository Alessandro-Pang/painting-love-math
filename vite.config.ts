import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig((command) => {
  const base = command.mode === 'production' ? '/painting-love-math/' : '/'
  return {
    base,
    plugins: [vue()],
  }
})
