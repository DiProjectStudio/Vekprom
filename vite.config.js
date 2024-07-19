import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import rollupConfig from './rollup.config.js'; // Импорт конфигурации Rollup

const noAttribute = () => {
    return {
        name: 'no-attribute',
        transformIndexHtml(html) {
            // Удаление атрибута crossorigin
            html = html.replace(/ crossorigin/g, '');

            if (process.env.NODE_ENV === 'production') {
                // Замена пути в ссылках <link>
                html = html.replace(/="\/assets\//g, '="./assets/');
            }

            return html;
        }
    };
};

export default defineConfig({
    server: {
        cors: false,
        host: 'localhost',
        port: 3000,
        open: true
    },

    plugins: [
        vituum({
            imports: {
                filenamePattern: {
                    '+.css': [],
                    '+.js': []
                }
            }
        }),

        pug({
            root: './src',
            options: {
                pretty: true
            }
        }),

        noAttribute()
    ],

    css: {
        devSourcemap: true
    },

    build: {
        // minify: 'terser',

        // terserOptions: {
        //     compress: {
        //         defaults: false
        //     },
        //     mangle: false,
        //     format: {
        //         beautify: true,
        //         comments: 'all'
        //     }
        // },

        modulePreload: {
            polyfill: false
        },

        rollupOptions: rollupConfig // Использование импортированной конфигурации Rollup
    }
});
