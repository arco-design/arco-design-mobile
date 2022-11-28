const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');
const reactNpm = {
    16: 'react@16.14.0 react-dom@16.14.0 @types/react@16.14.28 @types/react-dom@16.9.16',
    18: 'react@18.2.0 react-dom@18.2.0 @types/react@18.0.0 @types/react-dom@18.0.0'
}
const reactDep = {
    16: ['@types/prop-types', '@types/react', '@types/react-dom', 'csstype', 'js-tokens', 'loose-envify', 'object-assign', 'prop-types', 'react', 'react-dom', 'react-is', 'scheduler'],
    18: ['@types/prop-types', '@types/react', '@types/react-dom', '@types/scheduler', 'csstype', 'js-tokens', 'loose-envify', 'react', 'react-dom', 'scheduler']
}
const projectRoot = path.resolve(__dirname, '../../')
const realNodeModules = path.resolve(__dirname, '../../node_modules/')
const reactCacheDir = path.resolve(__dirname, '../../node_modules/.react-cache')

const toggleReact = async (version) => {
    const another = version === '16' ? '18' : '16';
    await Promise.all(reactDep[another].map(dep => {
        return fs.remove(path.resolve(realNodeModules, dep))
    }))
    console.log(`>>> React${another} has removed`);
    await Promise.all(reactDep[version].map(dep => {
        const depPath = dep.split('/');
        const src = path.resolve(reactCacheDir, `react${version}`, 'node_modules', ...depPath)
        const dest = path.resolve(realNodeModules, ...depPath)
        return fs.copy(src, dest)
    }))
    console.log(`>>> React${version} has copied`);
    fs.removeSync(`${realNodeModules}/.cache`)
}
const isVersionMatch = (version) => {
    const currentReact = `${realNodeModules}/react/package.json`
    if (fs.pathExistsSync(currentReact)) {
        const currentVersion = require(currentReact).version;
        if (currentVersion.startsWith(version)) {
            console.log(`>>> React${version} is current version`);
            return true;
        } else {
            return false;
        }
    } else {
        console.log(`>>> React is missing, try to run npm install`);
        childProcess.execSync(`cd ${projectRoot} && npm i`)
        console.log(`>>> Project dependencies installed`);
    }
}
const hasVersionCache = (version) => {
    return fs.pathExistsSync(`${reactCacheDir}/react${version}/node_modules/react/package.json`)
}
const addReactToCache = (version) => {
    if (hasVersionCache(version)) {
        console.log(`>>> Has cached react${version}, don't need install`);
    } else {
        const cachePath = `${reactCacheDir}/react${version}`
        fs.mkdirpSync(cachePath)
        // npm init & npm i 
        console.log(`>>> Install react${version}`);
        childProcess.execSync(`cd ${cachePath} && npm init -y && npm i ${reactNpm[version]} -E`)
        console.log(`>>> React${version} has installed `);
    }
}

const init = async (version = '16') => {
    if (!isVersionMatch(version)) {
        addReactToCache(version)
        toggleReact(version)
    } else {
        console.log(`>>> React current version ${version}, don't need toggle`);
    }
}


const version = process.argv[2]
if (!['16', '18'].includes(version)) {
    throw Error((`
        version is only 16 or 18
        please use  npm run init:react 16 or npm run init:react 18
    `))
}
init(version)
