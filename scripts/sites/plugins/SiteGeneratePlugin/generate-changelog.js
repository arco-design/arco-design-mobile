const fs = require('fs-extra');
const utils = require('../../../utils');
const localeMap = require('../../../utils/language.json');

function generateChangelog(filePath, outputPath, language = 'ch') {
    const changelog = fs.readFileSync(filePath, 'utf-8');
    // 根据 ## [x.x.x](diff url) (2021-3-22) | # x.x.x (2021-3-22) 拆分changelog
    const changelogArr = changelog.split(/#{1,2}\s\[*\d+\.\d+\.\d+\]*.*\([\d|-]+\)/);
    // 过滤掉顶部Changelog说明
    changelogArr.shift();
    const changelogMatch = changelog.match(/#{1,2}\s\[*(\d+\.\d+\.\d+)\]*\(*[\s\S]*?\)*\s\((\d{4}-\d{2}-\d{2}\))/g);
    const changelogVersionMap = changelogMatch.map(changelogVersion => {
        // 匹配版本号两种case ## [x.x.x](diff url) (2021-3-22) | # x.x.x (2021-3-22)
        let match = changelogVersion.match(/#{1,2}\s\[(\d+\.\d+\.\d+)\].*\(([\d|-]+)\)/);
        if (!match) {
            match = changelogVersion.match(/#\s(\d+\.\d+\.\d+)\s\(([\d|-]+)\)/);
        }
        return {
            version: match[1],
            date: match[2]
        };
    });

    const changelogVersionFilterMap = [];
    const changelogContentMap = changelogArr.reduce((previous, current, currentIndex) => {
        const changelogContent = {};
        current = current.replace(/\n\n+/g, '\n\n');
        const fixes = current.match(/###\sBug\sFixes\n([\s\S]*?)(\n{2,}|\n+$)/);
        if (fixes && fixes[1]) {
            changelogContent.Bugfix = fixes[1].split('\n').filter(_ => _).map(fixLog => {
                const match = fixLog.match(/\*\s(.*)\s\(.*\)\)/);
                return match && match[1] ? match[1] : fixLog.replace(/^\s*\*\s*/, '');
            });
        }
        const features = current.match(/###\sFeatures\n([\s\S]*?)(\n{2,}|\n+$)/);
        if (features && features[1]) {
            changelogContent.Features = features[1].split('\n').filter(_ => _).map(featLog => {
                const match = featLog.match(/\*\s(.*)\s\(.*\)\)/);
                return match && match[1] ? match[1] : featLog.replace(/^\s*\*\s*/, '');
            });
        }
        if (Object.keys(changelogContent).length) {
            // 过滤掉发空包场景
            previous.push(changelogContent);
            changelogVersionFilterMap.push(changelogVersionMap[currentIndex]);
        }
        return previous;
    }, []);

    const emoji = {
        Bugfix: '🛠',
        Features: '💠️ '
    };

    const mdFileContent = `
import React from 'react';
import { Timeline } from 'arco';

${changelogContentMap.length ? 'const TimelineItem = Timeline.Item;' : ''}

export default function ChangelogFile() {
    return (
        <div className="pc-site-wrapper">
            <div className="demo-doc-intro">
                <p className="demo-doc-type">${utils.getUpperPhase(localeMap.developmentGuide[language])}</p>
                <h1 className="demo-doc-name">${localeMap.changelog[language]}</h1>
                <p className="demo-doc-desc">${localeMap.changelogDesc[language]}</p>
            </div>
            <div
                className="demo-doc-description"
                id="changelog"
            >
                <Timeline>
                    ${changelogContentMap.map((changelog, index) => {
                        const {version, date} = changelogVersionFilterMap[index];
                        return (
                            `<TimelineItem>
                                <div className="left">
                                    <h2>${version}</h2>
                                    <p>${date}</p>
                                </div>
                                <div className="right">
                                    ${Object.keys(changelog).map(item => {
                                        return (
                                            `<h3>${emoji[item]} ${item}</h3>
                                        <ul>
                                            ${changelog[item].map(log => `<li>• ${log}</li>`)}
                                        </ul>`
                                        )
                                    })}
                                </div>
                            </TimelineItem>`
                        )
                    }).join().replace(/,/g, ``)}
                </Timeline>
            </div>
        </div>
    )
}`;

    fs.writeFile(outputPath, mdFileContent, () => {
        console.log('>>> Write changelog finished');
    });
}

module.exports = generateChangelog;
