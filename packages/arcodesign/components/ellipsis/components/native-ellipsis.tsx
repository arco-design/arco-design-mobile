import React from 'react';
import { cls } from '@arco-design/mobile-utils';

import { NativeEllipsisProps } from '../type';

function NativeEllipsis({
    prefixCls,
    ellipsis,
    dangerouslyUseInnerHTML,
    text,
    maxLine,
    ellipsisNode,
    collapseNode = '',
    onEllipsisNodeClick,
    onCollapseNodeClick,
}: NativeEllipsisProps) {
    return (
        <div
            className={cls(`${prefixCls}-native`, {
                ellipsis,
            })}
            style={{
                WebkitLineClamp: maxLine,
            }}
        >
            {dangerouslyUseInnerHTML ? (
                // eslint-disable-next-line react/no-danger,@typescript-eslint/naming-convention
                <span dangerouslySetInnerHTML={{ __html: text }} />
            ) : (
                <span>{text}</span>
            )}
            {!ellipsis && collapseNode && (
                <span onClick={onCollapseNodeClick} className={cls(`${prefixCls}-native-collapse`)}>
                    {collapseNode}
                </span>
            )}
            {ellipsis && (ellipsisNode !== '...' || onEllipsisNodeClick) ? (
                <span
                    onClick={onEllipsisNodeClick}
                    className={cls(`${prefixCls}-native-ellipsis-node`)}
                >
                    {ellipsisNode}
                </span>
            ) : null}
        </div>
    );
}
export default React.memo(NativeEllipsis);
