const { join } = require('path');

const commitLintConfig = join(__dirname, 'commitlint.config.js');

module.exports = {
    hooks: {
        'commit-msg': `[[ -n $HUSKY_BYPASS ]] || commitlint -e $HUSKY_GIT_PARAMS --config ${commitLintConfig}`,
        'pre-commit': 'node ./scripts/dev/generate-all.js && npm run lint-staged && git add -A',
    },
};
