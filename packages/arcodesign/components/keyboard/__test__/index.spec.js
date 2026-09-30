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
        // 乱序键盘仍然渲染全部按键
        // @en Random keyboard still renders all keys
        const first = render(<Keyboard visible randomOrder close={closeSpy} />);
        const keys = document.querySelectorAll('.arco-keyboard-key');
        expect(keys.length).toBe(12);
        const numbers = [...keys]
            .map(key => key.textContent)
            .filter(text => text !== '' && !isNaN(Number(text)))
            .map(Number);
        expect(numbers.slice().sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        first.unmount();

        // 通过ref获取键盘实例
        // @en Get keyboard instance via ref
        const ref = React.createRef();
        const second = render(<Keyboard visible ref={ref} type="confirm" close={closeSpy} />);
        expect(ref.current).toBeTruthy();
        second.unmount();

        // 键盘未展示时点击空白处不触发关闭
        // @en Clicking blank space does not close when keyboard is not shown
        closeSpy.mockClear();
        render(<Keyboard close={closeSpy} />);
        document.body.click();
        expect(closeSpy).not.toBeCalled();
    });
});
