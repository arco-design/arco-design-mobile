const fs = require('fs');
const path = require('path');
const { sync: resolveNpmFile } = require('resolve');
const { START_BORDER } = require('../constants');

const win32 = process.platform === 'win32'
const reg = new RegExp(`^@import ('|")(.+)('|");`)

function resolve(content, dir) {
    const files = content.split('\n').filter(e => reg.test(e))
    return (
        files
            .map(line => {
                const filename = line.match(reg)?.[2] ?? ''

                const currentDirectory = path.resolve(dir)

                const filePath = filename.includes('~')
                    ? resolveNpmFile(filename.replace('~', ''), {
                        basedir: currentDirectory,
                        extensions: ['.less', '.css'],
                        packageFilter(info) {
                            // no style field, keep info unchanged
                            if (!info.style) {
                                return info
                            }

                            // replace main
                            if (typeof info.style === 'string') {
                                info.main = info.style
                                return info
                            }

                            return info
                        },
                        paths: process.env.NODE_PATH ? process.env.NODE_PATH.split(win32 ? ';' : ':') : [],
                    })
                    : path.join(path.dirname(currentDirectory), filename)
                return resolve(fs.readFileSync(filePath).toString(), filePath)
            })
            .join('') +
        content
            .split('\n')
            .filter(e => !reg.test(e))
            .join('\n')
            .split(START_BORDER)[0]
    )
}

exports.resolve = resolve;
