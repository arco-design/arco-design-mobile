import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import NavBar from '..';
import { defaultContext } from '../../context-provider';
import {
    createStartTouchEventObject,
    createMoveTouchEventObject,
} from '../../../tests/helpers/mockEvent';
import { defineHtmlRefProperties } from '../../../tests/helpers/mockElement';

const prefix = `${defaultContext.prefixCls}-nav-bar`;

demoTest('nav-bar');

mountTest(NavBar, 'NavBar');

const { setHTMLProperties, unsetHTMLProperties } = defineHtmlRefProperties({
    offsetWidth: 375,
    offsetHeight: 200,
});

describe('NavBar style', () => {
    it('Common styles render correctly', () => {
        const { container } = render(
            <NavBar fixed={false} title="title" rightContent={<span>more</span>} />,
        );
        expect(container.querySelectorAll(`.${prefix}-left`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}-right`).length).toBe(1);
    });
});

describe('NavBar actions', () => {
    beforeAll(() => {
        // mockContainerSize();
        setHTMLProperties();
    });

    afterAll(() => {
        // resetContainerSizeMock();
        unsetHTMLProperties();
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
        const { container } = render(
            <NavBar
                title="title"
                rightContent={<span>more</span>}
                onClickLeft={onClickLeft}
                onClickRight={onClickRight}
            />,
        );
        userEvent.click(container.querySelector(`.${prefix}-left`));
        userEvent.click(container.querySelector(`.${prefix}-right`));
        expect(onClickLeft.mock.calls.length).toBe(1);
        expect(onClickRight.mock.calls.length).toBe(1);
    });

    it('should callback correctly when scrolled', () => {
        const { container } = render(<NavBar statusBarHeight={10} showOffset={20} title="title" />);
        const comp = container.querySelector(`.${prefix}`);
        act(() => {
            fireEvent.touchStart(comp, createStartTouchEventObject({ x: 0, y: 0 }));
            fireEvent.touchMove(comp, createMoveTouchEventObject({ x: 0, y: 100 }));
            jest.advanceTimersByTime(1000);
        });
        act(() => {
            fireEvent.touchEnd(comp, createMoveTouchEventObject({ x: 0, y: 200 }));
        });
    });
});
