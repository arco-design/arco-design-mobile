import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    Children,
    createContext,
    useCallback,
    useState,
    useEffect,
} from 'react';
import { componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Step from './step';
import { useSystem, useRefState } from '../_helpers';
import { StepsProps, StepsRef } from './type';

export * from './type';

export const StepsContext = createContext<
    Pick<StepsProps, 'iconType' | 'current' | 'direction' | 'status' | 'align'> & {
        index?: number;
        changeIndex: (newIndex: number) => void;
    }
>({ changeIndex: () => {} });

const Steps = forwardRef((props: StepsProps, ref: Ref<StepsRef>) => {
    const {
        className = '',
        style,
        children,
        direction = 'horizontal',
        align: userSetAlign,
        iconType = 'number',
        current,
        defaultIndex = 0,
        status = 'process',
        items,
        onClick,
        onChange,
    } = props;
    const defaultAlign = direction === 'vertical' ? 'start' : 'center';
    const align = userSetAlign !== void 0 ? userSetAlign : defaultAlign;
    const [innerIndex, setInnerIndex] = useState(Number(defaultIndex));
    const [activeIndex, activeRefIndex, setActiveIndex] = useRefState(
        current === void 0 ? innerIndex : current,
    );
    const domRef = useRef<HTMLDivElement | null>(null);
    const system = useSystem();

    function changeIndex(newIndex: number) {
        onClick?.(newIndex);
        setInnerIndex(newIndex);
        newIndex !== activeRefIndex.current && onChange?.(newIndex);
    }

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    useEffect(() => {
        setActiveIndex(current === void 0 ? innerIndex : current);
    }, [current, innerIndex]);

    const renderStep = useCallback(
        (child: React.ReactNode, index: number) => (
            <StepsContext.Provider
                value={{
                    iconType,
                    current: activeIndex,
                    direction,
                    index,
                    status: activeIndex === index ? status : void 0,
                    align,
                    changeIndex,
                }}
                key={index}
            >
                {child}
            </StepsContext.Provider>
        ),
        [iconType, activeIndex, direction, align],
    );

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={`${prefixCls}-steps all-border-box ${className} ${direction} ${system}`}
                    style={style}
                    ref={domRef}
                >
                    {items
                        ? items.map((item, index) =>
                              renderStep(<Step {...item} key={index} />, index),
                          )
                        : Children.toArray(children).map((child, index) =>
                              renderStep(child, index),
                          )}
                </div>
            )}
        </ContextLayout>
    );
});

/**
 * 显示一个任务的进度; 或者引导用户完成某个复杂任务。
 * @en Display the progress of a task, or guide users to complete a complex task.
 * @name 步骤条
 * @name_en Steps
 * @type 信息展示
 * @type_en Data Display
 */
export default componentWrapper(Steps, {
    Step,
});
