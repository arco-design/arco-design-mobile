import { Plugin, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import entryGeneratePlugin from './plugins/EntryGeneratePlugin';
import tokenGeneratePlugin from './plugins/TokenGeneratePlugin';
import demoGeneratePlugin from './plugins/DemoGeneratePlugin';

export default defineConfig({
    mode: 'development',
    server: {
        port: 8825,
        open: '/vite/mobile-vue/#/'
    },
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, '../../vite/mobile-vue/index.html')
            }
        }
    },
    resolve: {
        alias: [
            {
                find: '@arco-design/mobile-utils',
                replacement: '/packages/common-widgets',
            },
            {
                find: '~@arco-design/mobile-utils',
                replacement: '/packages/common-widgets',
            },
        ],
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    plugins: [commonjs() as Plugin, vue(), entryGeneratePlugin(), tokenGeneratePlugin(), demoGeneratePlugin()],
})
