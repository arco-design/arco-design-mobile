import { defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import tokenGeneratePlugin from './plugins/TokenGeneratePlugin';
import siteGeneratePlugin from './plugins/SiteGeneratePlugin';
// import transformSourceInjectPlugin from './plugins/rollup/rollup-plugin-transform-source-inject';

export default defineConfig({
    mode: 'development',
    server: {
        port: 8826,
        open: '/vite/pc-vue/#/'
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
            find: '@arco-design/mobile-utils',
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
        tokenGeneratePlugin(),
        siteGeneratePlugin(),
        viteExternalsPlugin({
            'arco': 'arco',
            'react': 'React',
            'react-dom': 'ReactDOM',
            'fuse': 'Fuse',
        }),
    ]
});
