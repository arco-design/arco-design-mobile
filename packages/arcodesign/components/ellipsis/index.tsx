import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { cls } from '@arco-design/mobile-utils';

import { ContextLayout } from '../context-provider';

import { isSupportWebkitLineClamp } from './utils/is';
import JsEllipsis from './components/js-ellipsis';
import NativeEllipsis from './components/native-ellipsis';
import { EllipsisProps, EllipsisRef, JsEllipsisRef } from './type';

export * from './type';

/**
 * 文本缩略组件，支持多行缩略、富文本、自定义缩略符、尾字符过滤等。
 * @en Text ellipsis component supports multi-line abbreviations, rich text, custom abbreviations, tail character filtering, etc.
 * @type 信息展示
 * @type_en Data Display
 * @name 文本缩略
 * @name_en Ellipsis
 */
const Ellipsis = forwardRef((props: EllipsisProps, ref: Ref<EllipsisRef>) => {
    const {
        className,
        text,
        dangerouslyUseInnerHTML,
        maxLine = 1,
        maxHeight,
        ellipsis = true,
        ellipsisNode = '...',
        collapseNode = '',
        endExcludes,
        reflowOnResize = false,
        floatEllipsisNode = false,
        onReflow,
        onCollapseNodeClick,
        onEllipsisNodeClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const jsEllipsisRef = useRef<JsEllipsisRef>(null);

    const useNativeEllipsis =
        isSupportWebkitLineClamp() &&
        maxHeight === void 0 &&
        (!endExcludes || endExcludes.length === 0) &&
        !onReflow &&
        (floatEllipsisNode || (ellipsisNode === '...' && !onEllipsisNodeClick));

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        reflow: jsEllipsisRef?.current?.reflow,
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div className={cls(`${prefixCls}-ellipsis`, className)} ref={domRef}>
                    {useNativeEllipsis ? (
                        <NativeEllipsis
                            prefixCls={`${prefixCls}-ellipsis`}
                            ellipsis={ellipsis}
                            dangerouslyUseInnerHTML={dangerouslyUseInnerHTML}
                            text={text}
                            maxLine={maxLine}
                            ellipsisNode={ellipsisNode}
                            collapseNode={collapseNode}
                            onEllipsisNodeClick={onEllipsisNodeClick}
                            onCollapseNodeClick={onCollapseNodeClick}
                        />
                    ) : (
                        <JsEllipsis
                            ref={jsEllipsisRef}
                            prefixCls={`${prefixCls}-ellipsis`}
                            text={text}
                            ellipsis={ellipsis}
                            dangerouslyUseInnerHTML={dangerouslyUseInnerHTML}
                            maxLine={maxLine}
                            maxHeight={maxHeight}
                            ellipsisNode={ellipsisNode}
                            collapseNode={collapseNode}
                            endExcludes={endExcludes}
                            reflowOnResize={reflowOnResize}
                            onReflow={onReflow}
                            onEllipsisNodeClick={onEllipsisNodeClick}
                            onCollapseNodeClick={onCollapseNodeClick}
                        />
                    )}
                </div>
            )}
        </ContextLayout>
    );
});

export default Ellipsis;
