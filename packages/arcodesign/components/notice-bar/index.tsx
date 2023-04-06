import { cls, removeElement, fadeColor, nextTick } from '@arco-design/mobile-utils';
import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    ReactNode,
    useState,
    useEffect,
    useMemo,
    CSSProperties,
    useContext,
} from 'react';
import { ContextLayout, GlobalContext } from '../context-provider';
import IconClose from '../icon/IconClose';

export interface NoticeBarProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式，背景颜色和文字颜色可直接在这里指定`background`和`color`
     * @en Custom stylesheet, background color and text color can be directly specified here `background` and `color`
     */
    style?: React.CSSProperties;
    /**
     * 通知内容文字，如需垂直滚动效果可传入一个Carousel
     * @en Notification content text, if need vertical scrolling effect, you can input a Carousel
     */
    children?: ReactNode;
    /**
     * 左侧内容
     * @en Content on the left
     */
    leftContent?: ReactNode;
    /**
     * 右侧内容
     * @en Content on the right
     */
    rightContent?: ReactNode;
    /**
     * 通知文字处理方式，为`overflow`则文字超出容器长度时才滚动，为`none`则文字始终不滚动，为`always`则文字始终滚动
     * @en The text processing method of the notification. When it is `overflow`, the text will only scroll when the length of the container exceeds the length of the container. If it is `none`, the text will never scroll, and if it is `always`, the text will always scroll.
     * @default "overflow"
     */
    marquee?: 'overflow' | 'none' | 'always';
    /**
     * 是否可关闭
     * @en Closeable
     * @default true
     */
    closeable?: boolean;
    /**
     * 自定义关闭图标
     * @en Custom close icon
     * @default \<IconClose /\>
     */
    closeIcon?: ReactNode;
    /**
     * 是否需要换行，当 marquee=none 且 wrapable=false 时，文字超出会有溢出省略(ellipsis)效果
     * @en Whether line wrapping is required, when marquee=none and wrapable=false, there will be overflow ellipsis effect when the text exceeds
     * @default true
     */
    wrapable?: boolean;
    /**
     * 文字滚动速度，单位是px/s
     * @en Text scrolling speed in px/s
     * @default 50
     */
    speed?: number;
    /**
     * 文字开始滚动之前的延迟(ms)
     * @en Delay before text starts scrolling (ms)
     * @default 1000
     */
    delay?: number;
    /**
     * 是否根据`style`属性中自定义的背景色自动设置渐变背景色
     * @en Whether to automatically set the gradient background color based on the custom background color in the `style` attribute
     * @default true
     */
    autoSetGradientStyle?: boolean;
    /**
     * 点击通知栏事件
     * @en Click on notification bar event
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /**
     * 点击关闭按钮回调
     * @en Callback when clicking close button
     */
    onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface NoticeBarRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 手动关闭通知栏，即移除当前组件
     * @en Manually close the notification bar, that is, remove the current component
     */
    close: () => void;
    /**
     * 手动更新组件布局
     * @en Manually update the component layout
     */
    updateData: () => void;
}

/**
 * 可自定义换行或滚动效果，支持循环滚动。
 * @en Line wrapping or scrolling effects can be customized, and circular scrolling is supported.
 * @type 信息展示
 * @type_en Data Display
 * @name 通知栏
 * @name_en NoticeBar
 */
const NoticeBar = forwardRef((props: NoticeBarProps, ref: Ref<NoticeBarRef>) => {
    const {
        className = '',
        style,
        children,
        leftContent,
        rightContent,
        marquee = 'overflow',
        closeable = true,
        closeIcon = <IconClose />,
        wrapable = true,
        speed = 50,
        delay = 1000,
        autoSetGradientStyle = true,
        onClick,
        onClose,
    } = props;
    const { useRtl } = useContext(GlobalContext);
    const domRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | null>(null);
    const [needMarquee, setNeedMarquee] = useState(false);
    const extraClass = useMemo(() => {
        const classList: string[] = [];
        // 字幕可滚动时，或不可滚动且不可以换行时，添加不换行效果
        // @en When the subtitle is scrollable, or when it is not scrollable and cannot wrap, add no wrapping effect
        if (marquee !== 'none' || !wrapable) {
            classList.push('no-wrap');
        }
        // 字幕不可滚动时，根据是否可换行决定换行或省略效果
        // @en When the subtitle is not scrollable, decide whether to wrap or omit the effect according to whether it can wrap
        if (marquee === 'none') {
            classList.push(wrapable ? 'wrapable' : 'ellipsis');
        }
        return classList;
    }, [marquee, wrapable]);
    const gradientStyle = useMemo<CSSProperties>(() => {
        if (!autoSetGradientStyle) {
            return {};
        }
        const curBg = style?.backgroundColor || style?.background;
        const fadeBg = fadeColor(String(curBg) || '');
        return fadeBg
            ? {
                  background: `linear-gradient(to right, ${curBg}, ${fadeBg})`,
              }
            : {};
    }, [style]);

    useImperativeHandle(
        ref,
        () => ({
            dom: domRef.current,
            close,
            updateData,
        }),
        [updateData],
    );

    useEffect(() => {
        updateData();
    }, [useRtl]);

    function close() {
        if (domRef.current) {
            removeElement(domRef.current);
        }
    }

    function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        onClose?.(e);
        close();
    }

    function updateData() {
        nextTick(() => {
            setTimeout(
                () => {
                    updateLayoutData();
                },
                needMarquee ? 0 : delay,
            );
        });
    }

    function updateLayoutData() {
        if (!wrapRef.current || !contentRef.current) {
            return;
        }
        const contentDom = contentRef.current;
        let needMarq = marquee === 'always';
        const wrapWidth = wrapRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth;
        // 如果为overflow类型，则当文字溢出时再开始滚动
        // @en If it is overflow type, start scrolling when the text overflows
        if (marquee === 'overflow') {
            if (wrapWidth < contentWidth) {
                needMarq = true;
            }
        }
        setNeedMarquee(needMarq);
        clear();
        if (needMarq) {
            const duration = contentWidth / speed;
            contentDom.style.animationDuration = `${duration}s`;
            // 第一次没有padding，第二次及以后为了从容器右边缘无缝滑入需要加上padding
            // @en The first time without padding, the second time and later need to add padding in order to seamlessly slide in from the right edge of the container
            timerRef.current = window.setTimeout(() => {
                // 这里暂时把animate类去掉，准备下一次从头开始
                // @en Temporarily remove the animate classname, and prepare to start from scratch next time
                setNeedMarquee(false);
                contentDom.style.animationDuration = `${wrapWidth / speed + duration}s`;
                contentDom.style.animationIterationCount = 'infinite';
                const paddingAttr = useRtl ? 'paddingRight' : 'paddingLeft';
                contentDom.style[paddingAttr] = `${wrapWidth}px`;
                nextTick(() => {
                    setNeedMarquee(true);
                });
            }, duration * 1000);
        }
    }

    function clear() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    function renderNoticeBar(prefix: string) {
        return (
            <div
                className={cls(prefix, className, extraClass)}
                style={style}
                ref={domRef}
                onClick={onClick}
            >
                {leftContent ? <div className={`${prefix}-left-part`}>{leftContent}</div> : null}
                <div className={`${prefix}-content`} ref={wrapRef}>
                    {needMarquee ? (
                        <i className={`${prefix}-gradient left`} style={gradientStyle} />
                    ) : null}
                    <div
                        className={cls(`${prefix}-content-inner`, { animate: needMarquee })}
                        ref={contentRef}
                    >
                        {children}
                    </div>
                    {needMarquee ? (
                        <i className={`${prefix}-gradient right`} style={gradientStyle} />
                    ) : null}
                </div>
                {rightContent ? <div className={`${prefix}-right-part`}>{rightContent}</div> : null}
                {closeable ? (
                    <div className={`${prefix}-close`} onClick={handleClose}>
                        {closeIcon}
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => renderNoticeBar(`${prefixCls}-notice-bar`)}
        </ContextLayout>
    );
});

export default NoticeBar;
