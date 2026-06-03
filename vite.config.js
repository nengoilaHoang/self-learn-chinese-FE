import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import Page from '@vite/plugin-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //Page
  server: {
    // Sửa ngoặc vuông [] thành ngoặc nhọn {} cho server
    allowedHosts: ["fescrum.nengoilahoang.io.vn"] 
  }
})
