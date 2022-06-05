const generateToken = require('./generate');

if (process.argv[2]) {
    const compFilter = (process.argv[3] || '').trim();
    generateToken({ appName: process.argv[2], outputFilter: compFilter ? compFilter.split(',') : [] });
}
