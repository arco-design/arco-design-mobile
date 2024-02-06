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
});
