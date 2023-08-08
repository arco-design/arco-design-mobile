import React, {
    useState,
    useEffect,
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    useContext,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout, GlobalContext } from '../context-provider';
import { useSystem } from '../_helpers';

interface SwitchText {
    /**
     * 打开时的展示文案
     * @en Text when opened
     */
    on: string;
    /**
     * 关闭时的展示文案
     * @en Text when closed
     */
    off: string;
}

export interface SwitchProps {
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
    /**
     * 组件的平台特有样式, 可选值为 android, ios
     * @en The platform-specific style of the component, the optional values are android, ios
     * @default 跟随当前所在系统
     * @default_en Follow the current system
     */
    platform?: string;
    /**
     * 是否设置为打开状态 有checked时defaultChecked不会使用
     * @en Whether it is set to open, defaultChecked will not be used when there is checked
     */
    checked?: boolean;
    /**
     * 默认的初始状态
     * @en Default initial state
     * @default false
     */
    defaultChecked?: boolean;
    /**
     * 开关文案
     * @en Switch text
     */
    text?: SwitchText;
    /**
     * 圆角样式， fully - 全圆角，semi - 直角
     * @en Rounded style, fully - full rounded, semi - right angle
     * @default "fully"
     */
    shape?: 'fully' | 'semi';
    /**
     * 内部区域元素
     * @en Inner area element
     */
    innerArea?: React.ReactNode;
    /**
     * 是否设置为禁用状态
     * @en Whether it is set to disabled state
     * @default false
     */
    disabled?: boolean;
    /**
     * 状态改变时触发的回调函数
     * @en Callback when the status changes
     */
    onChange?: (checked: boolean) => void;
    /**
     * touchStart事件回调
     * @en TouchStart event
     */
    onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
    /**
     * touchEnd事件回调
     * @en TouchEnd event
     */
    onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
    /**
     * click事件回调
     * @en Click event
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface SwitchRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

const Switch = forwardRef((props: SwitchProps, ref: Ref<SwitchRef>) => {
    const { useRtl } = useContext(GlobalContext);
    const system = useSystem();
    const {
        className,
        style,
        platform = system,
        checked,
        disabled = false,
        defaultChecked = false,
        text,
        shape = 'fully',
        innerArea,
        onChange,
        onTouchStart,
        onTouchEnd,
        onClick,
    } = props;

    const [touchStartX, setTouchStartX] = useState(0);
    let initChecked = false;

    if ('checked' in props) {
        initChecked = Boolean(checked);
    } else {
        initChecked = defaultChecked;
    }
    const [switchChecked, setSwitchChecked] = useState(initChecked);
    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    useEffect(() => {
        if ('checked' in props) {
            setSwitchChecked(Boolean(checked));
        }
    }, [checked]);

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        onTouchStart && onTouchStart(e);
        if (disabled) {
            return;
        }

        const startX = e.touches && e.touches[0] ? e.touches[0].clientX : 0;
        setTouchStartX(startX);
    }

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        onTouchEnd && onTouchEnd(e);
        if (disabled) {
            return;
        }
        const touchEndX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0;
        const distance = touchEndX - touchStartX;
        const swipeRight = useRtl ? distance < 0 : distance > 0;
        const swipeLeft = useRtl ? distance > 0 : distance < 0;

        let newChecked = false;
        // 右滑打开
        // @en Swipe right to open
        if (swipeRight) {
            newChecked = true;
            // 左滑关闭
            // @en Swipe left to close
        } else if (swipeLeft) {
            newChecked = false;
            // 点击时取反
            // @en Invert on clicking
        } else {
            newChecked = !switchChecked;
        }

        if (!('checked' in props)) {
            setSwitchChecked(newChecked);
        }
        if (onChange) {
            onChange(newChecked);
        }
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    role="switch"
                    aria-checked={switchChecked}
                    aria-disabled={disabled}
                    tabIndex={0}
                    ref={domRef}
                    className={cls(
                        `${prefixCls}-switch all-border-box`,
                        className,
                        `type-${platform}`,
                        `system-${system}`,
                        shape,
                        {
                            checked: switchChecked,
                            disabled,
                        },
                    )}
                    style={style}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={onClick}
                >
                    {text ? (
                        <span className={`${prefixCls}-switch-text`}>
                            {switchChecked ? text.off || '' : text.on || ''}
                        </span>
                    ) : null}
                    <div className={`${prefixCls}-switch-inner`}>{innerArea || null}</div>
                </div>
            )}
        </ContextLayout>
    );
});

/**
 * 开关组件，支持点击和滑动触发开关动作。
 * @en A switch component that supports click and slide trigger switch actions.
 * @type 数据录入
 * @type_en Data Entry
 * @name 开关
 * @name_en Switch
 * @displayName Switch
 */
export default componentWrapper(Switch, 'Switch');
