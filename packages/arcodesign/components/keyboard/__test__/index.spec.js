import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Keyboard from '..';

demoTest('keyboard');

mountTest(Keyboard, 'Keyboard');

describe('Keyboard', () => {
    it('onChange listener correctly', () => {
        const onChange = jest.fn();
        render(<Keyboard visible type="number" onChange={onChange} />);
        const input = screen.getByText('1');
        userEvent.click(input);
        expect(onChange.mock.calls.length).toBe(1);
    });
});
