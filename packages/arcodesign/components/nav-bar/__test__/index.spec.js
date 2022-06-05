import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import NavBar from '..';
import { mount } from 'enzyme';
import { defaultContext } from '../../context-provider';
import { act } from 'react-dom/test-utils';
import { mockAddListener, createStartTouchEventObject, createMoveTouchEventObject } from '../../../tests/helpers/mockEvent';
import { mockContainerSize, resetContainerSizeMock } from '../../../tests/helpers/mockElement';

const prefix = `${defaultContext.prefixCls}-nav-bar`;

demoTest('nav-bar');

mountTest(NavBar, 'NavBar');

describe('NavBar style', () => {
    it('Common styles render correctly', () => {
        const wrapper = mount(
            <NavBar
                fixed={false}
                title="title"
                rightContent={<span>more</span>}/>
        );
        expect(wrapper.find(`.${prefix}-left`).length).toBe(1);
        expect(wrapper.find(`.${prefix}-right`).length).toBe(1);
    });
})

describe('NavBar actions', () => {

    beforeAll(() => {
        mockContainerSize();
    });

    afterAll(() => {
        resetContainerSizeMock();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Click render correctly', () => {
        const onClickLeft = jest.fn();
        const onClickRight = jest.fn();
        const wrapper = mount(
            <NavBar
                title="title"
                rightContent={<span>more</span>}
                onClickLeft={onClickLeft}
                onClickRight={onClickRight}
            />
        );
        wrapper.find(`.${prefix}-left`).simulate('click');
        wrapper.find(`.${prefix}-right`).simulate('click');
        expect(onClickLeft.mock.calls.length).toBe(1);
        expect(onClickRight.mock.calls.length).toBe(1);
    });


    it('should callback correctly when scrolled', () => {
        const wrapper = mount(
            <NavBar
                statusBarHeight={10}
                showOffset={20}
                title="title"
                getComputedStyleByScroll={() => window}
            />
        );
        const map = mockAddListener(wrapper.find(`.${prefix}`));
        wrapper.setProps({ showOffset: 20 });
        act(() => {
            map.touchstart(createStartTouchEventObject({ x: 0, y: 0 }));
            map.touchmove(createMoveTouchEventObject({ x: 0, y: 100 }));
            jest.advanceTimersByTime(1000);
        });
        act(() => {
            map.touchend(createMoveTouchEventObject({ x: 0, y: 200 }));
        });
        wrapper.update();
    });
})
