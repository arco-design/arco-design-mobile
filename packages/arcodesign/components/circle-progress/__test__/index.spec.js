import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import CircleProgress from '..';
import { render } from '@testing-library/react';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-circle-progress`;

demoTest('circle-progress');

mountTest(CircleProgress, 'CircleProgress');

describe('CircleProgress', () => {
    test('CircleProgress render correctly', () => {
        const { container } = render(<CircleProgress percentage={75} />);
        expect(container.querySelector(`.${prefix} svg`)).toBeTruthy();
    });
    
    test('Correct color rendering', () => {
        const { container } = render(
            <CircleProgress data-testid='circle-progress-demo-custom' className="circle-progress-demo-custom" progressColor="#FF5722" percentage={75} />
        );
        const circleElement = container.querySelector('.color');
        const computedStyles = window.getComputedStyle(circleElement);
        expect(computedStyles?.stroke).toBe('#FF5722');
    });
    
    test('Gradient rendering is correct', () => {
        const { container } = render(
            <CircleProgress
                className="circle-progress-demo-custom"
                progressColorStart="#14CAFF"
                progressColorEnd="#4776E6"
                percentage={100}
            />
        );
        const stops = container.querySelectorAll('stop');
        expect(stops[0].getAttribute('style')).toContain('stop-color: rgb(71, 118, 230)');
        expect(stops[1].getAttribute('style')).toContain('stop-color: rgb(20, 202, 255)');
    });
    
    test('Counterclockwise renders correctly', () => {
        const { container } = render(<CircleProgress clockwise={true} percentage={25} />);
        expect(container.querySelector('svg').getAttribute('style')).toContain('transform: rotateY(180deg) rotateZ(-90deg)');
    });
})
