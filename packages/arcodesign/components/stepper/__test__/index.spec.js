import React, { createRef } from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Stepper from '..';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

demoTest('stepper');

mountTest(Stepper, 'Stepper');

const prefix = `.${defaultContext.prefixCls}-stepper`;
const minusButton = `${prefix}-minus-button`;
const input = `${prefix}-input`;
const addButton = `${prefix}-add-button`;

describe('Stepper', () => {
    // 组件正常渲染
    it('component render correctly', () => {
        const component = mount(<Stepper />);
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        // 正常渲染
        expect(minusButtonDom.length).toBe(1);
        expect(inputDom.length).toBe(1);
        expect(addButtonDom.length).toBe(1);
        expect(component.find(prefix).length).toBe(1);

        // 默认值为1
        expect(inputDom.instance().value).toEqual('1');
    });

    // 按钮点击数据结果正常
    it('button click correctly', () => {
        const component = mount(<Stepper defaultValue={1} min={0} max={20} step={1} />);
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        // 点击减号
        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0');

        // 点击加号
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1');
    });

    // 数据边界正确
    it('data limit correctly', () => {
        const component = mount(<Stepper defaultValue={1} min={0} max={1} step={1} />);
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        // 最小值为0
        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0');
        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0');

        // 最大值为1
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1');
    });

    // 传入受控值
    it('accept value', () => {
        const component = mount(<Stepper value={1} min={0} max={100} step={1} />);
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        // 值受控，点击加减不触发数据变动
        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1');
    });

    // 内容是否允许为空
    it('input value allow empty', () => {
        // 允许为空
        const component = mount(<Stepper defaultValue={1} min={0} max={100} step={1} allowEmpty />);
        const inputDom = component.find(input);

        inputDom.instance().value = '';
        inputDom.simulate('blur');
        expect(inputDom.instance().value).toEqual('');

        // 不允许为空
        const component1 = mount(<Stepper defaultValue={1} min={0} max={100} step={1} />);
        const inputDom1 = component1.find(input);

        inputDom1.instance().value = '';
        inputDom1.simulate('blur');
        expect(inputDom1.instance().value).toEqual('1');

        inputDom1.instance().value = '101';
        inputDom1.simulate('blur');
        expect(inputDom1.instance().value).toEqual('100');

        inputDom1.instance().value = '-1';
        inputDom1.simulate('blur');
        expect(inputDom1.instance().value).toEqual('0');
    });

    // 小数点
    it('data digits', () => {
        const component = mount(
            <Stepper defaultValue={0} min={-1} max={100} step={0.5} digits={1} />,
        );
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        expect(inputDom.instance().value).toEqual('0.0');

        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('-0.5');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.0');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.5');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1.0');
    });

    // 禁用步进器
    it('stepper disable', () => {
        const component = mount(
            <Stepper defaultValue={0} min={-1} max={100} step={0.5} digits={1} disabled />,
        );
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.0');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.0');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.0');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.0');
    });

    // 输入框只读
    it('stepper input readonly', () => {
        const component = mount(
            <Stepper defaultValue={0} min={-1} max={100} step={0.5} digits={1} inputReadonly />,
        );
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        expect(inputDom.instance().value).toEqual('0.0');

        inputDom.simulate('change', {
            target: {
                value: '2.0',
            },
        });
        expect(inputDom.instance().value).toEqual('0.0');

        // 按钮点击行为正常
        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('-0.5');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.0');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.5');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1.0');
    });

    // 不允许操作大于/小于极限值时，操作结果等于极限值
    it('equal limit disable', () => {
        const component = mount(
            <Stepper defaultValue={0} min={-1} max={1} step={0.7} digits={1} equalLimitDisabled />,
        );
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('-0.7');
        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('-0.7');

        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.0');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.7');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.7');
    });

    // 允许操作大于/小于极限值时，操作结果等于极限值
    it('equal limit disable', () => {
        const component = mount(
            <Stepper defaultValue={0} min={-1} max={1} step={0.7} digits={1} />,
        );
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('-0.7');
        minusButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('-1.0');

        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('-0.3');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('0.4');
        addButtonDom.simulate('click');
        expect(inputDom.instance().value).toEqual('1.0');
    });

    // 格式化当前值
    it('formatter current value', done => {
        const formatter = currentValue =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(currentValue + 1);
                }, 200);
            });

        const component = mount(
            <Stepper defaultValue={0} min={-1} max={5} step={1} digits={3} formatter={formatter} />,
        );
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const delay = 300;
        minusButtonDom.simulate('click');
        setTimeout(() => {
            component.update();
            expect(inputDom.instance().value).toEqual('0.000');
            done();
        }, delay);
    });

    // 用户自定义按钮和输入框
    it('render by myself', () => {
        const minusButton = <div className="my-minus-button"></div>;
        const addButton = <div className="my-add-button"></div>;
        const component = mount(
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
        const minusButtonDom = component.find('.my-minus-button');
        const inputDom = component.find('.my-input');
        const addButtonDom = component.find('.my-add-button');

        expect(minusButtonDom.length).toBe(1);
        expect(inputDom.length).toBe(1);
        expect(addButtonDom.length).toBe(1);
        expect(inputDom.instance().value).toEqual('10');
    });

    // change empty
    it('change value', done => {
        const ref = createRef();
        const formatter = currentValue => currentValue + 1;
        const component = mount(
            <Stepper ref={ref} formatter={formatter} defaultValue={0} min={-1} max={1} />,
        );
        const { changeValue } = ref.current;
        act(() => {
            changeValue();
        });
        component.update();
        setTimeout(() => {
            expect(component.find(input).instance().value).toEqual('1');
            done();
        }, 500);
    });

    // change value max
    it('change value1', done => {
        const ref = createRef();
        const formatter = currentValue => currentValue + 1;
        const component = mount(
            <Stepper ref={ref} formatter={formatter} defaultValue={0} min={-1} max={1} />,
        );
        const { changeValue } = ref.current;
        // jest.mock(changeValue);
        act(() => {
            changeValue(2);
        });
        component.update();
        setTimeout(() => {
            expect(component.find(input).instance().value).toEqual('1');
            done();
        }, 500);
    });

    // change value min
    it('change value2', done => {
        const ref = createRef();
        const formatter = currentValue => currentValue - 1;
        const component = mount(
            <Stepper ref={ref} formatter={formatter} defaultValue={0} min={-1} max={1} />,
        );

        act(() => {
            ref.current.changeValue(-2);
        });
        component.update();
        setTimeout(() => {
            expect(component.find(input).instance().value).toEqual('-1');
            done();
        }, 200);
    });

    // 输入框 input 事件
    it('stepper input event', () => {
        const component = mount(
            <Stepper defaultValue={0} min={-1} max={100} step={0.5} digits={1} allowEmpty/>,
        );
        const minusButtonDom = component.find(minusButton);
        const inputDom = component.find(input);
        const addButtonDom = component.find(addButton);

        expect(inputDom.instance().value).toEqual('0.0');

        inputDom.simulate('input', {
            target: {
                value: '2.2',
            },
        });
        expect(inputDom.instance().value).toEqual('2.2');

        inputDom.simulate('input', {
            target: {
                value: '2.222222',
            },
        });
        expect(inputDom.instance().value).toEqual('2.2');


        inputDom.simulate('input', {
            target: {
                value: '',
            },
        });
        expect(inputDom.instance().value).toEqual('');

        inputDom.simulate('input', {
            target: {
                value: '44',
            },
        });
        expect(inputDom.instance().value).toEqual('44.0');
    });
});
