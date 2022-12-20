import React, { forwardRef, Ref, useImperativeHandle, useRef, ReactNode } from 'react';
import { cls, componentWrapper, ILocale } from '@arco-design/mobile-utils';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import Masking, { MaskingCommonProps, MaskingRef, OpenBaseProps } from '../masking';
import { alert, confirm, open } from './methods';
import { useSystem } from '../_helpers';

export * from './methods';

export interface FooterButtonOptions {
    /**
     * 按钮内容
     * @en Button content
     */
    content: ReactNode | ((locale: ILocale) => ReactNode);
    /**
     * 按钮类名
     * @en Button classname
     *  */
    className?: string;
    /**
     * 是否禁用按钮
     * @en Whether to disable button
     *  */
    disabled?: boolean;
    /**
     * 点击按钮事件，返回值为true时可以阻止dialog关闭
     * @en Button clicking event, when the return value is true, the dialog can be prevented from closing
     *  */
    onClick?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => (void | boolean) | Promise<void | boolean>;
}

export interface DialogProps extends MaskingCommonProps {
    /**
     * 弹窗标题
     * @en Dialog title
     * */
    title?: ReactNode;
    /**
     * 底部按钮配置
     * @en Bottom button configuration
     * @default []
     */
    footer?: FooterButtonOptions[];
    /**
     * 底部按钮样式，grid表示通栏样式，button表示按钮样式，platform=ios时有效
     * @en Bottom button style, grid indicates the banner style, button indicates the button style, valid when platform = ios
     * @default "grid"
     */
    footerType?: 'grid' | 'button';
    /**
     * 自定义渲染footer
     * @en Custom rendering footer
     * */
    renderFooter?: () => ReactNode;
    /**
     * 底部按钮大于等于多少个时竖向排布
     * @en Vertical arrangement when the number of buttons at the bottom is greater than or equal to the set value
     * @default 3
     */
    footerCollapseCount?: number;
    /**
     * 标题对齐方向
     * @en Title alignment
     * @default platform=android 时为"left"，否则为"center"
     * @default_en "left" when platform=android, "center" otherwise
     */
    titleAlign?: 'left' | 'center' | 'right';
    /**
     * 内容对齐方向
     * @en Content alignment
     * @default platform=android 时为"left"，否则为"center"
     * @default_en "left" when platform=android, "center" otherwise
     */
    contentAlign?: 'left' | 'center' | 'right';
    /**
     * 当前所在操作系统，对应不同样式
     * @en The current operating system, corresponding to different styles
     * @default 跟随当前所在系统
     * @default_en Follow the system
     */
    platform?: 'ios' | 'android';
    /**
     * 弹窗中的其他元素，比如关闭按钮等
     * @en Other elements in the dialog, such as the close button, etc.
     * */
    extra?: ReactNode;
    /**
     * 内容过渡动画类名
     * @en Content transition animation classname
     * @default platform=android 时为"fade"，否则为"fade-scale"
     * @default_en "fade" when platform=android, "fade-scale" otherwise
     */
    contentTransitionType?: MaskingCommonProps['contentTransitionType'];
    /**
     * 蒙层动画时长
     * @en Mask animation duration
     * @default 300
     */
    maskTransitionTimeout?: MaskingCommonProps['maskTransitionTimeout'];
    /**
     * 弹窗内容动画时长
     * @en Dialog content animation duration
     * @default 450
     */
    contentTransitionTimeout?: MaskingCommonProps['contentTransitionTimeout'];
}

export interface DialogRef extends MaskingRef {}

const Dialog = forwardRef((props: DialogProps, ref: Ref<DialogRef>) => {
    const system = useSystem();
    const nowSystem = props.platform || system;
    const {
        close = () => {},
        children,
        title,
        footer = [],
        footerType = 'grid',
        renderFooter,
        footerCollapseCount = 3,
        titleAlign = nowSystem === 'android' ? 'left' : 'center',
        contentAlign = nowSystem === 'android' ? 'left' : 'center',
        className,
        maskClass,
        contentClass,
        contentStyle,
        contentTransitionType = nowSystem === 'android' ? 'fade' : 'fade-scale',
        maskTransitionTimeout = 300,
        contentTransitionTimeout = 450,
        extra,
        ...restProps
    } = props;
    const maskingRef = useRef<MaskingRef>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        dom: maskingRef.current?.dom || null,
        mask: maskingRef.current?.mask || null,
        content: contentRef.current,
        setCloseScene: maskingRef.current?.setCloseScene || (() => {}),
    }));

    function handleFooterBtnClick(
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        btn: FooterButtonOptions,
    ) {
        e.preventDefault();
        e.stopPropagation();
        if (btn.disabled) {
            return;
        }
        const result = btn.onClick ? btn.onClick(e) : null;
        if (!result || typeof result === 'boolean') {
            !result && close(e);
        } else if (result && result.then) {
            result.then(res => !res && close(e));
        }
    }

    function renderDialog({ prefixCls, locale }) {
        const prefix = `${prefixCls}-dialog`;
        return (
            <Masking
                close={close}
                className={cls(prefix, nowSystem, className)}
                ref={maskingRef}
                maskClass={cls(`${prefix}-mask`, maskClass)}
                contentTransitionType={contentTransitionType}
                contentClass={cls(`${prefix}-container`)}
                maskTransitionTimeout={maskTransitionTimeout}
                contentTransitionTimeout={contentTransitionTimeout}
                {...restProps}
            >
                <div
                    className={cls(`${prefix}-content`, `${prefix}-part`, nowSystem, contentClass)}
                    style={contentStyle}
                    ref={contentRef}
                >
                    {title ? (
                        <div
                            className={cls(
                                `${prefix}-header`,
                                `${prefix}-part`,
                                titleAlign,
                                nowSystem,
                                `system-${system}`,
                                { 'only-title': !children },
                            )}
                        >
                            {title}
                        </div>
                    ) : null}
                    {children ? (
                        <div
                            className={cls(
                                `${prefix}-body`,
                                `${prefix}-part`,
                                contentAlign,
                                nowSystem,
                                {
                                    'sub-title': !title,
                                },
                            )}
                        >
                            {children}
                        </div>
                    ) : null}
                    {renderFooter || footer.length ? (
                        <div
                            className={cls(
                                `${prefix}-footer`,
                                `${prefix}-part`,
                                nowSystem,
                                `type-${footerType}`,
                                {
                                    collapsed: footer.length >= footerCollapseCount,
                                },
                            )}
                        >
                            {renderFooter
                                ? renderFooter()
                                : footer.map((btn, index) => (
                                      <div
                                          key={index}
                                          className={cls(
                                              'dialog-footer-button',
                                              btn.className,
                                              `system-${system}`,
                                              { disabled: btn.disabled },
                                          )}
                                          onClick={e => handleFooterBtnClick(e, btn)}
                                      >
                                          {typeof btn.content === 'function'
                                              ? btn.content(locale)
                                              : btn.content}
                                      </div>
                                  ))}
                        </div>
                    ) : null}
                    {/* 往后追加div元素会使.${prefix}-part:last-of-type失效，因此包裹span元素 */}
                    {/* Appending the div element afterward will invalidate .${prefix}-part:last-of-type, thus wrapping the span element */}
                    {extra ? <section>{extra}</section> : null}
                </div>
            </Masking>
        );
    }

    return <ContextLayout>{renderDialog}</ContextLayout>;
});

export interface AlertOptions extends Omit<DialogProps, 'visible' | 'close'> {
    /**
     * 组件挂载容器id区分
     * @en Component mount container id distinction
     * */
    key?: string;
    /**
     * 点击确认按钮回调
     * @en Callback when clicking OK button
     * */
    onOk?: FooterButtonOptions['onClick'];
    /**
     * 确认按钮文字
     * @en Ok button text
     * */
    okText?: ReactNode;
}
export interface ConfirmOptions extends AlertOptions {
    /**
     * 点击取消按钮回调
     * @en Callback when clicking cancel button
     * */
    onCancel?: FooterButtonOptions['onClick'];
    /**
     * 取消按钮文字
     * @en Cancel button text
     * */
    cancelText?: ReactNode;
}

export function methodsGenerator<P extends OpenBaseProps, A = AlertOptions, C = ConfirmOptions>(
    Comp: React.FunctionComponent<P>,
) {
    return {
        /**
         * 打开确认框(含一个确认按钮)
         * @desc {en} Open a confirmation dialog (with a confirmation button)
         * @param {AlertOptions & DialogProps} config Configuration
         * @returns {{ close: () => void; update: (newConfig: AlertOptions & DialogProps) => void; }}
         */
        alert: alert<A, P>(Comp),
        /**
         * 打开提示框(含一个确认按钮和一个取消按钮)
         * @desc {en} Open a prompt dialog (with a confirm button and a cancel button)
         * @param {ConfirmOptions & AlertOptions} config Configuration
         * @returns {{ close: () => void; update: (newConfig: ConfirmOptions & AlertOptions) => void; }}
         */
        confirm: confirm<C, P>(Comp),
        /**
         * 打开常规对话框
         * @desc {en} Open the general dialog
         * @param {DialogProps} config Configuration
         * @returns {{ close: () => void; update: (newConfig: DialogProps) => void; }}
         */
        open: open(Comp),
    };
}

const DialogWithGlobalContext = CompWithGlobalContext(Dialog);

/**
 * 模态对话框，在浮层中显示，引导用户进行相关操作。默认做了防滚动穿透处理，如果弹层内容中需要滚动，则需将滚动容器传入`getScrollContainer`属性以在未滚动到顶部或底部时释放滚动。
 * @en A modal dialog, displayed in a floating layer, guides the user to perform related operations. By default, anti-scroll penetration processing is performed. If scrolling is required in the content of the bullet layer, you need to pass the scroll container to `getScrollContainer` to release scrolling when it is not scrolled to the top or bottom.
 * @type 反馈
 * @type_en FeedBack
 * @name 对话框
 * @name_en Dialog
 */
export default componentWrapper(Dialog, methodsGenerator(DialogWithGlobalContext));
