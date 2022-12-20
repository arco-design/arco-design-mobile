const fs = require('fs-extra');
const path = require('path');


class StartContextPlugin {

    apply(compiler) {
        compiler.hooks.entryOption.tap('MyPlugin', () => {
            const buildContextPath = path.resolve(process.cwd(), './node_modules/.cache/context.json');
            const webpackCachePath = path.resolve(process.cwd(), './node_modules/.cache/webpack');

            let context = {}
            // 读取上一次的构建环境
            if (fs.existsSync(buildContextPath)) {
                context = fs.readJsonSync(buildContextPath)
            }
            // 对比构建环境
            if (context.ARCO_BUILD_TYPE !== process.env.ARCO_BUILD_TYPE) {
                fs.emptyDirSync(webpackCachePath)
                fs.writeFileSync(buildContextPath, JSON.stringify(process.env))
            }
        });
    }
}

module.exports = StartContextPlugin;

