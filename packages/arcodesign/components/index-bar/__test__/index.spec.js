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
        act(() => {
            jest.advanceTimersByTime(1000);
        });
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

    it('should render groups from children and filter invalid child', () => {
        const onChange = jest.fn();
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const groupRef = React.createRef();
        const { container } = render(
            <IndexBar onChange={onChange}>
                <div>not a group</div>
                <IndexBar.Group index="A" list={[{ content: 'a1' }]} ref={groupRef} />
                invalid-text-child
            </IndexBar>,
        );

        // 非法 child 被过滤并给出警告
        expect(warnSpy).toBeCalledWith(
            '<IndexBar /> only accept <IndexBar.Group /> as the children',
        );
        warnSpy.mockRestore();

        // children 写法的分组正常渲染
        expect(container.querySelectorAll(`.${prefix}-group`)).toHaveLength(1);
        expect(container.querySelector(`.${prefix}-group-item`)).toHaveTextContent('a1');
        expect(groupRef.current.dom).toBe(container.querySelector(`.${prefix}-group`));

        // 滚动时无 data-index 的子元素被跳过，仍然命中第一个分组
        act(() => {
            fireEvent.scroll(container.querySelector(`.${prefix}-container`));
            jest.advanceTimersByTime(200);
        });
        expect(onChange).toBeCalledWith('A', 'swipe');
    });

    it('should callback onChange when clicking numeric index sidebar item', () => {
        const onChange = jest.fn();
        const { container } = render(
            <IndexBar
                defaultIndex="2"
                groups={[{ index: 1, list: [{ content: 'one' }] }, { index: 2, list: [{ content: 'two' }] }]}
                onChange={onChange}
            />,
        );
        const item = container.querySelectorAll(`.${prefix}-sidebar-item`);
        expect(item).toHaveLength(2);

        fireEvent.touchStart(item[0]);
        expect(onChange).toBeCalledWith('1', 'sidebar');
    });

    it('should do nothing when scrolling to an invalid index', () => {
        const onChange = jest.fn();
        const { container } = render(
            <IndexBar groups={[{ list: [{ content: 'x' }] }]} onChange={onChange} />,
        );
        const item = container.querySelectorAll(`.${prefix}-sidebar-item`);
        expect(item).toHaveLength(1);

        // 分组缺少 index 时点击侧边栏项无效
        expect(() => {
            act(() => {
                fireEvent.touchStart(item[0]);
            });
        }).not.toThrow();
        expect(onChange).not.toBeCalled();
    });

    it('should scroll with animation when scrollDuration is positive', () => {
        const onChange = jest.fn();
        const rafSpy = jest
            .spyOn(window, 'requestAnimationFrame')
            .mockImplementation(cb => {
                setTimeout(cb, 16);
                return 0;
            });
        const ref = React.createRef();
        const { container } = render(
            <IndexBar groups={formatLocationData} scrollDuration={100} onChange={onChange} ref={ref} />,
        );

        act(() => {
            ref.current.scrollToIndex('C', false);
            jest.advanceTimersByTime(500);
        });
        expect(onChange).toBeCalledWith('C', 'manual');
        rafSpy.mockRestore();
    });

    it('should recalculate sticky position via ref', () => {
        const ref = React.createRef();
        const { container } = render(
            <IndexBar groups={formatLocationData} ref={ref} />,
        );

        expect(() => {
            act(() => {
                ref.current.recalculatePosition();
            });
        }).not.toThrow();
        expect(container.querySelectorAll(`.${prefix}-group`)).toHaveLength(7);
    });

    it('should ignore scroll event while touching sidebar', () => {
        const onChange = jest.fn();
        const { container } = render(
            <IndexBar groups={formatLocationData} onChange={onChange} />,
        );
        const sidebarItem = container.querySelectorAll(`.${prefix}-sidebar-item`)[0];
        const scrollCtn = container.querySelector(`.${prefix}-container`);

        act(() => {
            fireEvent.touchStart(sidebarItem);
            fireEvent.scroll(scrollCtn);
            jest.advanceTimersByTime(200);
        });
        // sidebar 触摸期间的滚动不触发 swipe 类型的 onChange
        expect(onChange).not.toHaveBeenCalledWith(expect.anything(), 'swipe');
    });

    it('should ignore touchmove on sidebar when not touching', () => {
        const { container } = render(<IndexBar groups={formatLocationData} />);
        const sidebar = container.querySelector(`.${prefix}-sidebar`);

        expect(() => {
            fireEvent.touchMove(sidebar, createMoveTouchEventObject({ x: 0, y: 10 }));
        }).not.toThrow();
    });

    it('should show custom tip and stop touching on touchcancel', () => {
        const { container } = render(
            <IndexBar
                groups={formatLocationData}
                renderTip={index => <span data-tip>tip-{index}</span>}
            />,
        );
        const sidebar = container.querySelector(`.${prefix}-sidebar`);

        fireEvent.touchStart(sidebar);
        expect(sidebar).toHaveClass(`${prefix}-sidebar-touching`);
        // 自定义 tip 渲染
        expect(container.querySelector('[data-tip]')).toHaveTextContent('tip-A');

        fireEvent.touchCancel(sidebar);
        expect(sidebar).not.toHaveClass(`${prefix}-sidebar-touching`);
    });

    it('should render sticky item by renderStickyItem', () => {
        const { container } = render(
            <IndexBar
                groups={formatLocationData.slice(0, 1)}
                renderStickyItem={index => <div>sticky-{index}</div>}
            />,
        );
        expect(container.textContent).toContain('sticky-A');
    });

    it('should render group standalone outside IndexBar', () => {
        // 脱离 IndexBar 上下文单独渲染 Group，使用 context 默认值
        const { container } = render(
            <IndexBar.Group index="A" list={[{ content: 'standalone' }]} />,
        );
        expect(container.querySelector(`.${prefix}-group-item`)).toHaveTextContent('standalone');
    });
});
