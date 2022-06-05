import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import SwipeLoad from '..';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { defaultContext } from '../../context-provider';
import { createMoveTouchEventObject, createStartTouchEventObject, mockAddListener } from '../../../tests/helpers/mockEvent';

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
        const component = mount(<SwipeLoad
            maxElementOffset={54.5}
            maxLabelOffset={38.5}
            minConfirmOffset={25}
        >
            <div
                className="list-container"
                style={{ overflowX: 'auto' }}
            >
                <div className="course-list">
                    {[1, 2, 3, 4, 5].map(item => {
                        return (
                            <div
                                key={item}
                                className="list-item"
                                style={{ width: 96 }}
                            />
                        );
                    })}
                </div>
            </div>
        </SwipeLoad>);
        expect(component.find('.list-item').length).toBe(5);
    });
    it('should callback correctly when scroll to the end', () => {
        const mockFn = jest.fn();
        const component = mount(
        <SwipeLoad
            maxElementOffset={54.5}
            maxLabelOffset={38.5}
            minConfirmOffset={25}
            disabled={false}
            onConfirm={mockFn}
        >
            <div
                className="list-container"
                style={{ overflowX: 'auto' }}
            >
                <div className="course-list">
                    {[1, 2, 3].map(item => {
                        return (
                            <div
                                key={item}
                                className="list-item"
                                style={{ width: 96 }}
                            />
                        );
                    })}
                </div>
            </div>
        </SwipeLoad>);
        const map = mockAddListener(component.find('.list-container'));
        component.setProps({ disabled: true });
        component.setProps({ disabled: false });
        act(() => {
            map.touchstart(createStartTouchEventObject({ px: 500, py: 0 }));
            map.touchmove(createMoveTouchEventObject({ px: 300, py: 0 }));
        });
        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 0, py: 0 }));
        });
        act(() => {
            jest.advanceTimersByTime(250);
        });
        component.update();
        expect(mockFn).toBeCalled();
    });
});
