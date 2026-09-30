import React from 'react';
import { act, render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Sticky from '..';
import Button from '../../button';
import { mockAddListener } from '../../../tests/helpers/mockEvent';

demoTest('sticky');

mountTest(Sticky, 'Sticky');

describe('Sticky', () => {
    beforeEach(() => {
        document.body.getBoundingClientRect = jest.fn(() => ({
            top: 100,
            bottom: 300,
        }));
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
        jest.useFakeTimers();
    });

    afterEach(() => {
        window.requestAnimationFrame.mockRestore();
        jest.useRealTimers();
    });

    it('should callback correctly when scrolled', () => {
        const mockFn = jest.fn();
        const { rerender } = render(
            <Sticky topOffset={64} onTopChange={mockFn}>
                <Button>Test</Button>
            </Sticky>,
        );
        const map = mockAddListener(window);
        rerender(
            <Sticky topOffset={0} onTopChange={mockFn}>
                <Button>Test</Button>
            </Sticky>,
        );
        act(() => {
            map.scroll({ currentTarget: window });
        });
        expect(mockFn).toBeCalled();
    });

    it('should calculate absolute sticky style with or without offsetParent', () => {
        const onStickyStateChange = jest.fn();
        // RAF 改为异步，保证 recalculatePosition 的帧锁能正常复位
        window.requestAnimationFrame.mockImplementation(cb => {
            setTimeout(cb, 0);
            return 0;
        });
        const map = mockAddListener(window);
        const { container } = render(
            <Sticky
                position="both"
                stickyStyle="absolute"
                onStickyStateChange={onStickyStateChange}
            >
                <Button>Test</Button>
            </Sticky>,
        );

        const content = container.querySelector(`.arco-sticky`);
        // offsetParent 为空时吸顶位置归零
        act(() => {
            jest.runAllTimers();
        });
        expect(content.style.position).toBe('absolute');
        expect(onStickyStateChange).toBeCalledWith({
            isSticky: true,
            wasSticky: false,
            isTopSticky: true,
            isBottomSticky: false,
        });

        // 指定 offsetParent 后基于其位置计算吸顶样式
        const offsetParent = document.createElement('div');
        offsetParent.getBoundingClientRect = () => ({
            top: 30,
            bottom: 130,
            left: 5,
            right: 105,
            width: 100,
            height: 100,
        });
        Object.defineProperty(content, 'offsetParent', {
            value: offsetParent,
            configurable: true,
        });
        act(() => {
            map.scroll({ currentTarget: window });
            jest.runAllTimers();
        });
        expect(content.style.position).toBe('absolute');
        expect(content.style.zIndex).toBe('100');
        // 吸顶位置相对于 offsetParent 计算：top = 0 - 30 - 0
        expect(content.style.top).toBe('-30px');
        expect(content.style.left).toBe('-5px');
    });

    it('should update placeholder height via ref when sticky', () => {
        const rectSpy = jest
            .spyOn(Element.prototype, 'getBoundingClientRect')
            .mockReturnValue({
                top: 0,
                bottom: 50,
                left: 0,
                right: 100,
                width: 100,
                height: 50,
            });
        const ref = React.createRef();
        const { container } = render(
            <Sticky ref={ref}>
                <Button>Test</Button>
            </Sticky>,
        );

        const placeholder = container.firstElementChild.firstElementChild;
        const content = container.querySelector(`.arco-sticky`);
        expect(content.style.position).toBe('fixed');

        act(() => {
            ref.current.updatePlaceholderLayout();
        });
        // 吸顶状态下占位元素高度等于内容高度
        expect(placeholder.style.height).toBe('50px');
        rectSpy.mockRestore();
    });

    it('should render correctly when getScrollContainer returns null', () => {
        const { container } = render(<Sticky getScrollContainer={() => null} />);

        expect(container.querySelector(`.arco-sticky`)).not.toBeNull();
        expect(container.querySelector(`.arco-sticky`).style.position).toBe('');
    });
});
