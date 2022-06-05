import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { createMoveTouchEventObject, createStartTouchEventObject } from '../../../tests/helpers/mockEvent';
import { defaultContext } from '../../context-provider';
import Switch from '..';

const prefix = `${defaultContext.prefixCls}-switch`;

demoTest('switch');

mountTest(Switch, 'Switch');

describe('Switch', () => {
    it('should render correctly when set as ios/android', () => {
        const iosComponent = mount(<Switch platform="ios" />);
        expect(iosComponent.find('.type-ios').length).toBe(1);
        const androidComponent = mount(<Switch platform="android" />);
        expect(androidComponent.find('.type-android').length).toBe(1);
    });
    it('should render and callback correctly when did not use checked', () => {
        const component = mount(<Switch />);
        expect(component.find(`.${prefix}`).hasClass('checked')).toBe(false);
        component.simulate('touchStart', createStartTouchEventObject({ x: 100 }));
        component.simulate('touchMove', createMoveTouchEventObject({ x: 100 }));
        component.simulate('touchEnd', createMoveTouchEventObject({ x: 100 }));
        expect(component.find(`.${prefix}`).hasClass('checked')).toBe(true);
    });
    // it('should render and callback correctly when use checked and onChange', () => {
    //     const component = mount(<Switch />);
    //     expect(component.find(`.${prefix}`).hasClass('checked')).toBe(false);
    //     component.simulate('touchStart', createStartTouchEventObject({ x: 100 }));
    //     component.simulate('touchMove', createMoveTouchEventObject({ x: 100 }));
    //     component.simulate('touchEnd', createMoveTouchEventObject({ x: 100 }));
    //     expect(component.find(`.${prefix}`).hasClass('checked')).toBe(true);
    // });
    it('should render and callback correctly when set disabled', () => {
        const mockFn = jest.fn();
        const component = mount(<Switch disabled checked onChange={mockFn} />);
        expect(component.find(`.${prefix}`).hasClass('disabled')).toBe(true);
        expect(component.find(`.${prefix}`).hasClass('checked')).toBe(true);
        component.simulate('touchStart', createStartTouchEventObject({ x: 100 }));
        component.simulate('touchMove', createMoveTouchEventObject({ x: 120 }));
        component.simulate('touchEnd', createMoveTouchEventObject({ x: 130 }));
        expect(component.find(`.${prefix}`).hasClass('checked')).toBe(true);
        expect(mockFn).not.toBeCalled();
    });
    it('should render correctly when use innerArea', () => {

    });
    it('should render correctly when use text', () => {
        const component = mount(<Switch text={{ on: '关', off: '开' }} />);
        expect(component.find(`.${prefix}-text`).text()).toBe('关');
        component.simulate('touchStart', createStartTouchEventObject({ x: 100 }));
        component.simulate('touchMove', createMoveTouchEventObject({ x: 100 }));
        component.simulate('touchEnd', createMoveTouchEventObject({ x: 100 }));
        expect(component.find(`.${prefix}-text`).text()).toBe('开');
    });
    it('should render correctly when use shape', () => {
        const semiComponent = mount(<Switch shape="semi" />);
        expect(semiComponent.find(`.${prefix}`).hasClass('semi')).toBe(true);
        const fullyComponent = mount(<Switch />);
        expect(fullyComponent.find(`.${prefix}`).hasClass('fully')).toBe(true);
    });
    it('should render correctly when use async', () => {

    });
});
