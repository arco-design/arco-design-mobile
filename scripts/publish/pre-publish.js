const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('.git')) {
    console.log('.git directory is not exist');
    process.exit(1);
}

if (!~execSync('npm config get registry').toString().search('https://registry.npmjs.org/')) {
    console.log('please check npm registry');
    process.exit(1);
};