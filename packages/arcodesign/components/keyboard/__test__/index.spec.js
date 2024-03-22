import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Keyboard from '..';
import '@testing-library/jest-dom';

demoTest('keyboard');

mountTest(Keyboard, 'Keyboard');

describe('Keyboard', () => {
    it('should render correctly', () => {
        const { rerender, container } = render(<Keyboard visible type="number" />);
        let button = screen.getByText('1');
        expect(button).not.toBeNull();
        rerender(<Keyboard visible type="confirm" />);
        button = screen.getByText('完成');
        expect(button).not.toBeNull();
        rerender(<Keyboard visible type="tool" />);
        button = screen.getByText('+');
        expect(button).not.toBeNull();
        rerender(<Keyboard visible rightColumns={<div>hello world</div>} />);
        expect(screen.getByText('hello world')).toBeInTheDocument();
        rerender(<Keyboard visible randomOrder />);
        const buttons = container.querySelectorAll('.arco-keyboard-key');
        expect([...buttons].some((btn, idx) => Number(btn.textContent) !== idx)).toBeTruthy;
    });
    it('onChange listener correctly', async () => {
        const onChange = jest.fn();
        const onDelete = jest.fn();
        const onConfirm = jest.fn();
        const onClose = jest.fn();
        const { container, rerender } = render(
            <Keyboard
                visible
                type="confirm"
                onChange={onChange}
                onDelete={onDelete}
                onConfirm={onConfirm}
                confirmButton={<div>confirm</div>}
                deleteButton={<div>delete</div>}
                close={onClose}
            />,
        );
        let input = screen.getByText('1');
        await userEvent.click(input);
        expect(onChange).toBeCalledTimes(1);
        input = screen.getByText('delete');
        await userEvent.click(input);
        expect(onDelete).toBeCalledTimes(1);
        input = screen.getByText('confirm');
        await userEvent.click(input);
        expect(onConfirm).toBeCalledTimes(1);

        rerender(
            <Keyboard
                visible
                type="number"
                onChange={onChange}
                onDelete={onDelete}
                onConfirm={onConfirm}
                confirmButton={<div>confirm</div>}
                deleteButton={<div>delete</div>}
                keyboardButton={<div>keyboard</div>}
                close={onClose}
            />,
        );
        input = screen.getByText('keyboard');
        await userEvent.click(input);
        expect(onClose).toBeCalledTimes(1);
        await userEvent.click(container);
        expect(onClose).toBeCalledTimes(2);
    });
});
