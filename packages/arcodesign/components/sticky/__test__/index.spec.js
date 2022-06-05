import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Sticky from '..';
import Button from '../../button';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { mockAddListener } from '../../../tests/helpers/mockEvent';

demoTest('sticky');

mountTest(Sticky, 'Sticky');

describe('Sticky', () => {

    beforeEach(() => {
        document.body.getBoundingClientRect = jest.fn(() => ({
            top: 100,
            bottom: 300
        }))
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
        jest.useFakeTimers();
    });

    afterEach(() => {
        window.requestAnimationFrame.mockRestore();
        jest.useRealTimers();
    });

    it('should callback correctly when scrolled', () => {
        const mockFn = jest.fn();
        const component = mount(
            <Sticky topOffset={64} onTopChange={mockFn}>
                <Button>Test</Button>
            </Sticky>
        );
        const map = mockAddListener(window, true);
        component.setProps({ topOffset: 0 });
        act(() => {
            map.scroll({currentTarget: window});
        });
        expect(mockFn).toBeCalled();
    });
});
