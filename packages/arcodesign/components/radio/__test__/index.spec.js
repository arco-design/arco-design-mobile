import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import mountTest from '../../../tests/mountTest';
import IconCheck from '../../icon/IconCheck';
import { defaultContext } from '../../context-provider';
import Radio from '..';

const prefix = `${defaultContext.prefixCls}-radio`;
const iconPrefix = `${defaultContext.prefixCls}-icon`;

mountTest(Radio, 'Radio', { value: 1 });

mountTest(Radio.Group, 'Radio.Group', { options: [{ value: 1 }, { value: 2 }] });

describe('Radio', () => {
    it('should render correctly when uncontrolled radio set defaultCheck prop', () => {
        const { container } = render(<Radio defaultCheck={true}>Radio</Radio>);

        expect(container.querySelector('.radio-icon.checked')).not.toBeNull();
        expect(
            container.querySelector(`.${iconPrefix}.${iconPrefix}-circle-checked`),
        ).not.toBeNull();
    });

    it('should callback correctly when uncontrolled radio changed', async () => {
        const mockFn = jest.fn();

        const { container } = render(<Radio onChange={mockFn}>Radio</Radio>);

        // 验证初始状态
        expect(container.querySelector('.radio-icon')).not.toHaveClass('checked');
        expect(container.querySelector(`.${iconPrefix}`)).not.toHaveClass(
            `${iconPrefix}-circle-checked`,
        );

        // 模拟点击行为
        userEvent.click(container.querySelector(`.${prefix}`));

        // 验证行为后的状态
        expect(mockFn).toBeCalled();
        expect(container.querySelector('.radio-icon')).toHaveClass('checked');
        expect(container.querySelector(`.${iconPrefix}`)).toHaveClass(
            `${iconPrefix}-circle-checked`,
        );

        // 再次模拟点击行为
        userEvent.click(container.querySelector(`.${prefix}`));

        // 验证再次点击后的状态
        expect(mockFn).toBeCalled();
        expect(container.querySelector('.radio-icon')).toHaveClass('checked');
        expect(container.querySelector(`.${iconPrefix}`)).toHaveClass(
            `${iconPrefix}-circle-checked`,
        );
    });

    it('should render and callback correctly when controlled radio changed', () => {
        let checked = true;

        const { container, rerender } = render(
            <Radio onChange={v => (checked = v)} checked={checked}>
                Radio
            </Radio>,
        );
        const radioContainer = container.querySelector('.radio-icon');

        expect(radioContainer).toHaveClass('checked');
        expect(radioContainer.querySelector(`.${iconPrefix}`)).toHaveClass(
            `${iconPrefix}-circle-checked`,
        );

        rerender(
            <Radio onChange={v => (checked = v)} checked={false}>
                Radio
            </Radio>,
        );

        expect(radioContainer).not.toHaveClass('checked');
        expect(radioContainer.querySelector(`.${iconPrefix}`)).not.toHaveClass(
            `${iconPrefix}-circle-checked`,
        );
    });

    it('should render and callback correctly when set disabled prop', () => {
        const mockFn = jest.fn();

        // 渲染 Radio 组件
        const { container, rerender } = render(<Radio onChange={mockFn}>Radio</Radio>);

        let radio = container.querySelector(`.${prefix}`);
        let radioIcon = container.querySelector('.radio-icon');
        let icon = container.querySelector(`.${iconPrefix}`);

        // 检查初始化状态
        expect(radio).not.toHaveClass('disabled');
        expect(radioIcon).not.toHaveClass('disabled');
        expect(icon).not.toHaveClass(`${iconPrefix}-circle-disabled`);

        // 更新组件 props
        rerender(
            <Radio onChange={mockFn} disabled={true}>
                Radio
            </Radio>,
        );

        // 获取更新后的组件
        radio = container.querySelector(`.${prefix}`);
        radioIcon = container.querySelector('.radio-icon');
        icon = container.querySelector(`.${iconPrefix}`);

        // 模拟点击事件
        userEvent.click(radio);

        // 验证是否产生完整的点击事件
        expect(mockFn).not.toHaveBeenCalled();

        // 检查更新状态
        expect(radio).toHaveClass('disabled');
        expect(radioIcon).toHaveClass('disabled');
        expect(icon).toHaveClass(`${iconPrefix}-circle-disabled`);
        expect(radioIcon).not.toHaveClass('checked');
        expect(icon).not.toHaveClass(`${iconPrefix}-circle-checked`);
    });

    it('should render correctly when set layout prop', () => {
        const { container: leftContainer } = render(<Radio layout="block">Radio</Radio>);
        expect(leftContainer.querySelector(`.${prefix}`)).toHaveClass('block');
        const { container: rightContainer } = render(<Radio layout="justify">Radio</Radio>);
        expect(rightContainer.querySelector(`.${prefix}`)).toHaveClass('justify');
    });
    it('should render correctly when set custom/null icons', () => {
        const checkIcon = {
            normal: <IconCheck />,
            active: <IconCheck />,
            disabled: <IconCheck />,
            activeDisabled: <IconCheck />,
        };
        const { container: customContainer } = render(<Radio icons={checkIcon}>Radio</Radio>);
        expect(customContainer.querySelector('svg')).toHaveClass(`${iconPrefix}-check`);
        const { container: nullContainer } = render(<Radio icons={null}>Radio</Radio>);
        expect(nullContainer.querySelector('.radio-icon')).toBeNull();
    });
});

describe('Radio.Group', () => {
    it('should render correctly when use options prop', () => {
        const options = [
            {
                label: '内容一',
                value: 1,
            },
            {
                label: '内容二',
                value: 2,
            },
            {
                label: '内容三',
                value: 3,
                disabled: true,
            },
        ];
        const defaultValues = 1;
        const { container } = render(<Radio.Group options={options} value={defaultValues} />);
        const radios = [...container.querySelectorAll(`.${prefix}`)];
        expect(radios.map(radio => radio.textContent)).toEqual(options.map(option => option.label));
        const checkedRadios = radios.map(radio =>
            radio.querySelector('.radio-icon').classList.contains('checked'),
        );
        expect(checkedRadios).toEqual([true, false, false]);
    });

    it('should callback and render correctly when change radio group', () => {
        const onClick = jest.fn();
        const options = [
            {
                label: '内容一',
                value: 1,
            },
            {
                label: '内容二',
                value: 2,
            },
            {
                label: '内容三',
                value: 3,
            },
        ];
        const { container } = render(<Radio.Group options={options} onChange={onClick} />);
        const lastRadio = container.querySelectorAll(`.${prefix}`).item(2);
        userEvent.click(lastRadio);
        expect(onClick).toBeCalled();
    });
});
