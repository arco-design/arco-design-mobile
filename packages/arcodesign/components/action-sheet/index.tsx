import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    ReactNode,
    CSSProperties,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import Popup, { PopupProps, PopupRef } from '../popup';
import { OpenBaseProps } from '../masking';
import { open } from './methods';

export interface ActionSheetItemOptions {
    /**
     * 选项文字内容
     * @en Option text
     */
    content: ReactNode;
    /**
     * 状态，disabled 状态下不可点，danger 状态字体飘红
     * @en Status, it isn't clickable in disabled status, its font is red in danger status
     * */
    status?: 'normal' | 'disabled' | 'danger';
    /**
     * 选项文字自定义类名
     * @en Custom classname for option content
     */
    className?: string;
    /**
     * 选项文字自定义样式
     * @en Custom stylesheet for option content
     */
    style?: CSSProperties;
    /**
     * 点击选项事件，返回值为 true 时可以阻止动作面板关闭
     * @en Click option event, actionSheet will be prevent from closing when returning true
     */
    onClick?: (
        e?: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => (void | boolean) | Promise<void | boolean>;
}

export interface ActionSheetProps
    extends Omit<
        PopupProps,
        'children' | 'getScrollContainer' | 'orientationDirection' | 'direction'
    > {
    /**
     * 选项配置，详情见 ActionSheetItemOptions
     * @en Option setting, see ActionSheetItemOptions for details
     */
    items: ActionSheetItemOptions[];
    /**
     * 取消按钮内容，传值则会展示，点击后关闭动作面板
     * @en Cancel button content, the value will be shown, actionSheet will be closed when clicked
     */
    cancelText?: ReactNode;
    /**
     * 面板标题内容
     * @en Title content
     */
    title?: ReactNode;
    /**
     * 面板副标题内容
     * @en Sub title content
     */
    subTitle?: ReactNode;
    /**
     * 从底部滑出的菜单内容是否适配ipx底部
     * @en Whether the content of the menu that slides out from the bottom fits the bottom of the iphoneX
     * @default true
     */
    needBottomOffset?: boolean;
}

export interface ActionSheetRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

const ActionSheet = forwardRef((props: ActionSheetProps, ref: Ref<ActionSheetRef>) => {
    const {
        className = '',
        items,
        cancelText,
        close,
        title,
        subTitle,
        needBottomOffset = true,
        ...otherProps
    } = props;
    const popupRef = useRef<PopupRef>(null);

    useImperativeHandle(ref, () => popupRef.current!);

    function handleItemClick(
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        item: ActionSheetItemOptions,
    ) {
        e.stopPropagation();
        if (item.status === 'disabled') {
            return;
        }
        const result = item.onClick ? item.onClick(e) : null;
        if (!result || typeof result === 'boolean') {
            !result && close?.(e);
        } else if (result && result.then) {
            result.then(res => !res && close?.(e));
        }
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <Popup
                    ref={popupRef}
                    className={cls(`${prefixCls}-action-sheet`, className)}
                    contentClass={`${prefixCls}-action-sheet-content`}
                    close={close}
                    direction="bottom"
                    needBottomOffset={needBottomOffset}
                    {...otherProps}
                >
                    {title || subTitle ? (
                        <div className={`${prefixCls}-action-sheet-header`}>
                            {title ? (
                                <div className={`${prefixCls}-action-sheet-title`}>{title}</div>
                            ) : null}
                            {subTitle ? (
                                <div className={`${prefixCls}-action-sheet-sub-title`}>
                                    {subTitle}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    <div className={`${prefixCls}-action-sheet-list`}>
                        {(items || []).map((item, index) => (
                            <div
                                className={cls(
                                    `${prefixCls}-action-sheet-item`,
                                    item.className,
                                    item.status || 'normal',
                                )}
                                key={index}
                                style={item.style}
                                onClick={e => handleItemClick(e, item)}
                            >
                                {item.content}
                            </div>
                        ))}
                    </div>
                    {cancelText ? (
                        <div
                            className={`${prefixCls}-action-sheet-item cancel-item`}
                            onClick={e => {
                                e.stopPropagation();
                                close?.(e);
                            }}
                        >
                            {cancelText}
                        </div>
                    ) : null}
                </Popup>
            )}
        </ContextLayout>
    );
});

export function methodsGenerator<P extends OpenBaseProps>(Comp: React.FunctionComponent<P>) {
    return {
        /**
         * 打开动作面板
         * @desc {en} Open actionsheet
         * @param {ActionSheetProps} config setting
         * @returns {{ close: () => void; update: (newConfig: ActionSheetProps) => void; }}
         */
        open: open(Comp),
    };
}

const ActionSheetWithGlobalContext = CompWithGlobalContext(ActionSheet);

/**
 * 动作面板组件
 * @en ActionSheet Component
 * @type 反馈
 * @type_en FeedBack
 * @name 动作面板
 * @name_en ActionSheet
 */
export default componentWrapper(ActionSheet, methodsGenerator(ActionSheetWithGlobalContext));
