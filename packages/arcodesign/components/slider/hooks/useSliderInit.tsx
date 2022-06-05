import React, { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import { SliderContext } from '.';

export const useSliderInit = ({ commonIsTouching }: { commonIsTouching: number }) => {
    const ctx = useContext(SliderContext);
    const { value, min, max, onAfterChange, onChange, useMarkOnly, marks, useRange } = ctx;
    const baseValue = ctx?.value ?? ctx?.defaultValue ?? min;
    const [valueGroup, setValueGroup] = useState<number | [number, number]>(baseValue);
    const [firstRender, setFirstRender] = useState(false);
    const [firstTouch, setFirstTouch] = useState(false);

    // 基础标签数组
    // @en Base mark list
    const baseConfig = useMemo(() => {
        if (marks === void 0) return [];
        let res: number[] = [];
        if (typeof marks === 'number') {
            res = Array((max - min) / marks + 1)
                .fill('')
                .map((_, idx) => idx * marks);
        } else if (Array.isArray(marks)) {
            res = marks;
        } else {
            res = Object.keys(marks).map(e => parseInt(e));
        }
        return [...res].filter(e => e <= max && e >= min).sort((a, b) => (a > b ? 1 : -1));
    }, [marks, max, min]);

    const validate = useCallback(
        (newValue: number) => {
            if (typeof valueGroup === 'number') return newValue <= valueGroup;
            const [small, large] = [...valueGroup].sort((a, b) => (a > b ? 1 : -1));
            return newValue >= small && newValue <= large;
        },
        [valueGroup],
    );

    // 实际 mark 标签
    // @en Actual mark tags
    const runTimeConfig = useMemo(() => {
        return baseConfig.map(e => {
            const label =
                marks && !Array.isArray(marks) && marks[String(e)] && typeof marks !== 'number' ? (
                    marks[String(e)]
                ) : (
                    <p>{e}</p>
                );
            return {
                activated: validate(e),
                value: e,
                label,
            };
        });
    }, [baseConfig, valueGroup, validate, marks]);

    // 当前值最近的标签值
    // @en The mark value closest to the current value
    const formatMarksValue = useCallback(
        (newValue: number | [number, number]) => {
            if (!useMarkOnly || marks === void 0) return newValue;
            const format = (v: number) => {
                let idx: number | undefined;
                baseConfig.forEach((e, i) => {
                    if (v >= e) {
                        idx = i;
                    }
                });
                if (idx !== void 0) {
                    const largerIdx = idx + 1;
                    if (
                        largerIdx < baseConfig.length &&
                        Math.abs(baseConfig[largerIdx] - v) < Math.abs(baseConfig[idx] - v)
                    ) {
                        return baseConfig[largerIdx];
                    }
                    return baseConfig[idx];
                }
                return baseConfig[0];
            };
            if (typeof newValue === 'number') return format(newValue);
            return newValue.map(v => format(v)) as [number, number];
        },
        [useMarkOnly, marks, baseConfig],
    );

    /**
     * 标记第一次渲染，方便获取位置
     * @en Mark the first render for easy location
     */
    useEffect(() => {
        if (commonIsTouching) setFirstTouch(true);
    }, [commonIsTouching]);

    /**
     * 是否为 range，多个游标
     * @en Whether it is range, multiple cursors
     */
    const isMultiThumb = useMemo(
        () => useRange || Array.isArray(baseValue),
        [useRange, typeof baseValue === 'number'],
    );

    /**
     * 为 range 组件初始化数据
     * @en Initialize data for the range component
     */
    useEffect(() => {
        setFirstRender(true);
        /**
         * 初始化数据
         * @en Initialize data
         */
        const newValue =
            isMultiThumb && typeof valueGroup === 'number'
                ? formatMarksValue([valueGroup, valueGroup])
                : formatMarksValue(valueGroup);
        setValueGroup(newValue);
    }, [isMultiThumb]);

    /**
     * 监听数据 value 变化
     * @en Monitor data value changes
     */
    useEffect(() => {
        if (value === void 0 || !firstRender || commonIsTouching !== -1) return;
        const newValue =
            isMultiThumb && typeof value === 'number'
                ? formatMarksValue([value, value])
                : formatMarksValue(value);
        setValueGroup(newValue);
        // 如果受控需要还原
        // @en If controlled, it needs to restore
    }, [firstRender && value, commonIsTouching]);

    /**
     * 上报排序后的值
     * @en report sorted value
     */
    const formatValueGroup = useMemo(
        () =>
            typeof valueGroup === 'number'
                ? valueGroup
                : ([...valueGroup].sort((a, b) => (a > b ? 1 : -1)) as [number, number]),
        [valueGroup],
    );

    useEffect(() => {
        if (!firstTouch) return;
        if (commonIsTouching > -1) onChange(formatValueGroup);
    }, [valueGroup]);

    useEffect(() => {
        if (!firstTouch) return;
        if (commonIsTouching === -1) {
            onAfterChange(formatMarksValue(formatValueGroup));
            if (value === void 0) {
                const newValue = formatMarksValue(valueGroup);
                setValueGroup(newValue);
            }
        }
    }, [commonIsTouching, formatMarksValue]);

    return {
        valueGroup,
        setValueGroup,
        firstRender,
        runTimeConfig,
        isMultiThumb,
    };
};
