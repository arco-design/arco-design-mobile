import React from 'react';
import { render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Progress from '..';
import '@testing-library/jest-dom';

const prefix = `${defaultContext.prefixCls}-progress`;

demoTest('progress');

mountTest(Progress, 'Progress');

describe('Progress', () => {
    it('should render correctly', () => {
        const { container: component } = render(<Progress percentage={75} mode="nav" />);
        expect(component.querySelector('.progress-bar')).toHaveStyle({ width: '75%' });
        expect(component.querySelectorAll('.nav-mode').length).toBe(1);
    });
    it('should render correctly when set disabled', () => {
        const { container: component } = render(<Progress percentage={75} disabled={true} />);
        expect(component.querySelector(`.${prefix}`)).toHaveClass('progress-disabled');
    });
    it('should render correctly when set percent inner', () => {
        const { container: component } = render(
            <Progress percentage={75} percentPosition="innerLeft" />,
        );
        expect(component.querySelector('.progress-track')).toHaveClass('position-innerLeft');
        expect(component.querySelector(`.${prefix}`)).toHaveTextContent('75%');
    });
    it('should render correctly when set track stroke', () => {
        const { container: component } = render(<Progress percentage={75} trackStroke={8} />);
        expect(component.querySelector('.progress-track')).toHaveStyle({ height: '8px' });
    });
    it('should render correctly when set percent position', () => {
        const { container: component } = render(
            <Progress percentage={75} percentPosition="follow" />,
        );
        expect(component.querySelectorAll('.text-follow').length).toBe(1);
        expect(component.querySelector('.text-follow')).toHaveTextContent('75%');
    });
    it('should render correctly when set step', () => {
        const { container: component } = render(<Progress percentage={59} step={10} />);
        expect(component.querySelector('.progress-bar')).toHaveStyle({ width: '50%' });
    });
    it('should render correctly when set progress color', () => {
        const { container: component } = render(
            <Progress percentage={75} progressColor="#FF5722" />,
        );
        expect(component.querySelector('.progress-bar')).toHaveStyle({ background: '#FF5722' });
    });
});
