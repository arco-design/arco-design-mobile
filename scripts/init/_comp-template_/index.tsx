import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { ContextLayout } from '../context-provider';

export interface $COMP$Props {
     /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
}

export interface $COMP$Ref {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}

/**
 * 组件描述
 * @type 组件类型，可选：信息展示、通用、数据录入、反馈、导航、布局、其他
 * @name 组件名
 */
const $COMP$ = forwardRef((props: $COMP$Props, ref: Ref<$COMP$Ref>) => {
    const {
        className = '',
        style,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div className={`${prefixCls}-$comp$ ${className}`} style={style} ref={domRef}></div>
            )}
        </ContextLayout>
    );
});

export default $COMP$;
