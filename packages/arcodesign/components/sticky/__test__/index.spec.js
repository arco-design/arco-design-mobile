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

    it('should use zero absolute offsets without an offset parent', () => {
        window.requestAnimationFrame.mockImplementation(cb => {
            setTimeout(cb, 0);
            return 0;
        });
        const scrollContainer = document.createElement('div');
        scrollContainer.getBoundingClientRect = () => ({
            top: 50,
            bottom: 250,
            left: 0,
            right: 100,
            width: 100,
            height: 200,
        });
        const map = mockAddListener(scrollContainer);
        const { container } = render(
            <Sticky
                position="both"
                stickyStyle="absolute"
                getScrollContainer={() => scrollContainer}
            >
                <Button>Test</Button>
            </Sticky>,
        );

        const content = container.querySelector(`.arco-sticky`);
        const placeholder = content.parentElement.firstElementChild;
        Object.defineProperty(content, 'offsetParent', { value: null, configurable: true });
        content.getBoundingClientRect = () => ({
            top: 40,
            bottom: 60,
            left: 0,
            right: 100,
            width: 100,
            height: 20,
        });
        placeholder.getBoundingClientRect = () => ({
            top: 40,
            bottom: 60,
            left: 0,
            right: 100,
            width: 100,
            height: 20,
        });
        act(() => {
            map.scroll();
            jest.runAllTimers();
        });
        expect(content.style.position).toBe('absolute');
        expect(content.style.top).toBe('0px');

        placeholder.getBoundingClientRect = () => ({
            top: 240,
            bottom: 260,
            left: 0,
            right: 100,
            width: 100,
            height: 20,
        });
        act(() => {
            map.scroll();
            jest.runAllTimers();
        });
        expect(content.style.bottom).toBe('0px');
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
