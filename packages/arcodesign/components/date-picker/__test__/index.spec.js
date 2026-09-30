import React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import { defaultContext } from '../../context-provider';
import '@testing-library/jest-dom';

const prefix = `${defaultContext.prefixCls}-picker`;
const datePrefix = `${defaultContext.prefixCls}-date-picker`;

demoTest('date-picker');

mountTest(DatePicker, 'DatePicker');

describe('DatePicker', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Base styles render correctly', async () => {
        const mockFn = jest.fn();
        const { rerender } = render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                currentTs={new Date('2020-02-29 00:00:00'.replace(/-/g, '/')).getTime()}
                onValueChange={mockFn}
                onOk={mockFn}
            />,
        );
        rerender(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                currentTs={new Date('2020-03-29 00:00:00'.replace(/-/g, '/')).getTime()}
                onValueChange={mockFn}
                onOk={mockFn}
            />,
        );
        const btn = document.querySelector(`.${prefix}-header-btn.right`);
        await userEvent.click(btn);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(mockFn.mock.calls.length).toBe(7);
        expect(document.querySelectorAll(`.${prefix}-column`).length).toBe(6);
    });
    it('Time constraints render correctly', () => {
        const { rerender } = render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                minTs={new Date('2022-02-29 00:00:00'.replace(/-/g, '/')).getTime()}
                currentTs={new Date('2020-02-29 00:00:00'.replace(/-/g, '/')).getTime()}
            />,
        );
        expect(document.querySelector(`.${prefix}-column-item.selected`)).toHaveTextContent('2022');

        rerender(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                maxTs={new Date('2022-02-29 00:00:00'.replace(/-/g, '/')).getTime()}
                currentTs={new Date('2025-02-29 00:00:00'.replace(/-/g, '/')).getTime()}
            />,
        );
        expect(document.querySelector(`.${prefix}-column-item.selected`)).toHaveTextContent('2022');
    });
    it('Option filtering renders correctly', () => {
        render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                typeArr={['hour', 'minute', 'second']}
                valueFilter={(type, value) => {
                    if (type === 'second') {
                        return value % 5 === 0;
                    }
                    return true;
                }}
                currentTs={new Date('2025-02-29 00:00:00'.replace(/-/g, '/')).getTime()}
            />,
        );
        expect(document.querySelector(`.${prefix}-multi`)).toHaveTextContent(
            '000102030405060708091011121314151617181920212223000102030405060708091011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859000510152025303540455055',
        );
    });
    it('Date range render correctly', () => {
        render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                currentTs={[
                    new Date('2020-02-29 00:00:00'.replace(/-/g, '/')).getTime(),
                    new Date('2020-02-29 00:00:00'.replace(/-/g, '/')).getTime(),
                ]}
            />,
        );
        expect(document.querySelectorAll(`.${datePrefix}-show`).length).toBe(1);
    });

    it('should switch range tab and callback with range values on confirm', async () => {
        const onOk = jest.fn();
        const onChange = jest.fn();
        render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                currentTs={[
                    new Date('2020-02-29 10:20:30'.replace(/-/g, '/')).getTime(),
                    new Date('2020-03-15 12:00:00'.replace(/-/g, '/')).getTime(),
                ]}
                onOk={onOk}
                onChange={onChange}
            />,
        );

        const rangeItems = document.querySelectorAll(`.${datePrefix}-range-item`);
        expect(rangeItems).toHaveLength(2);
        expect(rangeItems[0]).toHaveClass(`${datePrefix}-range-item-active`);

        // 切换到右 tab，激活态跟随变化
        userEvent.click(rangeItems[1]);
        act(() => {});
        expect(rangeItems[1]).toHaveClass(`${datePrefix}-range-item-active`);
        expect(rangeItems[0]).not.toHaveClass(`${datePrefix}-range-item-active`);

        // 切回左 tab
        userEvent.click(rangeItems[0]);
        act(() => {});
        expect(rangeItems[0]).toHaveClass(`${datePrefix}-range-item-active`);

        // 点击确认，range 模式回调参数为长度 2 的时间戳数组
        const btn = document.querySelector(`.${prefix}-header-btn.right`);
        await userEvent.click(btn);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(onOk).toBeCalledTimes(1);
        const [confirmTs, confirmObj] = onOk.mock.calls[0];
        expect(confirmTs).toHaveLength(2);
        expect(Array.isArray(confirmObj)).toBe(true);
        expect(confirmObj).toHaveLength(2);
        expect(onChange).toBeCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toHaveLength(2);
    });

    it('should correct right time to be not earlier than left time when switching range tab', () => {
        render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                currentTs={[
                    new Date('2020-06-15 12:00:00'.replace(/-/g, '/')).getTime(),
                    new Date('2020-03-15 08:00:00'.replace(/-/g, '/')).getTime(),
                ]}
            />,
        );
        const rangeItems = document.querySelectorAll(`.${datePrefix}-range-item`);
        // 挂载时右时间被校正为不早于左时间
        expect(rangeItems[1]).toHaveTextContent('2020/06/15 12:00');

        // 切换到右 tab，当前时间跟随右时间
        userEvent.click(rangeItems[1]);
        act(() => {});
        expect(rangeItems[1]).toHaveClass(`${datePrefix}-range-item-active`);

        // 切回左 tab
        userEvent.click(rangeItems[0]);
        act(() => {});
        expect(rangeItems[0]).toHaveClass(`${datePrefix}-range-item-active`);
    });

    it('should expose dom via ref', () => {
        const ref = React.createRef();
        render(
            <DatePicker
                ref={ref}
                visible
                maskClosable
                disabled={false}
                currentTs={new Date('2020-02-29 00:00:00'.replace(/-/g, '/')).getTime()}
            />,
        );
        expect(ref.current.dom).toBe(document.querySelector(`.${prefix}-wrap`));
    });

    it('should process columns by columnsProcessor', () => {
        const columnsProcessor = jest.fn(columns => columns);
        render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                typeArr={['hour', 'minute']}
                columnsProcessor={columnsProcessor}
                currentTs={new Date('2020-02-29 10:20:30'.replace(/-/g, '/')).getTime()}
            />,
        );
        expect(columnsProcessor).toBeCalled();
        // 返回原数组时列渲染不变
        expect(document.querySelectorAll(`.${prefix}-column`).length).toBe(2);
    });

    it('should render range item text by rangeItemFormat', () => {
        render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                rangeItemFormat="YYYY/MM/DD HH:mm:ss"
                currentTs={[
                    new Date('2020-02-29 10:20:30'.replace(/-/g, '/')).getTime(),
                    new Date('2020-03-15 12:00:00'.replace(/-/g, '/')).getTime(),
                ]}
            />,
        );
        const rangeItems = document.querySelectorAll(`.${datePrefix}-range-item`);
        expect(rangeItems[0]).toHaveTextContent('2020/02/29 10:20:30');
        expect(rangeItems[1]).toHaveTextContent('2020/03/15 12:00:00');
    });

    it('should keep format unchanged for missing unit in rangeItemFormat', () => {
        render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                rangeItemFormat="MM-DD HH:mm"
                currentTs={[
                    new Date('2020-02-29 10:20:30'.replace(/-/g, '/')).getTime(),
                    new Date('2020-03-15 12:00:00'.replace(/-/g, '/')).getTime(),
                ]}
            />,
        );
        const rangeItems = document.querySelectorAll(`.${datePrefix}-range-item`);
        // 不含 Y/s，缺失单位不影响输出
        expect(rangeItems[0]).toHaveTextContent('02-29 10:20');
        expect(rangeItems[1]).toHaveTextContent('03-15 12:00');
    });

    it('should render linked container by renderLinkedContainer', () => {
        const renderLinkedContainer = jest.fn(() => <div className="custom-linked">linked</div>);
        const { container } = render(
            <DatePicker
                visible
                maskClosable
                disabled={false}
                renderLinkedContainer={renderLinkedContainer}
                currentTs={new Date('2020-02-29 10:20:30'.replace(/-/g, '/')).getTime()}
            />,
        );
        expect(renderLinkedContainer).toBeCalled();
        expect(container.querySelector('.custom-linked')).toHaveTextContent('linked');
    });
});
