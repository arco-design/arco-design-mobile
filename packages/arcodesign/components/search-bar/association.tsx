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
        searchAssociationItems = [],
        highlightClassName,
        highlightMode = 'none',
        highlightStyle,
        onAssociationClick,
        onAssociationItemClick,
        renderSearchAssociation,
        renderSearchAssociationItem,
        keyword,
        visible,
    } = props;
    const searchBarAssociationPrefixCls = `${prefixCls}-association`;

    const renderHighlightNode = (content: string) => {
        if (!content || !keyword || highlightMode === 'none') {
            return content;
        }
        const config: SearchBarAssociationHighlightConfig = {
            keyword,
            content,
            highlightClassName:
                highlightClassName || `${searchBarAssociationPrefixCls}-item-highlight`,
            highlightStyle,
        };

        if (highlightMode === 'contain') {
            return highlightWithContainMode(config);
        }
        if (highlightMode === 'prefix') {
            return highlightWithPrefixMode(config);
        }
        return content;
    };

    const renderItem = (item: SearchAssociationItem<Data>, index: number) => {
        const itemContent = item.content;
        let node: ReactNode = itemContent;
        // itemContent为string类型，并且开启高亮模式才去走渲染高亮内容的逻辑
        if (typeof itemContent === 'string' && highlightMode !== 'none') {
            node = renderHighlightNode(itemContent);
        }
        if (renderSearchAssociationItem) {
            node = renderSearchAssociationItem(item, index, node);
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
        const associationContent = searchAssociationItems.map(renderItem);
        if (renderSearchAssociation) {
            return renderSearchAssociation(associationContent);
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
