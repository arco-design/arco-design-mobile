export interface CodeInfo {
    content: string;
    key: string;
    name: string;
    version: string;
}

export interface SandboxProps {
    compKey?: string;
    codeData: CodeInfo;
}

export const getCodePenData = (data: CodeInfo) => {
    const { content, key, name, version } = data;
    const matchRes = content.match(/export[ \t]+default[ \t]+function[ \t]([^\(]+)/);
    const funcName = matchRes && matchRes.length > 1 ? matchRes[1].trim() : '';
    let lastJsx = content;
    lastJsx = content
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
        '<script src="https://unpkg.com/react@16.x/umd/react.development.js"></script>',
        '<script src="https://unpkg.com/react-dom@16.14.0/umd/react-dom.development.js"></script>',
        '<script src="https://unpkg.com/react-transition-group@4.4.2/dist/react-transition-group.js"></script>',
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
        css_external: `https://unpkg.com/@arco-design/mobile-react@${version}/dist/style.min.css;https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/arco-demo.css`,
        js_pre_processor: 'typescript',
        js_external: `https://unpkg.com/react@16.x/umd/react.development.js;https://unpkg.com/react-dom@16.14.0/umd/react-dom.development.js;https://unpkg.com/@arco-design/mobile-react@${version}/dist/index.min.js;https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/icon/arco-icon.min.js;https://unpkg.com/react-transition-group@4.4.2/dist/react-transition-group.js`,
    };
};
