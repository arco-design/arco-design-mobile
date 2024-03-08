import React, { createRef } from 'react';
import { act, fireEvent, render, screen as rtlScreen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import { mockElementProperty, defineProperties } from '../../../tests/helpers/mockElement';
import { eventCommonProps, mockAddListener } from '../../../tests/helpers/mockEvent';
import Popover from '..';
import Button from '../../button';
import '@testing-library/jest-dom';

demoTest('popover', { useFakeTimers: true });

mountTest(Popover, 'Popover');

const prefix = `${defaultContext.prefixCls}-popover`;

async function clickButton(event = 'click') {
    const btn = rtlScreen.getByRole('button');
    if (event === 'touchstart') {
        fireEvent.touchStart(btn);
    } else {
        await userEvent.click(btn);
    }
    act(() => {
        jest.advanceTimersByTime(800);
    });
}

function mockPopoverSize(ref, width, height) {
    const { innerPopover } = ref.current;
    expect(typeof innerPopover).toBe('object');
    const { content } = innerPopover || {};
    expect(typeof content).toBe('object');
    mockElementProperty(content, 'offsetWidth', width);
    mockElementProperty(content, 'offsetHeight', height);
}

function checkHasPopoverInner() {
    expect(document.querySelectorAll(`.${prefix}-inner`)).toHaveLength(1);
}

function checkHasNoPopoverInner() {
    expect(document.querySelectorAll(`.${prefix}-inner`)).toHaveLength(0);
}

function updatePopoverPosition(ref) {
    const { updatePosition } = ref.current;
    expect(typeof updatePosition).toBe('function');
    act(() => {
        updatePosition();
    });
}

describe('Popover', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should open and close popover correctly', async () => {
        const onChange = jest.fn();
        const ref = createRef();
        const { rerender } = render(
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
        checkHasNoPopoverInner();
        await clickButton();
        mockPopoverSize(ref, 100, 60);
        updatePopoverPosition(ref);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([true]);
        checkHasPopoverInner();
        expect(document.querySelectorAll('.popover-content')).toHaveLength(1);
        expect(document.querySelector(`.${prefix}-inner`)).toHaveClass('with-suffix');
        expect(document.querySelectorAll('.content-text')).toHaveLength(1);
        expect(document.querySelectorAll('.text-close-icon')).toHaveLength(1);
        expect(document.querySelectorAll('.text-suffix')).toHaveLength(1);

        // should not close when clickSelfToClose=false and click button
        await clickButton();
        expect(onChange.mock.calls).toHaveLength(1);
        checkHasPopoverInner();

        // should close when clickSelfToClose=true and click button
        rerender(
            <Popover
                content="Bubble"
                onChange={onChange}
                showCloseIcon
                textSuffix="suffix"
                clickSelfToClose
                clickOtherToClose
                preventBodyClick
                ref={ref}
                direction="topRight"
            >
                <Button>Button</Button>
            </Popover>,
        );
        await clickButton();
        expect(onChange.mock.calls).toHaveLength(2);
        expect(onChange.mock.calls[1]).toEqual([false]);
        checkHasNoPopoverInner();

        // should close when clickOtherToClose=true and click body
        await clickButton();
        checkHasPopoverInner();
        act(() => {
            map.click({ target: document.body, ...eventCommonProps });
            jest.advanceTimersByTime(800);
        });
        checkHasNoPopoverInner();

        // should not close when touchToClose=true and button's click event triggered
        rerender(
            <Popover
                content="Bubble"
                onChange={onChange}
                showCloseIcon
                textSuffix="suffix"
                clickSelfToClose
                clickOtherToClose
                preventBodyClick
                touchToClose
                ref={ref}
                direction="topRight"
            >
                <Button>Button</Button>
            </Popover>,
        );
        await clickButton();
        checkHasPopoverInner();
        await clickButton();
        checkHasPopoverInner();

        // should not close when touchToClose=true and button's touchstart event triggered
        await clickButton('touchstart');
        checkHasNoPopoverInner();

        // should support touch body to close
        await clickButton();
        checkHasPopoverInner();
        act(() => {
            map.touchstart({ targetTouches: [{ target: document.body }] });
            map.click({ target: document.body, ...eventCommonProps });
            jest.advanceTimersByTime(800);
        });
        checkHasNoPopoverInner();

        // should support the property `duration`
        rerender(
            <Popover
                content="Bubble"
                onChange={onChange}
                showCloseIcon
                textSuffix="suffix"
                clickSelfToClose
                clickOtherToClose
                preventBodyClick
                touchToClose
                ref={ref}
                direction="topRight"
                duration={1000}
            >
                <Button>Button</Button>
            </Popover>,
        );
        await clickButton();
        checkHasPopoverInner();
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        checkHasNoPopoverInner();
    });

    it('should adjust itself correctly when shown on the bottom edge', async () => {
        const ref = createRef();
        const { rerender } = render(
            <Popover content="Bubble" ref={ref} direction="bottomCenter">
                <Button>Button</Button>
            </Popover>,
        );
        await clickButton();
        mockElementProperty(screen, 'availWidth', 375);
        const { setProperties, unsetProperties } = defineProperties(window, { innerHeight: 700 });
        setProperties();
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
        updatePopoverPosition(ref);
        expect(document.querySelector('.popover-content')).toHaveClass('topCenter');
        rerender(
            <Popover content="Bubble" ref={ref} direction="topLeft" mode="global">
                <Button>Button</Button>
            </Popover>,
        );
        expect(document.querySelector(`.${prefix}-inner`)).toHaveClass('global-mode');
        unsetProperties();
    });

    it('should adjust itself correctly when shown on the top edge', async () => {
        const ref = createRef();
        render(
            <Popover content="Bubble" ref={ref} direction="topLeft">
                <Button>Button</Button>
            </Popover>,
        );
        await clickButton();
        mockElementProperty(screen, 'availWidth', 375);
        const { setProperties, unsetProperties } = defineProperties(window, { innerHeight: 700 });
        setProperties();
        const { child } = ref.current;
        expect(typeof child).toBe('object');
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
        updatePopoverPosition(ref);
        expect(document.querySelector('.popover-content')).toHaveClass('bottomLeft')
        unsetProperties();
    });

    it('should support Popover.Menu', async () => {
        const onChange = jest.fn();
        const onSelect = jest.fn();
        const { rerender } = render(
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
        await clickButton();
        checkHasPopoverInner();
        expect(document.querySelectorAll(`.${prefix}-menu-content`)).toHaveLength(1);
        expect(document.querySelectorAll(`.${prefix}-menu-item`)).toHaveLength(4);
        expect(document.querySelectorAll(`.${prefix}-menu-item`)[1]).toHaveClass('disabled');
        expect(
            document
                .querySelectorAll(`.${prefix}-menu-item`)[2]
                .querySelectorAll(`.${prefix}-menu-icon`),
        ).toHaveLength(1);
        // disabled item cannot trigger onSelect
        await userEvent.click(document.querySelectorAll(`.${prefix}-menu-item`)[1]);
        expect(onSelect.mock.calls).toHaveLength(0);
        await fireEvent.touchStart(document.querySelector(`.${prefix}-menu-item`));
        await userEvent.click(document.querySelector(`.${prefix}-menu-item`));
        expect(onSelect.mock.calls).toHaveLength(1);
        expect(onSelect.mock.calls[0]).toEqual([
            'first',
            {
                value: 'first',
                text: 'Menu 1',
            },
        ]);
        expect(onChange.mock.calls).toHaveLength(1);
        rerender(
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
                clickSelfToClose
                useClickStatus
                clickStatusDuration={500}
            >
                <Button>Button</Button>
            </Popover.Menu>,
        );
        await fireEvent.touchStart(document.querySelectorAll(`.${prefix}-menu-item`)[2]);
        await userEvent.click(document.querySelectorAll(`.${prefix}-menu-item`)[2]);
        expect(document.querySelectorAll(`.${prefix}-menu-item`)[2]).toHaveClass('active');
        act(() => {
            jest.advanceTimersByTime(600);
        });
        expect(document.querySelectorAll(`.${prefix}-menu-item`)).toHaveLength(0);
        expect(onChange.mock.calls).toHaveLength(2);
        expect(onChange.mock.calls[1]).toEqual([false]);
    });
});
