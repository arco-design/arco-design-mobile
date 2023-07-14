import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useState,
    useEffect,
    useContext,
} from 'react';
import { cls, convertCssDuration, nextTick } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { useRefState, useSameRefState, useUpdateEffect } from '../_helpers';
import IconArrowDown from '../icon/IconArrowDown';
import { CollapseProps, CollapseRef } from './type';
import { allContexts, CollapseKeyContext } from './utils';

export const Collapse = forwardRef((props: CollapseProps, ref: Ref<CollapseRef>) => {
    const {
        header = '',
        icon,
        hideIcon = false,
        disabled = false,
        content = null,
        defaultActive = false,
        value = '',
        active,
        animationTimeout,
        animationFunction,
        className = '',
        style = {},
    } = props;
    const [innerActive, setInnerActive] = useState(defaultActive);
    const [itemActive, itemActiveRef, setItemActive] = useRefState(
        active === void 0 ? innerActive : active,
    );
    const contentHeightRef = useRef(0);
    const collapseHeaderRef = useRef<HTMLDivElement>(null);
    const domRef = useRef<HTMLDivElement>(null);
    const contentWrapRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const { key: groupKey } = useContext(CollapseKeyContext);
    const CollapseContext = allContexts[groupKey] || {};
    const groupContext = useContext(CollapseContext) || {};
    const [opened, openedRef, setOpened] = useSameRefState(false);

    useEffect(() => {
        let show = false;
        // 优先级： group > children
        // @en Priority: group > children
        if (groupContext.isGroup) {
            if (active !== void 0) {
                show = active;
            }
            if (groupContext.value) show = groupContext.value.includes(value);
        } else {
            show = itemActive;
        }
        setOpened(show);
    }, [value, active, itemActive, groupContext.isGroup, groupContext.value]);

    const getContentHeight = () => {
        const div = contentRef.current;
        return div?.getBoundingClientRect()?.height ?? 0;
    };

    const resetHeight = (newHeight: string) => {
        if (!contentWrapRef.current) {
            return;
        }
        contentWrapRef.current.style.height = newHeight;
        const transTimeout = convertCssDuration(contentWrapRef.current, 'transitionDuration');
        setTimeout(
            () =>
                contentWrapRef.current &&
                (contentWrapRef.current.style.height = openedRef.current ? 'auto' : '0px'),
            openedRef.current ? transTimeout : 20,
        );
    };

    const toggleOpened = () => {
        const height = getContentHeight();
        const isBeginning = contentHeightRef.current === 0;
        contentHeightRef.current = height;
        if (isBeginning) {
            const initHeight = opened ? 'auto' : '0px';
            contentWrapRef.current && (contentWrapRef.current.style.height = initHeight);
            return;
        }
        resetHeight(`${height}px`);
    };

    const updateLayout = () => {
        if (!contentWrapRef.current) {
            return;
        }
        const height = getContentHeight();
        contentWrapRef.current.style.height = openedRef.current
            ? `${contentHeightRef.current}px`
            : '0px';
        nextTick(() => {
            contentHeightRef.current = height;
            resetHeight(openedRef.current ? `${height}px` : '0px');
        });
    };

    const onCollapse = (val: string) => {
        if (disabled) return;
        props.onCollapse && props.onCollapse(val);
        if (!groupContext.isGroup) {
            setInnerActive(!itemActiveRef.current);
        } else {
            groupContext.onCollapse(value);
        }
    };

    useEffect(() => {
        setItemActive(active === void 0 ? innerActive : active);
    }, [active, innerActive]);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        head: collapseHeaderRef.current,
        updateLayout,
    }));

    useEffect(() => {
        toggleOpened();
    }, [opened]);

    useUpdateEffect(() => {
        updateLayout();
    }, [content]);

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(`${prefixCls}-collapse-item`, className, {
                        disabled: disabled || groupContext.disabled,
                    })}
                    style={style}
                    ref={domRef}
                >
                    <div
                        className={cls(`${prefixCls}-collapse-header`)}
                        ref={collapseHeaderRef}
                        onClick={() => onCollapse(value)}
                    >
                        {header}
                        {!hideIcon && (
                            <div className={cls(`${prefixCls}-collapse-icon`)}>
                                {icon || (
                                    <IconArrowDown
                                        className={`${prefixCls}-collapse-icon-arrow`}
                                        style={{
                                            transform: `rotate(${opened ? '180deg' : '0deg'})`,
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div
                        className={cls(`${prefixCls}-collapse-content`)}
                        ref={contentWrapRef}
                        style={{
                            transitionDuration:
                                animationTimeout !== void 0 ? `${animationTimeout}ms` : void 0,
                            transitionTimingFunction: animationFunction,
                        }}
                    >
                        <div
                            className={cls(`${prefixCls}-collapse-content-container`)}
                            ref={contentRef}
                        >
                            {content}
                        </div>
                    </div>
                </div>
            )}
        </ContextLayout>
    );
});
