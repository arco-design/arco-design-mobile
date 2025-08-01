import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import Masking, { MaskingCommonProps, MaskingRef, OpenBaseProps } from '../masking';
import { open } from './methods';

export * from './methods';

export type DirectionType = 'left' | 'right' | 'top' | 'bottom';

export interface PopupProps extends MaskingCommonProps {
    /**
     * 菜单滑出方向
     * @en The direction the menu slides out
     * @default "bottom"
     */
    direction?: DirectionType;
    /**
     * 从底部滑出的菜单内容是否适配ipx底部
     * @en Whether the content of the menu that slides out from the bottom fits the bottom of ipx
     * @default false
     */
    needBottomOffset?: boolean;
    /**
     * [即将废弃] 开启translateZ强制提升
     * @en [To be deprecated] Enable translateZ forced promotion
     * @default false
     * @deprecated
     */
    translateZ?: boolean;
    /**
     * 菜单蒙层动画时长
     * @en Menu mask animation duration
     * @default { enter: 450, exit: 240 }
     */
    maskTransitionTimeout?: MaskingCommonProps['maskTransitionTimeout'];
    /**
     * 菜单内容动画时长
     * @en Menu content animation duration
     * @default { enter: 450, exit: 240 }
     */
    contentTransitionTimeout?: MaskingCommonProps['contentTransitionTimeout'];
    /**
     * 内容过渡动画类名
     * @en Content transition animation classname
     * @default \`slide-from-${props.direction}\`
     */
    contentTransitionType?: MaskingCommonProps['contentTransitionType'];
}

export interface PopupRef extends MaskingRef {}

const defaultTransitionTimeout = { enter: 450, exit: 240 };

const Popup = forwardRef((props: PopupProps, ref: Ref<PopupRef>) => {
    const {
        children,
        maskClass,
        contentClass,
        contentTransitionType,
        className,
        direction = 'bottom',
        needBottomOffset = false,
        translateZ = false,
        maskTransitionTimeout = defaultTransitionTimeout,
        contentTransitionTimeout = defaultTransitionTimeout,
        maskStyle = {},
        contentStyle = {},
        ...restProps
    } = props;
    const maskingRef = useRef<MaskingRef>(null);

    useImperativeHandle(ref, () => maskingRef.current!);

    const getDuration = (
        timeout: MaskingCommonProps['maskTransitionTimeout'],
        type: 'enter' | 'exit' | 'appear',
    ) => {
        if (typeof timeout === 'number') {
            return timeout;
        }
        return timeout?.[type] || 0;
    };

    const getCssVariables = () => {
        const maskEnterDuration = getDuration(maskTransitionTimeout, 'enter');
        const contentEnterDuration = getDuration(contentTransitionTimeout, 'enter');
        const maskExitDuration = getDuration(maskTransitionTimeout, 'exit');
        const contentExitDuration = getDuration(contentTransitionTimeout, 'exit');
        return {
            '--popup-enter-transition': `all ${Math.max(
                maskEnterDuration,
                contentEnterDuration,
            )}ms cubic-bezier(0.34, 0.69, 0.1, 1)`,
            '--popup-exit-transition': `${Math.max(
                maskExitDuration,
                contentExitDuration,
            )}ms cubic-bezier(0.34, 0.69, 0.1, 1)`,
        };
    };

    const cssVariables = getCssVariables();

    function renderPopup({ prefixCls }) {
        const prefix = `${prefixCls}-popup`;
        return (
            <Masking
                className={cls(prefix, className)}
                ref={maskingRef}
                maskStyle={{
                    ...cssVariables,
                    ...maskStyle,
                }}
                contentStyle={{
                    ...cssVariables,
                    ...contentStyle,
                }}
                maskClass={cls(`${prefix}-mask`, { translateZ }, maskClass)}
                contentTransitionType={contentTransitionType || `slide-from-${direction}`}
                contentClass={cls(
                    `${prefix}-content`,
                    direction,
                    {
                        'need-bottom-offset': needBottomOffset,
                    },
                    { translateZ },
                    contentClass,
                )}
                maskTransitionTimeout={maskTransitionTimeout}
                contentTransitionTimeout={contentTransitionTimeout}
                {...restProps}
            >
                {children}
            </Masking>
        );
    }

    return <ContextLayout>{renderPopup}</ContextLayout>;
});

export function methodsGenerator<P extends OpenBaseProps>(Comp: React.FunctionComponent<P>) {
    return {
        /**
         * 打开弹出层
         * @desc {en} Open the popup
         * @param {PopupProps} config Configuration
         * @returns {{ close: () => void; update: (newConfig: PopupProps) => void; }}
         */
        open: open(Comp),
    };
}

const PopupWithGlobalContext = CompWithGlobalContext(Popup);

/**
 * 基于模态弹窗的的全屏菜单，支持各个方向。默认做了防滚动穿透处理，如果弹层内容中需要滚动，则需将滚动容器传入`getScrollContainer`属性以在未滚动到顶部或底部时释放滚动。
 * @en A full-screen menu based on a modal popup, supporting all directions. By default, anti-scroll penetration processing is performed. If scrolling is required in the content of the popup layer, you need to pass the scroll container to the `getScrollContainer` property to release scrolling when it is not scrolled to the top or bottom.
 * @type 反馈
 * @type_en Feedback
 * @name 弹出层
 * @name_en Popup
 */
export default componentWrapper(Popup, methodsGenerator(PopupWithGlobalContext));
