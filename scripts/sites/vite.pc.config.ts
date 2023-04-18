import { defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import siteGeneratePlugin from './plugins/rollup/rollup-plugin-site-generate';
import transformSourceInjectPlugin from './plugins/rollup/rollup-plugin-transform-source-inject';

export default defineConfig({
    mode: 'development',
    server: {
        port: 8823,
        open: '/vite/pc/#/'
    },
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, '../../vite/pc/index.html')
            }
        }
    },
    resolve: {
        alias: [{
            find: '~@arco-design/mobile-utils',
            replacement: '/packages/common-widgets'
        }]
    },
    optimizeDeps: {
        include: ['arco']
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
        siteGeneratePlugin(),
        viteExternalsPlugin({
            'arco': 'arco',
            'react': 'React',
            'react-dom': 'ReactDOM'
        }),
        {
            ...transformSourceInjectPlugin('pc'),
            enforce: 'pre'
        }
    ]
});