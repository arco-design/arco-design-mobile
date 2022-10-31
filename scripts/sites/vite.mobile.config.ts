import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import demoGeneratePlugin from './plugins/rollup/rollup-plugin-demo-generate';

export default defineConfig({
    mode: 'development',
    server: {
        port: 8822,
        open: '/vite/mobile/#/'
    },
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, '../../vite/mobile/index.html')
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
        demoGeneratePlugin()
    ]
});