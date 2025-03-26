// vite.config.js
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { readFileSync } = require('fs');

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

module.exports = defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});

