import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import SwipeLoad from '..';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
} from '../../../tests/helpers/mockEvent';

demoTest('swipe-load');

mountTest(SwipeLoad, 'SwipeLoad');

describe('SwipeLoad', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render correctly when set swipe-load and children', () => {
        const { container } = render(
            <SwipeLoad maxElementOffset={54.5} maxLabelOffset={38.5} minConfirmOffset={25}>
                <div className="list-container" style={{ overflowX: 'auto' }}>
                    <div className="course-list">
                        {[1, 2, 3, 4, 5].map(item => {
                            return <div key={item} className="list-item" style={{ width: 96 }} />;
                        })}
                    </div>
                </div>
            </SwipeLoad>,
        );
        expect(container.querySelectorAll('.list-item').length).toBe(5);
    });
    it('should callback correctly when scroll to the end', () => {
        const mockFn = jest.fn();
        const { container } = render(
            <SwipeLoad
                maxElementOffset={54.5}
                maxLabelOffset={38.5}
                minConfirmOffset={25}
                disabled={false}
                onConfirm={mockFn}
            >
                <div className="list-container" style={{ overflowX: 'auto' }}>
                    <div className="course-list">
                        {[1, 2, 3].map(item => {
                            return <div key={item} className="list-item" style={{ width: 96 }} />;
                        })}
                    </div>
                </div>
            </SwipeLoad>,
        );
        const comp = container.querySelector('.list-container');
        act(() => {
            fireEvent.touchStart(comp, createStartTouchEventObject({ x: 500, y: 0 }));
            fireEvent.touchMove(comp, createMoveTouchEventObject({ x: 300, y: 0 }));
        });
        act(() => {
            fireEvent.touchEnd(comp, createMoveTouchEventObject({ x: 0, y: 0 }));
        });
        act(() => {
            jest.runAllTimers();
        });
        expect(mockFn).toBeCalled();
    });

    it('should bounce back when bumping left boundary', () => {
        const onConfirm = jest.fn();
        const { container } = render(
            <SwipeLoad bounceWhenBumpBoundary onConfirm={onConfirm}>
                <div className="item" />
            </SwipeLoad>,
        );
        const item = container.querySelector('.item');
        act(() => {
            fireEvent.touchStart(item, createStartTouchEventObject({ x: 100, y: 0 }));
            fireEvent.touchMove(item, createMoveTouchEventObject({ x: 140, y: 0 }));
        });
        act(() => {
            fireEvent.touchEnd(item, createMoveTouchEventObject({ x: 140, y: 0 }));
        });
        act(() => {
            jest.runAllTimers();
        });
        expect(onConfirm).not.toBeCalled();
    });

    it('should hide label when scrolling back left after reaching right edge', () => {
        const onConfirm = jest.fn();
        const { container } = render(
            <SwipeLoad onConfirm={onConfirm}>
                <div className="item" />
            </SwipeLoad>,
        );
        const item = container.querySelector('.item');
        Object.defineProperty(item, 'clientWidth', { value: 50, configurable: true });
        Object.defineProperty(item, 'scrollWidth', { value: 100, configurable: true });
        // 向右滑动到列表尽头
        act(() => {
            fireEvent.touchStart(item, createStartTouchEventObject({ x: 100, y: 0 }));
            fireEvent.touchMove(item, createMoveTouchEventObject({ x: 60, y: 0 }));
        });
        // 向左滑回，标签隐藏
        act(() => {
            fireEvent.touchMove(item, createMoveTouchEventObject({ x: 160, y: 0 }));
            fireEvent.touchEnd(item, createMoveTouchEventObject({ x: 160, y: 0 }));
        });
        act(() => {
            jest.runAllTimers();
        });
        expect(onConfirm).not.toBeCalled();
    });

    it('should expose dom via ref', () => {
        const ref = React.createRef();
        const { container } = render(
            <SwipeLoad ref={ref}>
                <div className="item" />
            </SwipeLoad>,
        );
        expect(ref.current.dom).toBe(container.querySelector('.arco-swipe-load'));
    });

    it('should not bind listeners when disabled', () => {
        render(
            <SwipeLoad disabled>
                <div className="item" />
            </SwipeLoad>,
        );
    });
});
