import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths relative so the build works on any static host
// (GitHub Pages project sites, Netlify, a plain folder, ...).
export default defineConfig({
  base: './',
  plugins: [react()],
})
