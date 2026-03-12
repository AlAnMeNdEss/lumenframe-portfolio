import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Torna os caminhos de assets relativos para funcionar no Vercel/GitHub Pages
    build: {
        outDir: 'dist',
    }
});
