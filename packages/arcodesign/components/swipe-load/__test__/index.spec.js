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
});
