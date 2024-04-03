import prettier from 'prettier/standalone';
import prettierPluginBabel from 'prettier/parser-babel';
import prettierPluginPostcss from 'prettier/parser-postcss';

export interface CodeInfo {
    codeSource: string;
    key: string;
    name: string;
    version: string;
}

export interface SandboxProps {
    compKey?: string;
    codeSource: string;
    styleSource: string;
}

function formatCode(code: string, parser: 'babel' | 'less') {
    return prettier.format(code, {
        parser,
        tabWidth: 4,
        plugins: [prettierPluginBabel, prettierPluginPostcss],
    });
}

export const getCodePenData = (data: CodeInfo) => {
    const { codeSource, key, name, version } = data;
    const matchRes = codeSource.match(/export[ \t]+default[ \t]+function[ \t]([^\(]+)/);
    const funcName = matchRes && matchRes.length > 1 ? matchRes[1].trim() : '';
    let lastJsx = codeSource;
    lastJsx = codeSource
        .replace(/export[ \t]+default/, '')
        .replace(
            /import[ \t]+([^\(]+)[ \t]+from[ \t]+['"]@arco-design\/mobile-react['"]/g,
            'const $1 = Arco',
        );
    lastJsx = lastJsx.replace(
        /import[ \t]+(\w+)[ \t]+from[ \t]+['"]@arco-design\/mobile-react\/esm\/icon\/\w+['"]/g,
        'const { $1 } = ArcoIcon',
    );
    const htmlArr = [
        '<script src="https://cdn.jsdelivr.net/npm/react@16.14.0/umd/react.production.min.js"></script>',
        '<script src="https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom.production.min.js"></script>',
        '<script src="https://cdn.jsdelivr.net/npm/react-transition-group@4.4.5/dist/react-transition-group.min.js"></script>',
        '</script>\n<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.2/??flexible_css.js,flexible.js"></script>',
        `<div id="${key || 'root'}" class="arcodesign-mobile-demo-content"></div>`,
        `<script type="text/javascript">var mountNode = document.getElementById("${
            key || 'root'
        }");</script>`,
    ];
    return {
        title: `Arco Design Mobile - ${name}`,
        html: `${htmlArr.join('\n')}\n`,
        js: `const { React, Arco, ArcoIcon } = window;\n${lastJsx}\nReactDOM.render(<${funcName}/>, mountNode);`,
        css_pre_processor: 'less',
        css: `body{padding:20px!important;}\n #${
            key || 'root'
        }{width: 375px;}\n.arcodesign-mobile-demo-content{padding: 20px;}`,
        editors: 'ADM',
        css_external: `https://cdn.jsdelivr.net/npm/@arco-design/mobile-react@${version}/dist/style.min.css;https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/arco-demo.css`,
        js_pre_processor: 'typescript',
        js_external: `https://cdn.jsdelivr.net/npm/react@16.14.0/umd/react.production.min.js;https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom.production.min.js;https://cdn.jsdelivr.net/npm/@arco-design/mobile-react@${version}/dist/index.min.js;https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/icon/arco-icon.min.js;https://cdn.jsdelivr.net/npm/react-transition-group@4.4.5/dist/react-transition-group.min.js`,
    };
};

export const getCodeSandboxData = (codeSource: string, styleSource: string) => {
    return {
        files: {
            'index.html': {
                content: `<div id='root'></div>`,
            },
            'app.tsx': {
                content: formatCode(
                    `
                    import React from 'react';
                    ${decodeURIComponent(codeSource)}
                `,
                    'babel',
                ),
            },
            'index.tsx': {
                content: formatCode(
                    `
                    import React from 'react';
                    import ReactDOM from 'react-dom';
                    import setRootPixel from '@arco-design/mobile-react/tools/flexible';
                    import '@arco-design/mobile-react/dist/style.min.css';
                    import App from './app';
                    import './index.less';

                    setRootPixel();

                    ReactDOM.render(
                        <App />,
                        document.getElementById('root'),
                    );
                `,
                    'babel',
                ),
            },
            'index.less': {
                content: formatCode(styleSource, 'less'),
            },
            'package.json': {
                content: JSON.stringify(
                    {
                        main: 'index.tsx',
                        dependencies: {
                            '@arco-design/mobile-react': 'latest',
                            react: '16.9.0',
                            'react-dom': '16.9.0',
                            'react-transition-group': '4.3.0',
                        },
                        devDependencies: {
                            typescript: '^3',
                        },
                    },
                    null,
                    2,
                ),
            },
        },
    };
};
