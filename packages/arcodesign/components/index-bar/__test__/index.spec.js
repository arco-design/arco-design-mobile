import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
} from '../../../tests/helpers/mockEvent';
import { defaultContext } from '../../context-provider';
import IndexBar from '..';
import '@testing-library/jest-dom';

demoTest('index-bar');

mountTest(IndexBar, 'IndexBar');

const locationData = {
    A: ['鞍山', '安庆', '安阳', '安康'],
    B: ['北京', '保定', '包头', '蚌埠'],
    C: ['成都', '重庆', '朝阳', '长春'],
    D: ['大成', '大拟', '丹东', '定边'],
    E: ['鄂尔多斯', '二道湾', '二龙', '峨眉'],
    F: ['福州', '奉化', '福海', '肥东'],
    G: ['广州', '贵阳', '广安', '广州南'],
};

const formatLocationData = Object.entries(locationData).map(([key, values]) => {
    return {
        index: key,
        list: values.map(value => ({ content: value })),
    };
});

const prefix = `${defaultContext.prefixCls}-index-bar`;

describe('IndexBar', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    it('should render correctly', () => {
        const { container } = render(
            <IndexBar
                defaultIndex="B"
                groups={formatLocationData}
                renderGroupItem={(index, itemData, itemIndex) => (
                    <div>
                        {index}
                        {itemData.content}
                        {itemIndex}
                    </div>
                )}
            />,
        );
        expect(container.querySelectorAll(`.${prefix}-sidebar-item`)[1]).toHaveClass(
            `${prefix}-sidebar-active`,
        );
        expect(container.querySelector(`.${prefix}-group-item`)).toHaveTextContent('A鞍山0');
    });
    it('should click item correctly', () => {
        const onGroupItemClick = jest.fn();
        const { container } = render(
            <IndexBar groups={formatLocationData} onGroupItemClick={onGroupItemClick} />,
        );
        const item = container.querySelectorAll(`.${prefix}-group-item`);
        userEvent.click(item[5]);
        expect(onGroupItemClick).toBeCalledTimes(1);
    });
    it('should click sidebar correctly', () => {
        const onChange = jest.fn();
        const { container } = render(<IndexBar groups={formatLocationData} onChange={onChange} />);
        const item = container.querySelectorAll(`.${prefix}-sidebar-item`);
        fireEvent.touchStart(item[1]);
        expect(onChange).toBeCalledWith('B', 'sidebar');
        expect(container.querySelectorAll(`.${prefix}-sidebar-item`)[1]).toHaveClass(
            `${prefix}-sidebar-active`,
        );
        Object.defineProperty(document, 'elementFromPoint', {
            value: () => container.querySelectorAll(`.${prefix}-group`)[2],
        });
        act(() => {
            fireEvent.touchStart(item[2], createStartTouchEventObject({ x: 0, y: 0 }));
            fireEvent.touchMove(item[2], createMoveTouchEventObject({ x: 0, y: 10 }));
            fireEvent.touchEnd(item[2], createMoveTouchEventObject({ x: 0, y: 10 }));
        });
        expect(item[2]).toHaveClass(`${prefix}-sidebar-active`);
    });
    it('should scroll correctly', () => {
        const onChange = jest.fn();
        const ref = React.createRef();
        const { container } = render(
            <IndexBar groups={formatLocationData} onChange={onChange} ref={ref} />,
        );
        act(() => {
            ref.current.scrollToIndex('C', false);
        });
        expect(onChange).toBeCalledTimes(1);
        jest.advanceTimersByTime(1000);
        const scrollCtn = container.querySelector(`.${prefix}-container`);
        const groups = container.querySelectorAll(`.${prefix}-group`);
        // mock
        Object.defineProperty(scrollCtn, 'scrollTop', {
            value: 400,
        });
        groups.forEach((item, idx) => {
            Object.defineProperties(item, {
                clientHeight: {
                    value: 250,
                },
                offsetTop: {
                    value: idx * 250,
                },
            });
        });
        act(() => {
            fireEvent.scroll(scrollCtn, { target: { scrollY: 500 } });
            jest.advanceTimersByTime(1000);
        });
        expect(onChange).toBeCalledTimes(2);
    });
});
