import React, { createRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Stepper from '..';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

demoTest('stepper');

mountTest(Stepper, 'Stepper');

const prefix = `.${defaultContext.prefixCls}-stepper`;
const minusButton = `${prefix}-minus-button`;
const input = `${prefix}-input`;
const addButton = `${prefix}-add-button`;

describe('Stepper', () => {
    // 组件正常渲染
    it('component render correctly', () => {
        const { container: component } = render(<Stepper />);
        const minusButtonDom = component.querySelectorAll(minusButton);
        const inputDom = component.querySelectorAll(input);
        const addButtonDom = component.querySelectorAll(addButton);

        // 正常渲染
        expect(minusButtonDom.length).toBe(1);
        expect(inputDom.length).toBe(1);
        expect(addButtonDom.length).toBe(1);
        expect(component.querySelectorAll(prefix).length).toBe(1);

        // 默认值为1
        expect(inputDom[0]).toHaveValue(1);
    });

    // 按钮点击数据结果正常
    it('button click correctly', async () => {
        const { container: component } = render(
            <Stepper defaultValue={1} min={0} max={20} step={1} />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        // 点击减号
        await userEvent.click(minusButtonDom);
        expect(inputDom).toHaveValue(0);

        // 点击加号
        await userEvent.click(addButtonDom);
        expect(inputDom).toHaveValue(1);
    });

    // 数据边界正确
    it('data limit correctly', async () => {
        const { container: component } = render(
            <Stepper defaultValue={1} min={0} max={1} step={1} />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        // 最小值为0
        await userEvent.click(minusButtonDom);
        expect(inputDom).toHaveValue(0);
        await userEvent.click(minusButtonDom);
        expect(inputDom).toHaveValue(0);

        // 最大值为1
        await userEvent.click(addButtonDom);
        expect(inputDom).toHaveValue(1);
        await userEvent.click(addButtonDom);
        expect(inputDom).toHaveValue(1);
    });

    // 传入受控值
    it('accept value', async () => {
        const { container: component } = render(<Stepper value={1} min={0} max={100} step={1} />);
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        // 值受控，点击加减不触发数据变动
        await userEvent.click(minusButtonDom);
        expect(inputDom).toHaveValue(1);
        await userEvent.click(addButtonDom);
        expect(inputDom).toHaveValue(1);
    });

    // 内容是否允许为空
    it('input value allow empty', async () => {
        // 允许为空
        const { rerender } = render(
            <Stepper defaultValue={1} min={0} max={100} step={1} allowEmpty />,
        );
        const inputDom = screen.getByRole('spinbutton');

        // 设置输入框值为空字符串
        await userEvent.type(inputDom, ' ');
        await fireEvent.blur(inputDom);
        expect(inputDom.value).toBe('');

        // 不允许为空
        rerender(<Stepper defaultValue={1} min={0} max={100} step={1} />);

        await userEvent.type(inputDom, ' ');
        await fireEvent.blur(inputDom);
        expect(inputDom.value).toBe('0');

        await userEvent.type(inputDom, '101');
        await fireEvent.blur(inputDom);
        expect(inputDom.value).toBe('100');

        await userEvent.type(inputDom, '-1');
        await fireEvent.blur(inputDom);
        expect(inputDom.value).toBe('0');
    });

    // 小数点
    it('data digits', async () => {
        const { container: component } = render(
            <Stepper defaultValue={0} min={-1} max={100} step={0.5} digits={1} />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        expect(inputDom.value).toEqual('0.0');

        await userEvent.click(minusButtonDom);
        expect(inputDom.value).toEqual('-0.5');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.0');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.5');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('1.0');
    });

    // 禁用步进器
    it('stepper disable', async () => {
        const { container: component } = render(
            <Stepper defaultValue={0} min={-1} max={100} step={0.5} digits={1} disabled />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        await userEvent.click(minusButtonDom);
        expect(inputDom.value).toEqual('0.0');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.0');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.0');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.0');
    });

    // 输入框只读
    it('stepper input readonly', async () => {
        const { container: component } = render(
            <Stepper defaultValue={0} min={-1} max={100} step={0.5} digits={1} inputReadonly />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        expect(inputDom.value).toEqual('0.0');

        await userEvent.type(inputDom, '2.0');
        expect(inputDom.value).toEqual('0.0');

        // 按钮点击行为正常
        await userEvent.click(minusButtonDom);
        expect(inputDom.value).toEqual('-0.5');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.0');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.5');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('1.0');
    });

    // 不允许操作大于/小于极限值时，操作结果等于极限值
    it('equal limit disable', async () => {
        const { container: component } = render(
            <Stepper defaultValue={0} min={-1} max={1} step={0.7} digits={1} equalLimitDisabled />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        await userEvent.click(minusButtonDom);
        expect(inputDom.value).toEqual('-0.7');
        await userEvent.click(minusButtonDom);
        expect(inputDom.value).toEqual('-0.7');

        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.0');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.7');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.7');
    });

    // 允许操作大于/小于极限值时，操作结果等于极限值
    it('equal limit disable', async () => {
        const { container: component } = render(
            <Stepper defaultValue={0} min={-1} max={1} step={0.7} digits={1} />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const addButtonDom = component.querySelector(addButton);

        await userEvent.click(minusButtonDom);
        expect(inputDom.value).toEqual('-0.7');
        await userEvent.click(minusButtonDom);
        expect(inputDom.value).toEqual('-1.0');

        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('-0.3');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('0.4');
        await userEvent.click(addButtonDom);
        expect(inputDom.value).toEqual('1.0');
    });

    // 格式化当前值
    it('formatter current value', async done => {
        const formatter = currentValue =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(currentValue + 1);
                }, 200);
            });

        const { container: component } = render(
            <Stepper defaultValue={0} min={-1} max={5} step={1} digits={3} formatter={formatter} />,
        );
        const minusButtonDom = component.querySelector(minusButton);
        const inputDom = component.querySelector(input);
        const delay = 300;
        await userEvent.click(minusButtonDom);
        setTimeout(() => {
            expect(inputDom.value).toEqual('0.000');
            done();
        }, delay);
    });

    // 用户自定义按钮和输入框
    it('render by myself', () => {
        const minusButton = <div className="my-minus-button"></div>;
        const addButton = <div className="my-add-button"></div>;
        const { container: component } = render(
            <Stepper
                defaultValue={0}
                min={-1}
                max={5}
                step={1}
                addButton={addButton}
                minusButton={minusButton}
                renderContent={currentValue => {
                    const newValue = currentValue + 10;
                    return <input className="my-input" value={newValue} type="number" />;
                }}
            />,
        );
        const minusButtonDom = component.querySelectorAll('.my-minus-button');
        const inputDom = component.querySelector('.my-input');
        const addButtonDom = component.querySelectorAll('.my-add-button');

        expect(minusButtonDom.length).toBe(1);
        expect(addButtonDom.length).toBe(1);
        expect(inputDom.value).toEqual('10');
    });

    // change empty
    it('change value', done => {
        const ref = createRef();
        const formatter = currentValue => currentValue + 1;
        const { container: component } = render(
            <Stepper ref={ref} formatter={formatter} defaultValue={0} min={-1} max={1} />,
        );
        const { changeValue } = ref.current;
        act(() => {
            changeValue();
        });
        setTimeout(() => {
            expect(component.querySelector(input).value).toEqual('1');
            done();
        }, 500);
    });

    // change value max
    it('change value1', done => {
        const ref = createRef();
        const formatter = currentValue => currentValue + 1;
        const { container: component } = render(
            <Stepper ref={ref} formatter={formatter} defaultValue={0} min={-1} max={1} />,
        );
        const { changeValue } = ref.current;
        // jest.mock(changeValue);
        act(() => {
            changeValue(2);
        });

        setTimeout(() => {
            expect(component.querySelector(input).value).toEqual('1');
            done();
        }, 500);
    });

    // change value min
    it('change value2', done => {
        const ref = createRef();
        const formatter = currentValue => currentValue - 1;
        const { container: component } = render(
            <Stepper ref={ref} formatter={formatter} defaultValue={0} min={-1} max={1} />,
        );

        act(() => {
            ref.current.changeValue(-2);
        });

        setTimeout(() => {
            expect(component.querySelector(input).value).toEqual('-1');
            done();
        }, 200);
    });


    // 输入框 input 事件
    it('stepper input event', async () => {
        render(<Stepper defaultValue={0} min={-1} max={100} digits={1} step={0.1} allowEmpty />);
        const inputDom = screen.getByRole('spinbutton');

        expect(inputDom.value).toEqual('0.0');

        await userEvent.type(inputDom, ' ');
        await userEvent.type(inputDom, '.1');
        expect(inputDom.value).toBe('0.1');
    });
});
