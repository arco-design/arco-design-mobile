import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Input from '..';

demoTest('input');

mountTest(Input, 'Input');

describe('Input render correctly', () => {
    it('onChange listener correctly', () => {
        const onChange = jest.fn();
        const onValidator = val => val.length <= 3;
        render(<Input onChange={onChange} validator={onValidator} />);
        const input = screen.getByRole('textbox');
        userEvent.type(input, 'test');
        expect(onChange).toBeCalled();
        // 第四次输入不满足validator所以不触发onChange，触发次数为3
        expect(onChange).toBeCalledTimes(3);
        // 同理，不触发onChange，所以value也只有三位
        expect(input).toHaveValue('tes');
    });

    it('prefix, suffix, prepend, append correctly', () => {
        render(
            <Input
                prefix={<span>prefix</span>}
                suffix={<span>suffix</span>}
                prepend={<span>prepend</span>}
                append={<span>append</span>}
            />,
        );
        const prefix = screen.getByText('prefix');
        const suffix = screen.getByText('suffix');
        const prepend = screen.getByText('prepend');
        const append = screen.getByText('append');
        expect(prefix).toBeInTheDocument();
        expect(suffix).toBeInTheDocument();
        expect(prepend).toBeInTheDocument();
        expect(append).toBeInTheDocument();
    });

    it('test maxLength', () => {
        render(<Input maxLength={5} defaultValue="123456789" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('123456789');
        expect(input).toHaveAttribute('maxLength', '5');
    });

    it('showClear in uncontrolled mode', () => {
        const onChange = jest.fn();
        render(<Input onChange={onChange} clearShowType="value" />);
        const input = screen.getByRole('textbox');
        userEvent.type(input, 'Hello');
        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledTimes(5);
    });

    it('autoFocus and validator correctly', () => {
        jest.useFakeTimers();
        const onInput = jest.fn();
        render(
            <Input
                onInput={onInput}
                clearShowType="value"
                autoFocus
                blockChangeWhenCompositing
                value="please input"
                validator={/false/}
            />,
        );
        const input = screen.getByDisplayValue('please input');
        userEvent.type(input, 'Hello');
        act(() => jest.runAllTimers());
        expect(input).toBeInTheDocument();
    });
});

describe('Input handle correctly', () => {
    it('triggers onInput when input value changes', () => {
        const onInputMock = jest.fn();
        render(<Input onInput={onInputMock} />);
        const input = screen.getByRole('textbox');
        userEvent.type(input, 'hello');
        expect(onInputMock).toBeCalled();
        expect(onInputMock).toBeCalledTimes(5);
    });

    it('triggers onKeyDown when a key is pressed', () => {
        const onKeyDownMock = jest.fn();
        render(<Input onKeyDown={onKeyDownMock} />);
        const input = screen.getByRole('textbox');
        userEvent.type(input, '{enter}');
        expect(onKeyDownMock).toBeCalled();
        expect(onKeyDownMock).toBeCalledTimes(1);
    });

    it('input blur correctly', () => {
        const isBlur = element => {
            return document.activeElement !== element;
        };
        const handleClickMock = jest.fn();
        render(<Input handleClick={handleClickMock} blurBeforeFocus />);
        const input = screen.getByRole('textbox');
        fireEvent.blur(input);
        expect(isBlur(input)).toBeTruthy();
    });

    it('clearEvent run correctly', () => {
        const handleClickMock = jest.fn();
        const { container } = render(
            <Input handleClick={handleClickMock} clearable clearShowType="always" />,
        );
        const clear = container.querySelector('.arco-input-clear');
        const input = screen.getByRole('textbox');
        input.focus();
        userEvent.click(clear);
        act(() => jest.runAllTimers());
        expect(clear).toBeInTheDocument();
        expect(input.textContent).toBe('');
    });
});
