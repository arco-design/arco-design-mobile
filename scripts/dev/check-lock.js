const fs = require('fs');
const path = require('path');

const lockFile = path.resolve(__dirname, '../../package-lock.json');
const lockStr = fs.readFileSync(lockFile, 'utf8');
const wrongRegistryMatch = lockStr.match(/"resolved": "https?:\/\/((?!registry\.npmjs\.org).*?)\//);
if (wrongRegistryMatch) {
    console.error(`\nError: Wrong package resolve path! (Found wrong path: ${wrongRegistryMatch[1]}) Please check your npm registry and install again.\n`);
    throw new Error();
}
