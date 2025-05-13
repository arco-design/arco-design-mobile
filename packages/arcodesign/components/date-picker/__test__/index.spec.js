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
});
