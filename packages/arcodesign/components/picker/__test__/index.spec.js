import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Picker from '..';

const prefix = `${defaultContext.prefixCls}-picker`;

demoTest('picker');

mountTest(Picker, 'Picker');

describe('Picker', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render correctly', () => {
        const data = [
            [
                {label: '湖北', value: '湖北'},
                {label: '河南', value: '河南'},
                {label: '湖南', value: '湖南'},
                {label: '北京', value: '北京'},
                {label: '上海', value: '上海'},
                {label: '广东', value: '广东'},
                {label: '重庆', value: '重庆'},
                {label: '四川', value: '四川'}
            ]
        ];
        const value = ['北京'];
        const component = mount(<Picker data={data} value={value} visible={true} />);
        expect(component.find(`.${prefix}-wrap`).length).toBe(1);
        expect(component.find(`.${prefix}-view`).length).toBe(1);
        expect(component.find(`.${prefix}-header-btn`).length).toBe(2);
    });
    it('should callback correctly when click btn', () => {
        const data = [
            [
                {label: '湖北', value: '湖北'},
                {label: '河南', value: '河南'},
                {label: '湖南', value: '湖南'},
                {label: '北京', value: '北京'},
                {label: '上海', value: '上海'},
                {label: '广东', value: '广东'},
                {label: '重庆', value: '重庆'},
                {label: '四川', value: '四川'}
            ]
        ];
        const value = ['北京'];
        const okMock = jest.fn();
        const changeMock = jest.fn();
        const dismissMock = jest.fn();
        const component = mount(<Picker data={data} value={value} visible={true} onOk={okMock} onChange={changeMock} onDismiss={dismissMock} />);
        component.find(`.${prefix}-header-btn`).last().simulate('click');
        act(() => {
            jest.advanceTimersByTime(200);
        })
        component.update();
        expect(okMock).toBeCalled();
        expect(changeMock).toBeCalled();
        component.find(`.${prefix}-header-btn`).first().simulate('click');
        act(() => {
            jest.advanceTimersByTime(200);
        })
        component.update();
        expect(dismissMock).toBeCalled();
    });
});
