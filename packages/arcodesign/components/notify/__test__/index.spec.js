import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { defaultContext } from '../../context-provider';
import mountTest from '../../../tests/mountTest';
import Notify from '..';

jest.useFakeTimers();

mountTest(Notify, 'Notify');

describe('notify snapshot test', () => {
    const { container } = render(<Notify visible content="Hello, world!" />);
    expect(container).toMatchSnapshot();

    act(() => jest.runAllTimers());
});

describe('Notify work correctly', () => {
    afterEach(() => {
        act(() => jest.runAllTimers());
    });

    it('should render notification correctly', () => {
        render(<Notify visible content="Hello, world!" />);
        const contentElement = screen.getByText('Hello, world!');
        expect(contentElement).toBeInTheDocument();
    });

    it('should call onClose callback after transition when visible is false', () => {
        const onClose = jest.fn();
        const { container, rerender } = render(
            <Notify visible content="Hello, world!" onClose={onClose} />,
        );
        const notify = container.querySelector(`.${defaultContext.prefixCls}-notify`);
        rerender(<Notify visible={false} content="Hello, world!" onClose={onClose} />);
        expect(notify).toHaveStyle('height: 0');
    });

    it('should expose dom via ref', () => {
        const ref = React.createRef();
        const { container } = render(<Notify ref={ref} visible content="Hello, world!" />);
        expect(ref.current.dom).toBe(
            container.querySelector(`.${defaultContext.prefixCls}-notify`),
        );
    });
});

describe('notify hook work correctly', () => {
    jest.useFakeTimers();

    it('should render notification correctly', () => {
        const notify = (func, options) => {
            if (!!window.NotifyInstance) {
                window.NotifyInstance.close();
            }
            window.NotifyInstance = Notify[func](options);
        };
        const handleClick = () => {
            notify('success', {
                content: 'Success notification',
                duration: 2000,
            });
            notify('warn', {
                content: 'Warning notification',
            });
            notify('error', {
                content: 'Error notification',
            });
        };
        render(<button onClick={handleClick}>Click me</button>);
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        act(() => {
            jest.runOnlyPendingTimers();
        });
        const successNotification = screen.getByText('Success notification');
        expect(successNotification).toBeInTheDocument();
        const warnNotification = screen.getByText('Warning notification');
        expect(warnNotification).toBeInTheDocument();
        const errorNotification = screen.getByText('Error notification');
        expect(errorNotification).toBeInTheDocument();
    });
});

describe('notify instance methods work correctly', () => {
    jest.useFakeTimers();

    it('should render into custom container, update and destroy on close', () => {
        const customContainer = document.createElement('div');
        document.body.appendChild(customContainer);
        const onClose = jest.fn();
        const instance = Notify.success({
            content: 'Custom notification',
            duration: 2000,
            getContainer: () => customContainer,
            onClose,
        });
        // nextTick后通知展示在自定义容器中
        // @en After nextTick the notification is shown in the custom container
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(customContainer.textContent).toContain('Custom notification');

        instance.update({ content: 'Updated notification' });
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(screen.getByText('Updated notification')).toBeInTheDocument();

        // 关闭后容器被移除并触发onClose
        // @en Container is removed and onClose is triggered after close
        instance.close();
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(onClose).toBeCalled();
        expect(customContainer.querySelector(`.${defaultContext.prefixCls}-notify`)).toBe(null);
        document.body.contains(customContainer) && document.body.removeChild(customContainer);
    });
});
