import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: Number(process.env.PORT || 4200),
    open: true,
    hmr: true,
    liveReload: true
  },
  resolve: {
    alias: {
      '@': '/src',
      '@app': '/src/app',
      '@env': '/src/environments'
    }
  }
});
