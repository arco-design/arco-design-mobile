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

        expect(container.querySelector(`.${prefix}`).getAttribute('aria-valuenow')).toBe('10');
        expect(container.querySelector(`.${prefix}-line.is-activated`).style.width).toBe('50px');
    });

    it('render tooltip correctly', () => {
        const { container } = render(<Slider showTooltip="always" defaultValue={32} />);
        expect(container.querySelectorAll(`.${prefix}-popover`).length).toBe(1);
    });

    it('should generate marks from number type marks', () => {
        const { container } = render(<Test max={20} showMarks marks={5} />);
        expect(container.querySelectorAll(`.${prefix}-marks-item`).length).toBe(5);
        expect(container.querySelectorAll(`.${prefix}-marks-item-label`)[2]).toHaveTextContent(
            '10',
        );
    });

    it('should generate marks and labels from object type marks', () => {
        const { container } = render(
            <Test max={20} showMarks marks={{ 10: 'ten', 20: 'twenty' }} />,
        );
        const items = container.querySelectorAll(`.${prefix}-marks-item`);
        expect(items).toHaveLength(2);
        expect(items[0].querySelector(`.${prefix}-marks-item-label`)).toHaveTextContent('ten');
        expect(items[1].querySelector(`.${prefix}-marks-item-label`)).toHaveTextContent('twenty');
    });

    it('should activate marks between range values', () => {
        const { container } = render(
            <Slider range showMarks max={20} marks={[0, 5, 10, 15, 20]} defaultValue={[5, 15]} />,
        );
        const activated = container.querySelectorAll(
            `.${prefix}-marks-item.is-activated`,
        );
        expect(activated).toHaveLength(3);
    });

    it('should format value to nearest mark when value is below all marks', () => {
        const { container } = render(
            <Slider useMarkOnly max={20} marks={[10, 15, 20]} defaultValue={5} />,
        );
        expect(container.querySelector(`.${prefix}`).getAttribute('aria-valuenow')).toBe('10');
    });

    it('should format range values to nearest marks', () => {
        const { container } = render(
            <Slider range useMarkOnly max={20} marks={[0, 5, 10, 15, 20]} defaultValue={[3, 12]} />,
        );
        expect(container.querySelector(`.${prefix}`).getAttribute('aria-valuenow')).toBe('5');
    });

    it('should render prefix and suffix label by custom function', () => {
        const { container } = render(
            <Test
                prefixLabel={value => `P-${Array.isArray(value) ? value.join() : value}`}
                suffixLabel={() => 'S-end'}
            />,
        );
        expect(container.querySelector(`.${prefix}-label.is-prefix`)).toHaveTextContent('P-20');
        expect(container.querySelector(`.${prefix}-label.is-suffix`)).toHaveTextContent('S-end');
    });

    it('should render correctly when size is undefined', () => {
        const { container } = render(<Slider size={undefined} defaultValue={20} />);
        expect(container.querySelectorAll(`.${prefix}-line`).length).toBe(2);
    });

    it('should clamp value when touch position is out of line range', async () => {
        const { container } = render(<Slider max={20} step={8} defaultValue={10} />);
        fakeSliderLineRect(container);
        const sliderRoot = container.querySelector(`.${prefix}`);
        const line = container.querySelector(`.${prefix}-line`);

        // 滑动超过右边界，step 取整后超出 max 的值会被钳制回 max
        await fireEvent.touchStart(line, createStartTouchEventObject({ x: 50, y: 1 }));
        await fireEvent.touchMove(line, createMoveTouchEventObject({ x: 200, y: 1 }));
        await fireEvent.touchEnd(line, createStartTouchEventObject({ x: 200, y: 1 }));
        expect(sliderRoot.getAttribute('aria-valuenow')).toBe('20');

        // 滑动超过左边界，值被钳制为 0
        await fireEvent.touchStart(line, createStartTouchEventObject({ x: 60, y: 1 }));
        await fireEvent.touchMove(line, createMoveTouchEventObject({ x: 0, y: 1 }));
        await fireEvent.touchEnd(line, createStartTouchEventObject({ x: 0, y: 1 }));
        expect(sliderRoot.getAttribute('aria-valuenow')).toBe('0');
    });

    it('should not respond when touching line directly with draggableTrackOnly', async () => {
        const { container } = render(
            <Slider max={20} draggableTrackOnly defaultValue={20} />,
        );
        fakeSliderLineRect(container);
        const sliderRoot = container.querySelector(`.${prefix}`);
        const line = container.querySelector(`.${prefix}-line`);

        // 直接触摸轨道不生效
        await fireEvent.touchStart(line, createStartTouchEventObject({ x: 50, y: 1 }));
        await fireEvent.touchMove(line, createMoveTouchEventObject({ x: 90, y: 1 }));
        await fireEvent.touchEnd(line, createStartTouchEventObject({ x: 90, y: 1 }));
        expect(sliderRoot.getAttribute('aria-valuenow')).toBe('20');

        // 触摸滑块正常拖动
        const thumb = container.querySelector(`.${prefix}-thumb`);
        await fireEvent.touchStart(thumb, createStartTouchEventObject({ x: 50, y: 1 }));
        await fireEvent.touchMove(thumb, createMoveTouchEventObject({ x: 90, y: 1 }));
        await fireEvent.touchEnd(thumb, createStartTouchEventObject({ x: 90, y: 1 }));
        expect(sliderRoot.getAttribute('aria-valuenow')).toBe('16');
    });

    it('should expose dom via ref', () => {
        const ref = React.createRef();
        const { container } = render(<Slider ref={ref} defaultValue={20} />);
        expect(ref.current.dom).toBe(container.querySelector(`.${prefix}`));
    });
});
