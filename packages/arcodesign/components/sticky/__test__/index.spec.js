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

    it.each(['top', 'bottom'])(
        'keeps the %s edge pinned through fractional scroll jitter',
        position => {
            window.requestAnimationFrame.mockImplementation(cb => setTimeout(cb, 0));
            const ref = React.createRef();
            render(<Sticky ref={ref} position={position} />);
            const content = ref.current.dom;
            const rect = jest.spyOn(content.previousElementSibling, 'getBoundingClientRect');

            function positionAt(distance) {
                const top = position === 'top' ? distance : window.innerHeight - distance;
                rect.mockReturnValue({ top });
                act(() => {
                    ref.current.recalculatePosition();
                    jest.runOnlyPendingTimers();
                });
                return content.style.position;
            }

            expect([0.49, 0.51, 0.49, 1.01, 0.51, 0.49].map(positionAt)).toEqual([
                'fixed',
                'fixed',
                'fixed',
                '',
                '',
                'fixed',
            ]);
        },
    );

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
});
