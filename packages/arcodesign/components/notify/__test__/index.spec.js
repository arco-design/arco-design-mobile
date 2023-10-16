import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { defaultContext } from '../../context-provider';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Notify from '..';

demoTest('notify');

mountTest(Notify, 'Notify');

describe('Notify work correctly', () => {
  it('should render notification correctly', () => {
    render(<Notify visible content="Hello, world!"/>);
    const contentElement = screen.getByText('Hello, world!');
    expect(contentElement).toBeInTheDocument()
  });

  it('should call onClose callback after transition when visible is false', () => {
    const onClose = jest.fn();
    const { container,rerender } = render(<Notify visible content="Hello, world!" onClose={onClose} />);
    const notify = container.querySelector(`.${defaultContext.prefixCls}-notify`)
    rerender(<Notify visible={false} content="Hello, world!" onClose={onClose} />);
    expect(notify).toHaveStyle('height: 0')
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
    const handleClick=()=>{
        notify('success', {
            content: 'Success notification',
            duration:2000
        })
        notify('warn', {
            content: 'Warning notification',
        })
        notify('error', {
            content: 'Error notification',
        })
    }
    render(<button onClick={handleClick}>Click me</button>);
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);
    act(() => {
      jest.runAllTimers(); 
    }); 
  });
});