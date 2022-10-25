import { cls } from '@arco-design/mobile-utils';
import React, { ReactNode } from 'react';
import {
    SearchAssociationItem,
    SearchBarAssociationHighlightConfig,
    SearchBarAssociationProps,
} from './type';
import { highlightWithContainMode, highlightWithPrefixMode } from './highlight';

export function SearchBarAssociation<Data>(props: SearchBarAssociationProps<Data>) {
    const {
        prefixCls,
        associationItems = [],
        highlightClassName,
        highlightMode = 'none',
        highlightStyle,
        onAssociationClick,
        onAssociationItemClick,
        renderAssociation,
        renderAssociationItem,
        keyword,
        visible,
    } = props;
    const searchBarAssociationPrefixCls = `${prefixCls}-association`;
    const defaultHighlightClassName = `${searchBarAssociationPrefixCls}-item-highlight`;

    const renderHighlightNode = (content: string) => {
        if (!content || !keyword || highlightMode === 'none') {
            return content;
        }
        const config: SearchBarAssociationHighlightConfig = {
            keyword,
            content,
            highlightClassName: highlightClassName || defaultHighlightClassName,
            highlightStyle,
        };

        if (highlightMode === 'contain') {
            return highlightWithContainMode(config);
        }
        if (highlightMode === 'prefix') {
            return highlightWithPrefixMode(config);
        }
        return typeof highlightMode === 'function'
            ? highlightMode(content, keyword, defaultHighlightClassName)
            : content;
    };

    const renderItem = (item: SearchAssociationItem<Data>, index: number) => {
        const itemContent = item.content;
        let node: ReactNode = itemContent;
        // itemContent为string类型，并且开启高亮模式才去走渲染高亮内容的逻辑
        // @en When `itemContent` is a string, and the highlight mode is turned on, the logic of rendering the highlighted content is performed
        if (typeof itemContent === 'string' && highlightMode !== 'none') {
            node = renderHighlightNode(itemContent);
        }
        if (renderAssociationItem) {
            node = renderAssociationItem(item, index, node);
        }
        return (
            <div
                key={index}
                className={`${searchBarAssociationPrefixCls}-item`}
                onClick={() => onAssociationItemClick?.(item, index)}
            >
                {node}
            </div>
        );
    };

    const renderContent = () => {
        const associationContent = associationItems.map(renderItem);
        if (renderAssociation) {
            return renderAssociation(associationContent);
        }
        return associationContent;
    };

    return (
        <div
            className={cls(searchBarAssociationPrefixCls, {
                [`${searchBarAssociationPrefixCls}-visible`]: visible,
            })}
            onClick={onAssociationClick}
        >
            {renderContent()}
        </div>
    );
}
