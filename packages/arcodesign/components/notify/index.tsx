import React, { useRef, forwardRef, Ref, useImperativeHandle, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { componentWrapper, nextTick } from '@arco-design/mobile-utils';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import { NotifyProps, NotifyRef } from './type';
import { getStyleWithVendor, useUpdateEffect } from '../_helpers';
import { NotifyBaseProps, notify } from './methods';

export * from './type';

const Notify = forwardRef((props: NotifyProps, ref: Ref<NotifyRef>) => {
    const {
        className = '',
        style,
        visible = false,
        transitionDuration = 300,
        content,
        duration = 3000,
        onClose,
        type = 'info',
        close,
        getContainer,
    } = props;
    const domRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const closeTimerRef = useRef<number>();
    const onCloseTimeRef = useRef<number>();
    const [hasTrans, setHasTrans] = useState(!visible);
    const [innerHeight, setInnerHeight] = useState(0);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        updateLayout,
    }));

    function startCloseTimer() {
        if (duration) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = window.setTimeout(() => {
                close?.();
            }, duration);
        }
    }

    function updateLayout() {
        if (innerRef.current) {
            const { height } = innerRef.current.getBoundingClientRect();
            setInnerHeight(height);
        }
    }

    useEffect(() => {
        visible && updateLayout();
        visible && startCloseTimer();
        return () => {
            visible && clearTimeout(closeTimerRef.current);
        };
    }, [visible, duration]);

    useUpdateEffect(() => {
        if (!visible) {
            onCloseTimeRef.current = window.setTimeout(() => {
                onClose && onClose();
            }, transitionDuration);
        }
    }, [visible]);

    useEffect(() => {
        nextTick(() => {
            setHasTrans(true);
        });
        return () => {
            clearTimeout(onCloseTimeRef.current);
        };
    }, []);

    function renderComponent(prefixClass: string) {
        return content ? (
            <div
                className={`${prefixClass}-content ${
                    visible
                        ? `${prefixClass}-content-transition-Y0`
                        : `${prefixClass}-content-transition-Y100`
                }`}
                ref={innerRef}
                style={{
                    ...(hasTrans
                        ? getStyleWithVendor({
                              transitionDuration: `${transitionDuration}ms`,
                          })
                        : {}),
                }}
            >
                {content}
            </div>
        ) : null;
    }
    const render = prefixCls => {
        return (
            <div
                className={`${prefixCls}-notify ${prefixCls}-notify-${type} ${className}`}
                style={{
                    ...style,
                    ...(hasTrans
                        ? getStyleWithVendor({
                              transitionDuration: `${transitionDuration}ms`,
                          })
                        : {}),
                    height: visible ? innerHeight : 0,
                }}
                ref={domRef}
            >
                {renderComponent(`${prefixCls}-notify`)}
            </div>
        );
    };
    return (
        <ContextLayout>
            {({ prefixCls }) =>
                getContainer
                    ? ReactDOM.createPortal(render(prefixCls), getContainer())
                    : render(prefixCls)
            }
        </ContextLayout>
    );
});

export function methodsGenerator<P extends NotifyBaseProps>(Comp: React.FC<P>) {
    return {
        /**
         * 展示常规通知
         * @desc {en} Show regular notification
         * @param {string | NotifyProps} config
         * @returns {{ update: (config: NotifyProps) => void; close: () => void }}
         */
        info: notify(Comp),
        /**
         * 展示成功通知
         * @desc {en} Show success notification
         * @param {string | NotifyProps} config
         * @returns {{ update: (config: NotifyProps) => void; close: () => void }}
         */
        success: notify(Comp, 'success'),
        /**
         * 展示错误的通知
         * @desc {en} Show error notification
         * @param {string | NotifyProps} config
         * @returns {{ update: (config: NotifyProps) => void; close: () => void }}
         */
        error: notify(Comp, 'error'),
        /**
         * 展示警告的通知
         * @desc {en} Show warning notification
         * @param {string | NotifyProps} config
         * @returns {{ update: (config: NotifyProps) => void; close: () => void }}
         */
        warn: notify(Comp, 'warn'),
    };
}

const NotifyWithGlobalContext = CompWithGlobalContext(Notify);

/**
 * 主动操作后显示的反馈信息横条，可采用方法调用或者组件调用的方式
 * @en The feedback information bar displayed after active operation can be called by method or by component.
 * @type 反馈
 * @type_en Feedback
 * @name 消息通知
 * @name_en Notify
 */
export default componentWrapper(Notify, methodsGenerator(NotifyWithGlobalContext));
