import React from 'react';
import { cls } from '@arco-design/mobile-utils';

import { NativeEllipsisProps } from '../type';

function NativeEllipsis({
    prefixCls,
    ellipsis,
    dangerouslyUseInnerHTML,
    text,
    maxLine,
    collapseNode = '',
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
        </div>
    );
}
export default React.memo(NativeEllipsis);
