import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/feinstecher/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        booking: 'booking.html',
        agb: 'agb.html',
        impressum: 'impressum.html',
        datenschutz: 'datenschutz.html',
        erstattung: 'erstattung.html',
        barrierefreiheit: 'barrierefreiheit.html',
        login: 'login.html',
        profile: 'profile.html',
      },
    },
  },
})
