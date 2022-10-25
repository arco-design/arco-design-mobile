import React, { ReactNode } from 'react';
import { SearchBarAssociationHighlightConfig } from './type';

function createHighlightNode(
    config: Omit<SearchBarAssociationHighlightConfig, 'content'>,
    index: number,
) {
    const { keyword, highlightClassName, highlightStyle } = config;
    return (
        <span className={highlightClassName} style={highlightStyle} key={index}>
            {keyword}
        </span>
    );
}

/**
 * 高亮搜索候选项中，包含的关键字
 *
 */
export function highlightWithContainMode(config: SearchBarAssociationHighlightConfig) {
    const { content = '', keyword = '' } = config;

    // 具体实现思路就是将keyword作为split的分隔符，切割content得到数组
    const splitContent = content.split(keyword);

    // 再将高亮后的keyword节点，插空填入数组
    const highlightResult = splitContent.reduce((prev, word, index) => {
        prev.push(word);
        if (index !== splitContent.length - 1) {
            prev.push(createHighlightNode(config, index));
        }
        return prev;
    }, [] as ReactNode[]);

    return highlightResult;
}

/**
 * 高亮搜索候选项和关键字的最长前缀公共字符串
 *
 */
export function highlightWithPrefixMode(config: SearchBarAssociationHighlightConfig) {
    const { content = '', keyword = '', ...otherConfig } = config;

    let splitIndex = -1;

    for (let i = 0; i < keyword.length; i++) {
        if (i >= content.length || content[i] !== keyword[i]) {
            break;
        }
        splitIndex = i;
    }

    return splitIndex > -1
        ? [
              createHighlightNode(
                  {
                      ...otherConfig,
                      keyword: content.substring(0, splitIndex + 1),
                  },
                  0,
              ),
              content.substring(splitIndex + 1),
          ]
        : content;
}
