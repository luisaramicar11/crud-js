import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                login: './src/pages/login.html',
                register: './src/pages/register.html',
                dashboard: './src/pages/dashboard.html'
            },
        },
    },
});