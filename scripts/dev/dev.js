const childProcess = require('child_process');
const { argv } = process;

childProcess.execSync(
    `cross-env NODE_ENV=development COMPONENTS=${argv[2]} DEMOS=${argv[3]} webpack-dev-server --progress --config scripts/sites/webpack.dev.mobile.js`,
    { stdio: 'inherit' },
);
