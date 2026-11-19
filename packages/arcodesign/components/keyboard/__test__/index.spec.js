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

    it('random order, default type, closed state and ref', () => {
        const closeSpy = jest.fn();
        const ref = React.createRef();
        // 乱序键盘仍然渲染全部按键
        // @en Random keyboard still renders all keys
        const { rerender, unmount } = render(
            <Keyboard visible randomOrder ref={ref} close={closeSpy} />,
        );
        const keys = document.querySelectorAll('.arco-keyboard-key');
        expect(keys.length).toBe(12);
        const numbers = [...keys]
            .map(key => key.textContent)
            .filter(text => text !== '' && !isNaN(Number(text)))
            .map(Number);
        expect(numbers.slice().sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 已打开的键盘切换到确认模式后，公开引用指向当前键盘节点
        // @en After switching the open keyboard to confirm mode, the ref points to its DOM node
        rerender(<Keyboard visible ref={ref} type="confirm" close={closeSpy} />);
        const keyboard = screen.getByText('完成').closest('.arco-keyboard');
        expect(keyboard).toBeInTheDocument();
        expect(ref.current.keyboard).toBe(keyboard);
        unmount();

        // 键盘未展示时点击空白处不触发关闭
        // @en Clicking blank space does not close when keyboard is not shown
        closeSpy.mockClear();
        render(<Keyboard close={closeSpy} />);
        document.body.click();
        expect(closeSpy).not.toBeCalled();
    });

    it('exposes the keyboard node on the first visible mount', () => {
        const ref = React.createRef();
        render(<Keyboard visible ref={ref} />);

        const keyboard = screen.getByRole('button', { name: '1' }).closest('.arco-keyboard');
        expect(keyboard).toBeInTheDocument();
        expect(ref.current.keyboard).toBe(keyboard);
    });
});
