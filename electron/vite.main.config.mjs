import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({

    // ne pas compiler
    build: {
        rollupOptions: {
            external: ['better-sqlite3']
        }
    }

});
