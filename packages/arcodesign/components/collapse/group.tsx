import React, {
    forwardRef,
    Ref,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { Collapse } from './collapse';
import { defaultContextKey, getCollapseContext, CollapseKeyContext } from './utils';
import { GlobalContext } from '../context-provider';
import {
    CollapseItemContent,
    CollapseProps,
    CollapseRef,
    CollapseGroupProps,
    CollapseGroupRef,
} from './type';

export function componentGenerator<
    P extends CollapseItemContent = CollapseProps,
    R extends CollapseRef = CollapseRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: CollapseGroupProps<P>, ref: Ref<CollapseGroupRef | null>) => {
        const {
            items = [],
            className = '',
            style = {},
            defaultActiveItems = [],
            useAccordion = false,
            disabled = false,
            children,
            groupKey,
        } = props;
        const [innerActiveItems, setInnerActiveItems] = useState<boolean[]>([]);
        const [activeItems, setActiveItems] = useState<boolean[]>([]);
        /** 用于children模式下的active管理 */
        const [childActiveItems, setChildActiveItems] = useState<string[]>([]);
        const contextKey = groupKey || defaultContextKey;
        const CollapseContext = getCollapseContext(contextKey);
        const domRef = useRef<HTMLDivElement | null>(null);
        const { prefixCls } = useContext(GlobalContext);

        const formatArray = (input: string[]) => {
            const arr = input;
            return items.map(item => arr.indexOf(item.value) > -1);
        };

        const handleChange = (value: string) => {
            if (disabled) return;
            if (props.onCollapse) {
                props.onCollapse(value);
            }
            if (props.activeItems !== void 0) {
                setInnerActiveItems(formatArray(props.activeItems));
                setChildActiveItems(props.activeItems);
                return;
            }
            if (!children) {
                const temp = items.findIndex(item => item.value === value);
                if (temp < 0 || items[temp].disabled) return;
                const tempActiveItems = innerActiveItems.map((activeItem, index) =>
                    index === temp ? !activeItem : !useAccordion && activeItem,
                );
                setInnerActiveItems(tempActiveItems);
            } else {
                const tempValue = childActiveItems.includes(value);
                setChildActiveItems(
                    tempValue
                        ? childActiveItems.filter(item => item !== value)
                        : useAccordion // 手风琴模式只有一个展开项
                        ? [value]
                        : [...childActiveItems, value],
                );
            }
        };

        useEffect(() => {
            setInnerActiveItems(formatArray(defaultActiveItems));
            setChildActiveItems(defaultActiveItems);
        }, []);

        useEffect(() => {
            setActiveItems(
                props.activeItems === void 0 ? innerActiveItems : formatArray(props.activeItems),
            );
            if (children && props.activeItems) {
                setChildActiveItems(props.activeItems);
            }
        }, [props.activeItems, innerActiveItems]);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        return (
            <div
                className={cls(`${prefixCls}-collapse-group`, className)}
                style={style}
                ref={domRef}
            >
                <CollapseKeyContext.Provider value={{ key: contextKey }}>
                    <CollapseContext.Provider
                        value={{
                            isGroup: true,
                            onCollapse: handleChange,
                            disabled,
                            value: children ? childActiveItems : void 0,
                        }}
                    >
                        {children || (
                            <>
                                {items.map((item, index) => {
                                    const compProps = {
                                        active: activeItems[index],
                                        disabled: disabled || item.disabled,
                                        defaultActive: formatArray(defaultActiveItems)[index],
                                        ...item,
                                    };

                                    return <Comp key={item.value} {...compProps} />;
                                })}
                            </>
                        )}
                    </CollapseContext.Provider>
                </CollapseKeyContext.Provider>
            </div>
        );
    });
}

export const Group = componentGenerator(Collapse);

export default Group;
