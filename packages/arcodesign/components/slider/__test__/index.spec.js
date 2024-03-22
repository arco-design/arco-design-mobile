import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Slider from '..';
import { defaultContext } from '../../context-provider';
import {
    createStartTouchEventObject,
    createMoveTouchEventObject,
} from '../../../tests/helpers/mockEvent';

const prefix = `${defaultContext.prefixCls}-slider`;

demoTest('slider');

mountTest(Slider, 'Slider');

function Test(props) {
    const [value, setValue] = useState(20);

    const onChange = newValue => {
        setValue(newValue);
    };

    return <Slider date-testid="slider" value={value} onChange={onChange} {...props} />;
}

function fakeSliderLineRect(component) {
    const line = component.querySelector(`.${prefix}-line`);
    line.getBoundingClientRect = jest.fn(() => ({
        top: 600,
        bottom: 602,
        left: 10,
        right: 110,
        width: 100,
        height: 2,
    }));
}

describe('Slider', () => {
    it('render correctly', async () => {
        const { container } = render(<Test />);

        expect(container.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}-line`).length).toBe(2);
        expect(container.querySelectorAll(`.${prefix}-line.is-activated`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}-thumb`).length).toBe(1);
    });

    it('render range slider correctly', async () => {
        const { container } = render(<Slider range defaultValue={[15, 30]} />);
        fakeSliderLineRect(container);
        expect(container.querySelectorAll(`.${prefix}-thumb`).length).toBe(2);
        // 测试在范围区间滑动是否正确
        const line = container.querySelector(`.${prefix}-line`);
        await fireEvent.touchStart(line, createStartTouchEventObject({ x: 30, y: 1 }));
        await fireEvent.touchMove(line, createMoveTouchEventObject({ x: 50, y: 1 }));
        await fireEvent.touchEnd(line, createStartTouchEventObject({ x: 50, y: 1 }));

        expect(container.querySelector(`.${prefix}-popover-content`)).toHaveTextContent('40');
    });

    it('marks slider', () => {
        const { container } = render(<Test max={20} showMarks marks={[0, 5, 10, 15, 20]} />);
        expect(container.querySelector(`.${prefix}`).classList.contains('show-marks')).toBe(true);
        expect(container.querySelectorAll(`.${prefix}-marks-item`).length).toBe(5);
        expect(container.querySelectorAll(`.${prefix}-marks-item-label`).length).toBe(5);
        // component.setState({ value: 10 });
        // expect(component.find(`.${prefix}-marks-item`).find('.is-activated').length).toBe(5);
    });

    it('touch event', async () => {
        const { container } = render(<Test />);
        fakeSliderLineRect(container);

        const line = container.querySelector(`.${prefix}-line`);
        await fireEvent.touchStart(line, createStartTouchEventObject({ x: 20, y: 1 }));
        await fireEvent.touchMove(line, createMoveTouchEventObject({ x: 50, y: 1 }));
        await fireEvent.touchEnd(line, createStartTouchEventObject({ x: 50, y: 1 }));

        expect(container.querySelector(`.${prefix}-line.is-activated`).style.width).toBe('40px');
    });

    it('set the number of segments correctly', async () => {
        const { container } = render(
            <Slider showMarks useMarkOnly max={20} marks={[0, 5, 10, 15, 20]} defaultValue={5} />,
        );

        fakeSliderLineRect(container);
        const line = container.querySelector(`.${prefix}-line`);
        await fireEvent.touchStart(line, createStartTouchEventObject({ x: 20, y: 1 }));
        await fireEvent.touchMove(line, createMoveTouchEventObject({ x: 50, y: 1 }));
        await fireEvent.touchEnd(line, createStartTouchEventObject({ x: 50, y: 1 }));

        expect(container.querySelector(`.${prefix}`).getAttribute('aria-valuenow')).toBe('8');
        expect(container.querySelector(`.${prefix}-line.is-activated`).style.width).toBe('40px');
    });

    it('render tooltip correctly', () => {
        const { container } = render(<Slider showTooltip="always" defaultValue={32} />);
        expect(container.querySelectorAll(`.${prefix}-popover`).length).toBe(1);
    });
});
