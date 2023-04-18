import { defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import transformSourceInjectPlugin from './plugins/rollup/rollup-plugin-transform-source-inject';

export default defineConfig({
    mode: 'development',
    server: {
        port: 8824,
        open: '/vite/home/#/'
    },
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, '../../vite/home/index.html')
            }
        }
    },
    resolve: {
        alias: [{
            find: '~@arco-design/mobile-utils',
            replacement: '/packages/common-widgets'
        }]
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    plugins: [
        commonjs(),
        reactRefresh(),
        viteExternalsPlugin({
            'Arco': 'Arco',
            'react': 'React',
            'react-dom': 'ReactDOM'
        }),
        {
            ...transformSourceInjectPlugin('home'),
            enforce: 'pre'
        }
    ]
});