import React, { createRef } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import { mockElementProperty } from '../../../tests/helpers/mockElement';
import { eventCommonProps, mockAddListener } from '../../../tests/helpers/mockEvent';
import Popover from '..';
import Button from '../../button';

demoTest('popover');

mountTest(Popover, 'Popover');

const prefix = `${defaultContext.prefixCls}-popover`;

function clickButton(wrapper, event = 'click') {
    wrapper.find('button').simulate(event);
    act(() => {
        jest.advanceTimersByTime(800);
    });
    wrapper.update();
}

function mockPopoverSize(ref, width, height) {
    const { innerPopover } = ref.current;
    expect(typeof innerPopover).toBe('object');
    const { content } = innerPopover || {};
    expect(typeof content).toBe('object');
    mockElementProperty(content, 'offsetWidth', width);
    mockElementProperty(content, 'offsetHeight', height);
}

function checkHasPopoverInner(wrapper) {
    expect(wrapper.find(`.${prefix}-inner`)).toHaveLength(1);
}

function checkHasNoPopoverInner(wrapper) {
    expect(wrapper.find(`.${prefix}-inner`)).toHaveLength(0);
}

function updatePopoverPosition(wrapper, ref) {
    const { updatePosition } = ref.current;
    expect(typeof updatePosition).toBe('function');
    act(() => {
        updatePosition();
    });
    wrapper.update();
}

describe('Popover', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should open and close popover correctly', () => {
        const onChange = jest.fn();
        const ref = createRef();
        const wrapper = mount(
            <Popover
                content="Bubble"
                onChange={onChange}
                showCloseIcon
                textSuffix="suffix"
                clickSelfToClose={false}
                ref={ref}
                direction="topRight"
            >
                <Button>Button</Button>
            </Popover>,
        );
        const map = mockAddListener(document.body);
        checkHasNoPopoverInner(wrapper);
        clickButton(wrapper);
        mockPopoverSize(ref, 100, 60);
        updatePopoverPosition(wrapper, ref);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([true]);
        checkHasPopoverInner(wrapper);
        expect(wrapper.find('.popover-content')).toHaveLength(1);
        expect(wrapper.find(`.${prefix}-inner`).hasClass('with-suffix')).toBe(true);
        expect(wrapper.find('.content-text')).toHaveLength(1);
        expect(wrapper.find('.text-close-icon')).toHaveLength(1);
        expect(wrapper.find('.text-suffix')).toHaveLength(1);

        // should not close when clickSelfToClose=false and click button
        clickButton(wrapper);
        expect(onChange.mock.calls).toHaveLength(1);
        checkHasPopoverInner(wrapper);

        // should close when clickSelfToClose=true and click button
        wrapper.setProps({
            clickSelfToClose: true,
            clickOtherToClose: true,
            preventBodyClick: true,
        });
        clickButton(wrapper);
        expect(onChange.mock.calls).toHaveLength(2);
        expect(onChange.mock.calls[1]).toEqual([false]);
        checkHasNoPopoverInner(wrapper);

        // should close when clickOtherToClose=true and click body
        clickButton(wrapper);
        checkHasPopoverInner(wrapper);
        act(() => {
            map.click({ target: document.body, ...eventCommonProps });
            jest.advanceTimersByTime(800);
        });
        wrapper.update();
        checkHasNoPopoverInner(wrapper);

        // should not close when touchToClose=true and button's click event triggered
        wrapper.setProps({ touchToClose: true });
        clickButton(wrapper);
        checkHasPopoverInner(wrapper);
        clickButton(wrapper);
        checkHasPopoverInner(wrapper);

        // should not close when touchToClose=true and button's touchstart event triggered
        clickButton(wrapper, 'touchstart');
        checkHasNoPopoverInner(wrapper);

        // should support touch body to close
        clickButton(wrapper);
        checkHasPopoverInner(wrapper);
        act(() => {
            map.touchstart({ targetTouches: [{ target: document.body }] });
            map.click({ target: document.body, ...eventCommonProps });
            jest.advanceTimersByTime(800);
        });
        wrapper.update();
        checkHasNoPopoverInner(wrapper);

        // should support the property `duration`
        wrapper.setProps({ duration: 1000 });
        clickButton(wrapper);
        checkHasPopoverInner(wrapper);
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        wrapper.update();
        checkHasNoPopoverInner(wrapper);
    });

    it('should adjust itself correctly when shown on the edge', () => {
        const ref = createRef();
        const wrapper = mount(
            <Popover content="Bubble" ref={ref} direction="bottomCenter">
                <Button>Button</Button>
            </Popover>,
        );
        clickButton(wrapper);
        mockElementProperty(screen, 'availWidth', 375);
        window.innerHeight = 700;
        const { child } = ref.current;
        expect(typeof child).toBe('object');
        // bottom overflow
        mockPopoverSize(ref, 700, 100);
        child.getBoundingClientRect = jest.fn(() => ({
            top: 600,
            bottom: 690,
            left: 10,
            right: 100,
            width: 90,
            height: 90,
        }));
        updatePopoverPosition(wrapper, ref);
        expect(wrapper.find('.popover-content').hasClass('topCenter')).toBe(true);
        // top overflow
        mockPopoverSize(ref, 375, 100);
        child.getBoundingClientRect = jest.fn(() => ({
            top: 10,
            bottom: 100,
            left: 10,
            right: 100,
            width: 90,
            height: 90,
        }));
        wrapper.setProps({ direction: 'topLeft' });
        wrapper.update();
        expect(wrapper.find('.popover-content').hasClass('bottomLeft')).toBe(true);
        wrapper.setProps({ mode: 'global' });
        expect(wrapper.find(`.${prefix}-inner`).hasClass('global-mode')).toBe(true);
    });

    it('should support Popover.Menu', () => {
        const onChange = jest.fn();
        const onSelect = jest.fn();
        const wrapper = mount(
            <Popover.Menu
                onChange={onChange}
                onSelect={onSelect}
                menu={[
                    {
                        value: 'first',
                        text: 'Menu 1',
                    },
                    {
                        text: 'Menu 2',
                        disabled: true,
                    },
                    {
                        text: 'Menu 3',
                        icon: <div />,
                    },
                    'Menu 4',
                ]}
                theme="white"
                key="vertical"
                clickSelfToClose={false}
            >
                <Button>Button</Button>
            </Popover.Menu>,
        );
        clickButton(wrapper);
        checkHasPopoverInner(wrapper);
        expect(wrapper.find(`.${prefix}-menu-content`)).toHaveLength(1);
        expect(wrapper.find(`.${prefix}-menu-item`)).toHaveLength(4);
        expect(wrapper.find(`.${prefix}-menu-item`).at(1).hasClass('disabled')).toBe(true);
        expect(
            wrapper.find(`.${prefix}-menu-item`).at(2).find(`.${prefix}-menu-icon`),
        ).toHaveLength(1);
        // disabled item cannot trigger onSelect
        wrapper.find(`.${prefix}-menu-item`).at(1).simulate('click');
        expect(onSelect.mock.calls).toHaveLength(0);
        wrapper.find(`.${prefix}-menu-item`).at(0).simulate('touchstart');
        wrapper.find(`.${prefix}-menu-item`).at(0).simulate('click');
        expect(onSelect.mock.calls).toHaveLength(1);
        expect(onSelect.mock.calls[0]).toEqual([
            'first',
            {
                value: 'first',
                text: 'Menu 1',
            },
        ]);
        expect(onChange.mock.calls).toHaveLength(1);
        wrapper.setProps({
            useClickStatus: true,
            clickStatusDuration: 500,
            clickSelfToClose: true,
        });
        wrapper.find(`.${prefix}-menu-item`).at(2).simulate('touchstart');
        wrapper.find(`.${prefix}-menu-item`).at(2).simulate('click');
        expect(wrapper.find(`.${prefix}-menu-item`).at(2).hasClass('active')).toBe(true);
        act(() => {
            jest.advanceTimersByTime(600);
        });
        wrapper.update();
        expect(wrapper.find(`.${prefix}-menu-item`)).toHaveLength(0);
        expect(onChange.mock.calls).toHaveLength(2);
        expect(onChange.mock.calls[1]).toEqual([false]);
    });
});
