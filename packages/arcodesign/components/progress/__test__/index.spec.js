import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Progress from '..';

const prefix = `${defaultContext.prefixCls}-progress`;

demoTest('progress');

mountTest(Progress, 'Progress');

describe('Progress', () => {
    it('should render correctly', () => {
        const component = mount(<Progress percentage={75} mode="nav"/>);
        expect(component.find('.progress-bar').props().style.width).toBe('75%');
        expect(component.find('.nav-mode').length).toBe(1);
    });
    it('should render correctly when set disabled', () => {
        const component = mount(<Progress percentage={75} disabled={true}/>);
        expect(component.find(`.${prefix}`).hasClass('progress-disabled')).toBe(true);
    });
    it('should render correctly when set percent inner', () => {
        const component = mount(<Progress percentage={75} percentPosition="innerLeft"/>);
        expect(component.find('.progress-track').hasClass('position-innerLeft')).toBe(true);
        expect(component.find(`.${prefix}`).text()).toBe('75%');
    });
    it('should render correctly when set track stroke', () => {
        const component = mount(<Progress percentage={75} trackStroke={8}/>);
        expect(component.find('.progress-track').props().style.height).toBe(8);
    });
    it('should render correctly when set percent position', () => {
        const component = mount(<Progress percentage={75} percentPosition="follow" />);
        expect(component.find('.text-follow').length).toBe(1);
        expect(component.find('.text-follow').text()).toBe('75%');
    });
    it('should render correctly when set step', () => {
        const component = mount(<Progress percentage={59} step={10} />);
        expect(component.find('.progress-bar').props().style.width).toBe('50%');
    });
    it('should render correctly when set progress color', () => {
        const component = mount(<Progress percentage={75} progressColor="#FF5722" />);
        expect(component.find('.progress-bar').props().style.background).toBe('#FF5722');
    });
});
