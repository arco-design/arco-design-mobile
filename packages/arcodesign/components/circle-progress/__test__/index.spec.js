import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import CircleProgress from '..';
import { mount } from 'enzyme';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-circle-progress`;

demoTest('circle-progress');

mountTest(CircleProgress, 'CircleProgress');

describe('CircleProgress', () => {
    it('CircleProgress render correctly', () => {
        const wrapper = mount(
            <CircleProgress percentage={75} />,
        );
        expect(wrapper.find(`.${prefix} svg`).length).toBe(1);
    });
    it('Correct color rendering', () => {
        const wrapper = mount(
            <CircleProgress className="circle-progress-demo-custom" progressColor="#FF5722" percentage={75} />,
        );
        expect(wrapper.find('circle').at(1).props().style.stroke).toBe('#FF5722');
    });
    it('Gradient rendering is correct', () => {
        const wrapper = mount(
            <CircleProgress className="circle-progress-demo-custom" progressColorStart="#14CAFF" progressColorEnd="#4776E6" percentage={100} />,
        );
        expect(wrapper.find('stop').at(0).props().style.stopColor).toBe('#4776E6');
        expect(wrapper.find('stop').at(1).props().style.stopColor).toBe('#14CAFF');
    });
    it('Counterclockwise renders correctly', () => {
        const wrapper = mount(
            <CircleProgress clockwise={true} percentage={25} />,
        );
        expect(wrapper.find('svg').at(0).props().style.transform).toBe('rotateY(180deg) rotateZ(-90deg)');
    });
})
