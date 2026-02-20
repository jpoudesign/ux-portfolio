import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ux-portfolio/',
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        const out = join(__dirname, 'dist')
        const idx = join(out, 'index.html')
        const f404 = join(out, '404.html')
        if (existsSync(idx)) copyFileSync(idx, f404)
      },
    },
  ],
})
