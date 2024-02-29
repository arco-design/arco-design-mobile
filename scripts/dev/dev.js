const childProcess = require('child_process');
const { argv } = process;

// 单组件-单 demo 测试命令：npm run dev slider marks
// 多组件-多 demo 测试命令：npm run dev slider,tabs marks,basic
childProcess.execSync(
    `cross-env NODE_ENV=development COMPONENTS=${argv[2]} DEMOS=${argv[3]} webpack-dev-server --progress --config scripts/sites/webpack.dev.mobile.js`,
    { stdio: 'inherit' },
);
