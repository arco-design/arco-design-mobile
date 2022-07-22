import React, {
    Children,
    createContext,
    forwardRef,
    Ref,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { useRefState } from '../_helpers';
import { TabBarItemProps, TabBarItemRef, TabBarRef, TabBarProps } from './type';

export const TabBarContext = createContext<TabBarContextParams>({
    changeIndex: () => {},
    active: false,
    index: 0,
    activeCustomStyle: {},
});
interface TabBarContextParams {
    changeIndex: (index: number) => void;
    active: boolean;
    index: number;
    activeCustomStyle?: React.CSSProperties;
}

export function componentGenerator<
    P extends TabBarItemProps = TabBarItemProps,
    R extends TabBarItemRef = TabBarItemRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: TabBarProps<P>, ref: Ref<TabBarRef>) => {
        const {
            defaultActiveIndex = 0,
            activeIndex: activeIndexProps,
            className,
            fixed = true,
            style,
            dataSource,
            children,
            onChange,
            activeCustomStyle,
        } = props;
        const [innerIndex, setInnerIndex] = useState(defaultActiveIndex);
        const [activeIndex, activeRefIndex, setActiveIndex] = useRefState(
            activeIndexProps === void 0 ? innerIndex : activeIndexProps,
        );
        useEffect(() => {
            setActiveIndex(activeIndexProps === void 0 ? innerIndex : activeIndexProps);
        }, [activeIndexProps, innerIndex]);

        const domRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
            changeIndex,
        }));

        const renderItem = useCallback(
            (child: React.ReactNode, index: number) => (
                <TabBarContext.Provider
                    value={{
                        active: index === activeIndex,
                        changeIndex,
                        index,
                        activeCustomStyle,
                    }}
                    key={index}
                >
                    {child}
                </TabBarContext.Provider>
            ),
            [activeIndex],
        );

        function changeIndex(index: number) {
            setInnerIndex(index);
            index !== activeRefIndex.current && onChange?.(index);
        }

        return (
            <ContextLayout>
                {({ prefixCls }) => (
                    <div
                        className={cls(`${prefixCls}-tab-bar`, className, {
                            [`${prefixCls}-tab-bar-fixed`]: fixed,
                        })}
                        style={style}
                        ref={domRef}
                    >
                        {dataSource
                            ? dataSource.map((data, index) =>
                                  renderItem(<Comp key={index} {...data} />, index),
                              )
                            : Children.toArray(children).map((child, index) =>
                                  renderItem(child, index),
                              )}
                    </div>
                )}
            </ContextLayout>
        );
    });
}
