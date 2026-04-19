import { defineConfig } from 'vite'

export default defineConfig({
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
      },
    },
  },
})
