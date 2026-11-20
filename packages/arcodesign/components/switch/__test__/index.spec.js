import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
} from '../../../tests/helpers/mockEvent';
import { defaultContext } from '../../context-provider';
import Switch from '..';

const prefix = `${defaultContext.prefixCls}-switch`;

demoTest('switch');

mountTest(Switch, 'Switch');

describe('Switch', () => {
    it('should render correctly when set as ios/android', () => {
        const { container: containerIos } = render(
            <Switch platform="ios" data-testid="switch-ios" />,
        );
        expect(containerIos.querySelector('.type-ios')).toBeTruthy();
        const { container: containerAndroid } = render(
            <Switch platform="android" data-testid="switch-android" />,
        );
        expect(containerAndroid.querySelector('.type-android')).toBeTruthy();
    });
    it('should render and callback correctly when did not use checked', () => {
        const { container } = render(<Switch />);
        const switchElement = container.querySelector(`.${prefix}`);
        expect(switchElement.classList.contains('checked')).toBe(false);
        fireEvent.touchStart(switchElement, createStartTouchEventObject({ x: 100 }));
        fireEvent.touchMove(switchElement, createMoveTouchEventObject({ x: 100 }));
        fireEvent.touchEnd(switchElement, createMoveTouchEventObject({ x: 100 }));
        waitFor(() => {
            expect(switchElement.classList.contains('checked')).toBe(true);
        });
    });
    it('should render and callback correctly when set disabled', () => {
        const mockFn = jest.fn();
        const { container } = render(<Switch disabled checked onChange={mockFn} />);
        const switchElement = container.querySelector(`.${prefix}`);
        expect(switchElement.classList.contains('disabled')).toBe(true);
        expect(switchElement.classList.contains('checked')).toBe(true);
        fireEvent.touchStart(switchElement, createStartTouchEventObject({ x: 100 }));
        fireEvent.touchMove(switchElement, createMoveTouchEventObject({ x: 120 }));
        fireEvent.touchEnd(switchElement, createMoveTouchEventObject({ x: 130 }));
        waitFor(() => {
            expect(switchElement.classList.contains('checked')).toBe(true);
            expect(mockFn).not.toBeCalled();
        });
    });
    it('should render correctly when use text', () => {
        const { container } = render(<Switch text={{ on: '关', off: '开' }} />);
        const switchElement = container.querySelector(`.${prefix}`);
        expect(container.querySelector(`.${prefix}-text`).textContent).toBe('关');
        fireEvent.touchStart(switchElement, createStartTouchEventObject({ x: 100 }));
        fireEvent.touchMove(switchElement, createMoveTouchEventObject({ x: 100 }));
        fireEvent.touchEnd(switchElement, createMoveTouchEventObject({ x: 100 }));
        expect(container.querySelector(`.${prefix}-text`).textContent).toBe('开');
    });
    it('should render correctly when use shape', () => {
        const { container, rerender } = render(<Switch shape="semi" />);
        expect(container.querySelector(`.${prefix}`).classList.contains('semi')).toBe(true);
        rerender(<Switch />);
        expect(container.querySelector(`.${prefix}`).classList.contains('fully')).toBe(true);
    });
    it('should callback correctly when swiped left/right and expose dom via ref', () => {
        const mockFn = jest.fn();
        const ref = React.createRef();
        const { getByRole } = render(<Switch ref={ref} onChange={mockFn} />);
        const switchElement = getByRole('switch');
        expect(ref.current.dom).toBe(switchElement);

        function swipeTo(endX) {
            fireEvent.touchStart(switchElement, createStartTouchEventObject({ x: 100 }));
            fireEvent.touchEnd(switchElement, createMoveTouchEventObject({ x: endX }));
        }

        swipeTo(130);
        swipeTo(130);
        expect(switchElement.getAttribute('aria-checked')).toBe('true');

        swipeTo(70);
        swipeTo(70);
        expect(switchElement.getAttribute('aria-checked')).toBe('false');
        expect(mockFn.mock.calls).toEqual([[true], [true], [false], [false]]);
    });
});
