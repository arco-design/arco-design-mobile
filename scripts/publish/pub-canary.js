/**
 * lerna 发布canary 版本不打 tag，多个分支发布同一个 package的npm 可能会产生版本冲突
 * 取 commit hash 作为 pre-release preid 可以避免版本冲突
 */
const childProcess = require('child_process');

(function() {
    const commitHash = childProcess.execSync('git log -1 HEAD --pretty=format:%H')
        .toString()
        .slice(0, 7);
    childProcess.execSync(
        `npx lerna publish --no-push --no-git-reset --canary --preid ${commitHash} --yes`,
        {
            stdio: 'inherit'
        }
    );
}());
