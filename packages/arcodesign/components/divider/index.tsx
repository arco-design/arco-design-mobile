import React, { useRef, forwardRef, Ref, useImperativeHandle, useContext } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout, GlobalContext } from '../context-provider';
import { BaseProps, getStyleWithVendor } from '../_helpers';

export interface DividerProps extends BaseProps {
    /**
     * 是否使用 0.5px 线
     * @en Whether to use hairline
     * @default true
     */
    hairline?: boolean;
    /**
     * 文字
     * @en Divider text
     */
    content?: React.ReactNode;
    /**
     * 文字位置
     * @en The position of text inside divider
     * @default 'center'
     */
    align?: 'left' | 'center' | 'right';
    /**
     * 分割线宽度（单边），仅在`align`为`center`时生效
     * @en The width of divider, only take effect when `align` is `center`.
     */
    width?: string | number;
    /**
     * 子元素，同 content，优先级低于 content
     * @en Children element, same as `content`, with the priority lower than `content`
     * @default null
     */
    children?: React.ReactNode;
}

export interface DividerRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}

/**
 * 划分内容的装饰线
 * @en A partitioning line element
 * @type 布局
 * @type_en Layout
 * @name 分割线
 * @name_en Divider
 */
const Divider = forwardRef((props: DividerProps, ref: Ref<DividerRef>) => {
    const { className = '', style, hairline = true, align = 'center', width } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const { prefixCls } = useContext(GlobalContext);
    const prefix = `${prefixCls}-divider`;
    const children = props.content || props.children;
    const hasCustomWidth = children && width !== undefined && align === 'center';

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <ContextLayout>
            {() => (
                <div
                    className={cls(prefix, className, {
                        [`${prefix}--hairline`]: hairline,
                        [`${prefix}--with-text ${prefix}--text-${align}`]: children,
                        [`${prefix}--with-width`]: hasCustomWidth,
                    })}
                    style={{
                        ...style,
                        ...(hasCustomWidth ? getStyleWithVendor({ flexBasis: width }) : {}),
                    }}
                    ref={domRef}
                >
                    {children}
                </div>
            )}
        </ContextLayout>
    );
});

export default Divider;
