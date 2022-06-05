import { cls } from '@arco-design/mobile-utils';
import React, {
    useContext,
    useMemo,
    useState,
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
    Ref,
} from 'react';
import { GlobalContext } from '../context-provider';
import { PopoverMenuItem, PopoverMenuProps, PopoverProps, PopoverRef } from './type';

export function componentGenerator<
    P extends PopoverProps = PopoverProps,
    R extends PopoverRef = PopoverRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: PopoverMenuProps, ref: Ref<R | null>) => {
        const {
            menu,
            menuLayout = 'vertical',
            onSelect,
            onClickMenuItem,
            className = '',
            useClickStatus = false,
            clickStatusDuration = 300,
            clickSelfToClose = true,
            touchSelfToClose = props.touchToClose === void 0 ? false : props.touchToClose,
            defaultVisible = false,
            visible,
            onChange,
            ...restProps
        } = props;
        const { prefixCls } = useContext(GlobalContext);
        const [activeIndex, setActiveIndex] = useState(-1);
        const activeTimer = useRef(0);
        const formattedMenu: PopoverMenuItem[] = useMemo(() => {
            return menu.map(item => {
                if (typeof item === 'string') {
                    return {
                        text: item,
                    };
                }
                return item;
            });
        }, [menu]);

        const [visibleState, setVisibleState] = useState(
            visible === void 0 ? defaultVisible : visible,
        );

        useEffect(() => {
            setVisibleState(Boolean(visible));
        }, [visible]);

        const popoverRef = useRef<R | null>(null);

        useImperativeHandle(ref, () => popoverRef.current);

        const onVisibleChange = newVisible => {
            const handleVisibleChange = () => {
                if (onChange && typeof onChange === 'function') {
                    onChange(newVisible);
                }
                if (visible === void 0) {
                    setVisibleState(newVisible);
                }
            };

            // 如果设置了点击效果则延时回调onChange函数，留出点击效果的时间
            // @en If the click effect is set, the onChange function is delayed and called back, leaving time for the click effect
            if (!newVisible && useClickStatus) {
                window.setTimeout(handleVisibleChange, Math.max(0, clickStatusDuration - 300));
            } else {
                handleVisibleChange();
            }
        };

        const content = useMemo(
            () => (
                <div className={cls(`${prefixCls}-popover-menu-content`, `${menuLayout}-menu`)}>
                    {formattedMenu.map((item, index) => {
                        const defaultValue =
                            typeof item.text === 'string' ? item.text : `menu_item_${index}`;
                        const { text, value = defaultValue, disabled = false, icon } = item;
                        return (
                            <div
                                className={cls(`${prefixCls}-popover-menu-item`, {
                                    disabled,
                                    active: activeIndex === index,
                                })}
                                key={value}
                                onTouchStart={() => {
                                    if (useClickStatus && !disabled) {
                                        clearTimeout(activeTimer.current);
                                        setActiveIndex(index);
                                        activeTimer.current = window.setTimeout(() => {
                                            setActiveIndex(-1);
                                            activeTimer.current = 0;
                                        }, clickStatusDuration);
                                    }
                                }}
                                onClick={() => {
                                    onClickMenuItem && onClickMenuItem(value, menu[index]);
                                    if (disabled) return;
                                    onSelect && onSelect(value, menu[index]);
                                }}
                            >
                                {icon && (
                                    <div className={cls(`${prefixCls}-popover-menu-icon`)}>
                                        {icon}
                                    </div>
                                )}
                                <div className={cls(`${prefixCls}-popover-menu-text`)}>{text}</div>
                            </div>
                        );
                    })}
                </div>
            ),
            [
                prefixCls,
                menuLayout,
                formattedMenu,
                activeIndex,
                useClickStatus,
                clickStatusDuration,
                onClickMenuItem,
                onSelect,
            ],
        );

        return (
            <Comp
                ref={popoverRef}
                visible={visibleState}
                clickSelfToClose={clickSelfToClose}
                touchSelfToClose={touchSelfToClose}
                onChange={onVisibleChange}
                {...(restProps as P)}
                content={content}
                className={cls(className, `${prefixCls}-popover-menu`)}
            />
        );
    });
}
