import React, {
    useRef,
    useEffect,
    useCallback,
    forwardRef,
    Ref,
    useImperativeHandle,
    useState,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { CSSTransition } from 'react-transition-group';
import { ContextLayout } from '../context-provider';
import {
    getStyleWithVendor,
    usePopupScroll,
    usePreventBodyScroll,
    useSystem,
    useWindowSize,
} from '../_helpers';
import Portal from '../portal';
import { DropdownProps, DropdownRef, ValueType } from './type';
import Options from './options';

export * from './type';

const Dropdown = forwardRef((props: DropdownProps, ref: Ref<DropdownRef>) => {
    const optionsWrapper = useRef<HTMLDivElement>(null);
    const domRef = useRef<HTMLDivElement | null>(null);
    const {
        className = '',
        style = {},
        options = [],
        showDropdown = false,
        showMask = true,
        direction = 'down',
        height,
        maxHeight = 500,
        touchToClose = true,
        useColumn,
        multiple,
        defaultSelectedValue,
        onCancel,
        getAnchorElement,
        isStopTouchEl,
        getStopTouchElements,
        getScrollContainer = () => optionsWrapper.current,
        getPortalContainer,
        clickOtherToClose = true,
        dropdownAnimationTimeout = 300,
        dropdownAnimationFunction = 'cubic-bezier(0.32, 0.96, 0.6, 1)',
        // 坑：ios touchstart会停留300ms 导致点击关闭蒙层后出现点击穿透 触发底部可点区域事件 这里设置更长的timeout规避
        // @en In iOS, touchstart will stay for 300ms, resulting in click penetration after clicking to close the mask, triggering the bottom clickable area event, and setting a longer timeout to avoid it
        maskAnimationTimeout = 500,
        maskAnimationFunction = 'cubic-bezier(0.32, 0.96, 0.6, 1)',
        mountOnEnter = true,
        unmountOnExit = true,
        preventBodyScroll = true,
        initialBodyOverflow,
    } = props;
    const system = useSystem();
    const { windowHeight, windowWidth } = useWindowSize();
    const [positionStyle, setPositionStyle] = useState({ top: '', bottom: '' });
    const [innerValue, setInnerValue] = useState<ValueType>(() => {
        const defaultValue = multiple ? [] : 0;
        return defaultSelectedValue !== void 0 ? defaultSelectedValue : defaultValue;
    });

    // down=0为向上展开，1为向下展开
    // @en down=0 is to expand upwards, 1 is to expand downwards
    const [down, setDown] = useState(direction === 'down');
    const maskHeight = useRef(0);
    const optionsContainer = useRef<HTMLDivElement>(null);
    const dropdownContainer = useRef<HTMLDivElement>(null);
    const [optionsWrapperHeight, setOptionsWrapperHeight] = useState(0);

    /**
     * 判断是否阻止touch事件
     * @en Determine whether to block touch events
     * */

    const ifStopTouch = (el: HTMLElement) => {
        if (isStopTouchEl) return isStopTouchEl(el);
        let tempEl: HTMLElement | null = el;
        const elements = getStopTouchElements
            ? getStopTouchElements()
            : [dropdownContainer.current?.parentElement];
        for (let i = 0; i < elements.length; i++) {
            while (tempEl && elements[i]) {
                if (tempEl === elements[i]) {
                    return true;
                }
                tempEl = tempEl.parentElement;
            }
        }
        return false;
    };

    usePopupScroll(showDropdown, domRef.current, getScrollContainer);

    usePreventBodyScroll(showDropdown, preventBodyScroll, initialBodyOverflow);

    useEffect(() => {
        // 为0的时候不改变
        // @en Does not change when it is 0
        if (optionsWrapperHeight === 0) return;
        const tempEl = getAnchorElement
            ? getAnchorElement()
            : dropdownContainer.current?.parentElement;
        const { bottom, top } = tempEl?.getBoundingClientRect() || {
            bottom: 0,
            top: 0,
        };
        const tempTop = props.top || bottom;
        const tempBottom = props.bottom || windowHeight - top;
        const tempMaskHeight = windowHeight - tempTop;
        // 没有指定方向，且空间足够时，或向上展开的空间不够，向下展开
        // @en If there is no specified direction and there is enough space, or there is not enough space to expand upward, expand downward
        const tempDown =
            (direction !== 'up' && optionsWrapperHeight < tempMaskHeight) ||
            optionsWrapperHeight > tempTop;
        if (tempDown) {
            maskHeight.current = tempMaskHeight;
            setPositionStyle({ top: `${tempTop}px`, bottom: '' });
        } else {
            maskHeight.current = windowHeight - tempBottom;
            setPositionStyle({ top: '', bottom: `${tempBottom}px` });
        }
        setDown(tempDown);
    }, [
        dropdownContainer,
        optionsWrapperHeight,
        props.top,
        props.bottom,
        Boolean(getAnchorElement),
        direction,
        windowHeight,
    ]);

    /**
     * 取消选择
     * @en Cancel selection
     * */
    const handleCancel = useCallback(
        e => {
            const optionsWrapperDom = optionsWrapper.current;
            if (!e || !optionsWrapperDom) {
                return;
            }
            const target = e.target as HTMLElement;
            if (!optionsWrapperDom.contains(target) && !ifStopTouch(target)) {
                onCancel();
            }
            e.stopPropagation();
        },
        [ifStopTouch, onCancel],
    );

    /**
     * 当面板放下时，给body添加事件监听，面板收起时，移除
     * @en When the panel is down, add an event listener to the body, and when the panel is retracted, remove it
     * */
    useEffect(() => {
        const needBind = showDropdown && clickOtherToClose;
        const event = touchToClose ? 'touchstart' : 'click';
        if (needBind) {
            document.addEventListener(event, handleCancel);
        }
        return () => {
            if (needBind) {
                document.removeEventListener(event, handleCancel);
            }
        };
    }, [showDropdown, clickOtherToClose, handleCancel]);

    useEffect(() => {
        if (height !== void 0) {
            // 受控模式下，完全交由外层控制
            // @en In controlled mode, it is completely controlled by the outer layer
            setOptionsWrapperHeight(height);
        } else {
            if (!optionsContainer.current) return;
            if (!showDropdown) setOptionsWrapperHeight(0);
            else {
                setOptionsWrapperHeight(optionsContainer.current.getBoundingClientRect().height);
            }
        }
    }, [showDropdown, options.length, height]);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    function getOptionsStyle() {
        const trans = down ? 'translateY(-100%)' : 'translateY(100%)';
        return getStyleWithVendor({
            // height: `${optionsWrapperHeight}px`,
            transform: optionsWrapperHeight ? '' : trans,
            transition: `transform ${dropdownAnimationTimeout}ms ${dropdownAnimationFunction}`,
            overflow: optionsWrapperHeight > maxHeight || height ? 'auto' : 'hidden',
            maxHeight: `${maxHeight}px`,
        });
    }

    function renderInnerOptions() {
        const optionProps = { options, useColumn };
        const value = props.selectedValue !== void 0 ? props.selectedValue : innerValue;
        return props.multiple === true ? (
            <Options
                {...optionProps}
                multiple
                selectedValue={value as number[]}
                onOptionClick={props.onOptionClick}
                onOptionChange={(vals, op) => {
                    setInnerValue(vals);
                    props.onOptionChange?.(vals, op);
                }}
            />
        ) : (
            <Options
                {...optionProps}
                multiple={props.multiple}
                selectedValue={value as number}
                onOptionClick={props.onOptionClick}
                onOptionChange={(vals, op) => {
                    setInnerValue(vals);
                    props.onOptionChange?.(vals, op);
                }}
            />
        );
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div ref={dropdownContainer}>
                    <Portal getContainer={getPortalContainer}>
                        <CSSTransition
                            in={showDropdown}
                            timeout={Math.max(dropdownAnimationTimeout, maskAnimationTimeout)}
                            onEnter={el => {
                                el.style.visibility = 'visible';
                            }}
                            onExited={el => {
                                el.style.visibility = 'hidden';
                            }}
                            mountOnEnter={mountOnEnter}
                            unmountOnExit={unmountOnExit}
                        >
                            <div
                                className={cls(
                                    `${prefixCls}-dropdown all-border-box`,
                                    system,
                                    className,
                                    { 'drop-up': !down },
                                )}
                                ref={domRef}
                                style={{
                                    height: `${maskHeight.current}px`,
                                    maxWidth: `${windowWidth}px`,
                                    ...style,
                                    ...positionStyle,
                                }}
                            >
                                <div
                                    className={cls(`${prefixCls}-dropdown-options`)}
                                    ref={optionsWrapper}
                                    style={getOptionsStyle()}
                                >
                                    <div
                                        className={cls(`${prefixCls}-dropdown-options-container`)}
                                        ref={optionsContainer}
                                    >
                                        {props.children || renderInnerOptions()}
                                        {props.extraNode}
                                    </div>
                                </div>
                                {showMask && (
                                    <div
                                        className={cls(`${prefixCls}-dropdown-mask`, {
                                            'is-show': optionsWrapperHeight,
                                        })}
                                        style={{
                                            transition: `opacity ${maskAnimationTimeout}ms ${maskAnimationFunction}`,
                                        }}
                                    />
                                )}
                            </div>
                        </CSSTransition>
                    </Portal>
                </div>
            )}
        </ContextLayout>
    );
});

/**
 * 下拉面板，展示供选择的选择项
 * @en Dropdown panel, showing options to choose from
 * @type 导航
 * @type_en Navigation
 * @name 下拉面板
 * @name_en Dropdown
 */
export default componentWrapper(Dropdown, {
    Options,
});
