const { join } = require('path');

const commitLintConfig = join(__dirname, 'commitlint.config.js');
const isWindows = process.platform === 'win32';

module.exports = {
    hooks: {
        'commit-msg': isWindows
            ? ''
            : `[[ -n $HUSKY_BYPASS ]] || commitlint -e $HUSKY_GIT_PARAMS --config ${commitLintConfig}`,
        'pre-commit': 'node ./scripts/dev/generate-all.js && npm run lint-staged && git add -A',
    },
};
