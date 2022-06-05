import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import { mount } from 'enzyme';
import { defaultContext } from '../../context-provider';
import { act } from 'react-dom/test-utils';
const prefix = `${defaultContext.prefixCls}-picker`;

demoTest('date-picker');

mountTest(DatePicker, 'DatePicker');

describe('DatePicker', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Base styles render correctly', () => {
        const mockFn = jest.fn();
        const wrapper = mount(
            <DatePicker
                visible={true}
                maskClosable
                disabled={false}
                currentTs={new Date('2020-02-29 00:00:00'.replace(/-/g, "/")).getTime()}
                onValueChange={mockFn}
                onOk={mockFn}
            />,
        );
        wrapper.setProps({
            currentTs: new Date('2020-03-29 00:00:00'.replace(/-/g, "/")).getTime()
        });
        wrapper.find(`.${prefix}-header-btn`).at(1).simulate('click');
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        wrapper.update();
        expect(mockFn.mock.calls.length).toBe(7);
        expect(wrapper.find(`.${prefix}-column`).length).toBe(6);
    });
    it('Time constraints render correctly', () => {
        const wrapper = mount(
            <DatePicker
                visible={true}
                maskClosable
                disabled={false}
                minTs={new Date('2022-02-29 00:00:00'.replace(/-/g, "/")).getTime()}
                currentTs={new Date('2020-02-29 00:00:00'.replace(/-/g, "/")).getTime()}
            />,
        );
        expect(wrapper.find(`.${prefix}-column-item.selected`).at(0).text()).toEqual('2022');

        const wrapper1 = mount(
            <DatePicker
                visible={true}
                maskClosable
                disabled={false}
                maxTs={new Date('2022-02-29 00:00:00'.replace(/-/g, "/")).getTime()}
                currentTs={new Date('2025-02-29 00:00:00'.replace(/-/g, "/")).getTime()}
            />,
        );
        expect(wrapper1.find(`.${prefix}-column-item.selected`).at(0).text()).toEqual('2022');
    });
    it('Option filtering renders correctly', () => {
        const wrapper = mount(
            <DatePicker
                visible={true}
                maskClosable
                disabled={false}
                typeArr={['hour', 'minute', 'second']}
                valueFilter={(type, value) => {
                    if (type === 'second') {
                        return value % 5 === 0;
                    }
                    return true;
                }}
                currentTs={new Date('2025-02-29 00:00:00'.replace(/-/g, "/")).getTime()}
            />,
        );
        expect(wrapper.find(`.${prefix}-multi`).text()).toEqual('000102030405060708091011121314151617181920212223000102030405060708091011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859000510152025303540455055');
    });
})
