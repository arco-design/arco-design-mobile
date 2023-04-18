import React, { useEffect, useState, useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { cls, componentWrapper, nextTick } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Popup from '../popup';
import PickerView, { PickerViewRef, ValueType, PickerCellMovingStatus } from '../picker-view';
import { PickerProps } from './type';
import { useListenResize } from '../_helpers';

export * from './type';
export { MultiPicker, PickerCell, Cascader } from '../picker-view';

export interface PickerRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 每一列的滑动状态
     * @en Sliding state of each column
     */
    getCellMovingStatus: () => PickerCellMovingStatus[];
    /**
     * 手动更新元素布局
     * @en Manually update the element layout
     */
    updateLayout: () => void;
    /**
     * 获取所有列的值
     * @en Get all column values
     */
    getAllColumnValues: () => ValueType[];
    /**
     * 获取第 n 列的值
     * @en Get the value of the nth column
     */
    getColumnValue: (index: number) => ValueType;
    /**
     * 直接跳到当前最近一行（调用时将中断滚动）
     * @en Jump directly to the current most recent line (will break scrolling when called)
     */
    scrollToCurrentIndex: () => void;
}

const Picker = forwardRef((props: PickerProps, ref: Ref<PickerRef>) => {
    const {
        className,
        itemStyle,
        cascade = true,
        cols = 3,
        rows = 5,
        data,
        okText,
        dismissText,
        disabled = false,
        clickable = true,
        hideEmptyCols = false,
        title = '',
        visible = false,
        value,
        needBottomOffset = false,
        onDismiss,
        onOk,
        onChange,
        maskClosable = false,
        onHide,
        onPickerChange,
        touchToStop,
        gestureOutOfControl = true,
        ...otherProps
    } = props;

    const [scrollValue, setScrollValue] = useState(value);
    const domRef = useRef<HTMLDivElement | null>(null);
    const pickerViewRef = useRef<PickerViewRef>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        getCellMovingStatus: () => pickerViewRef.current?.getCellMovingStatus() || [],
        getAllColumnValues: () => pickerViewRef.current?.getAllColumnValues() || [],
        getColumnValue: index => pickerViewRef.current?.getColumnValue(index) || '',
        updateLayout: () => pickerViewRef.current?.updateLayout(),
        scrollToCurrentIndex: () => pickerViewRef.current?.scrollToCurrentIndex(),
    }));

    function handleDismiss() {
        if (onDismiss) {
            onDismiss();
        }
        if (onHide) {
            onHide('dismiss');
        }
    }

    const handleConfirm = () => {
        pickerViewRef.current?.scrollToCurrentIndex();
        nextTick(() => {
            const val = pickerViewRef.current?.getAllColumnValues() || scrollValue || [];
            if (onOk) {
                onOk(val);
            }
            if (onChange) {
                onChange(val);
            }
            if (onHide) {
                onHide('confirm');
            }
        });
    };

    useEffect(() => {
        setScrollValue(value);
    }, [value, setScrollValue]);

    useListenResize(updateLayoutByVisible, [visible]);

    // 每次visible从false变为true时需要重新设置scrollValue的值为当前value的值（初始值）
    function updateLayoutByVisible() {
        if (visible && pickerViewRef.current) {
            pickerViewRef.current.updateLayout();
        }
    }

    useEffect(() => {
        updateLayoutByVisible();
    }, [visible]);

    return (
        <ContextLayout>
            {({ prefixCls, locale }) => (
                <Popup
                    visible={visible}
                    className={cls(className, `${prefixCls}-picker all-border-box`)}
                    close={() => onHide?.('mask')}
                    direction="bottom"
                    maskClosable={maskClosable}
                    needBottomOffset={needBottomOffset}
                    gestureOutOfControl={gestureOutOfControl}
                    {...otherProps}
                >
                    <div className={`${prefixCls}-picker-wrap`} ref={domRef}>
                        <div className={`${prefixCls}-picker-header`}>
                            <div
                                className={`${prefixCls}-picker-header-btn left`}
                                onClick={handleDismiss}
                            >
                                {dismissText || locale?.Picker.cancelText}
                            </div>
                            <div className={`${prefixCls}-picker-header-title`}>{title}</div>
                            <div
                                className={`${prefixCls}-picker-header-btn right`}
                                onClick={handleConfirm}
                            >
                                {okText || locale?.Picker.okText}
                            </div>
                        </div>
                        <PickerView
                            ref={pickerViewRef}
                            data={data}
                            cascade={cascade}
                            cols={cols}
                            rows={rows}
                            disabled={disabled}
                            value={value}
                            onPickerChange={onPickerChange}
                            itemStyle={itemStyle}
                            clickable={clickable}
                            hideEmptyCols={hideEmptyCols}
                            touchToStop={touchToStop}
                        />
                    </div>
                </Popup>
            )}
        </ContextLayout>
    );
});

/**
 * 选择器组件，形式是弹起的浮层。
 * @en The selector component, in the form of a popup layer.
 * @type 数据录入
 * @type_en Data Entry
 * @name 选择器
 * @name_en Picker
 * @displayName Picker
 */
export default componentWrapper(Picker, 'Picker');
