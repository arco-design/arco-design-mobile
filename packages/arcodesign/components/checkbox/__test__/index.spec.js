import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import IconCheck from '../../icon/IconCheck';
import Checkbox from '..';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-checkbox`;
const iconPrefix = `${defaultContext.prefixCls}-icon`;

demoTest('checkbox');

mountTest(Checkbox, 'Checkbox', { value: 1 });

mountTest(Checkbox.Group, 'Checkbox.Group', { options: [{ value: 1 }, { value: 2 }] });

describe('Checkbox', () => {
    it('should render correctly when uncontrolled checkbox set defaultCheck prop', () => {
        const { container } = render(<Checkbox defaultCheck>Checkbox</Checkbox>);
        expect(container.querySelector('.checkbox-icon').classList.contains('checked')).toBe(true);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-checked`),
        ).toBe(true);
    });
    it('should callback correctly when uncontrolled checkbox changed', () => {
        const mockFn = jest.fn();
        const { container } = render(<Checkbox onChange={mockFn}>Checkbox</Checkbox>);
        expect(container.querySelector('.checkbox-icon').classList.contains('checked')).toBe(false);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-checked`),
        ).toBe(false);
        const checkbox = container.querySelector(`.${prefix}`);
        userEvent.click(checkbox);
        expect(mockFn).toBeCalled();
        expect(container.querySelector('.checkbox-icon').classList.contains('checked')).toBe(true);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-checked`),
        ).toBe(true);
        userEvent.click(checkbox);
        expect(mockFn).toBeCalled();
        expect(container.querySelector('.checkbox-icon').classList.contains('checked')).toBe(false);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-checked`),
        ).toBe(false);
    });
    it('should render and callback correctly when controlled checkbox changed', () => {
        let checked = true;
        const { container, rerender } = render(
            <Checkbox onChange={v => (checked = v)} checked={checked}>
                Checkbox
            </Checkbox>,
        );
        expect(container.querySelector('.checkbox-icon').classList.contains('checked')).toBe(true);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-checked`),
        ).toBe(true);
        checked = false;
        rerender(
            <Checkbox onChange={v => (checked = v)} checked={checked}>
                Checkbox
            </Checkbox>,
        );
        expect(container.querySelector('.checkbox-icon').classList.contains('checked')).toBe(false);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-checked`),
        ).toBe(false);
    });
    it('should render and callback correctly when set disabled prop', () => {
        const mockFn = jest.fn();
        const { container, rerender } = render(<Checkbox onChange={mockFn}>Checkbox</Checkbox>);
        expect(container.querySelector(`.${prefix}`).classList.contains('disabled')).toBe(false);
        expect(container.querySelector('.checkbox-icon').classList.contains('disabled')).toBe(
            false,
        );
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-disabled`),
        ).toBe(false);
        rerender(
            <Checkbox onChange={mockFn} disabled>
                Checkbox
            </Checkbox>,
        );
        const checkbox = container.querySelector(`.${prefix}`);
        userEvent.click(checkbox);
        expect(mockFn).not.toBeCalled();
        expect(container.querySelector(`.${prefix}`).classList.contains('disabled')).toBe(true);
        expect(container.querySelector('.checkbox-icon').classList.contains('disabled')).toBe(true);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-disabled`),
        ).toBe(true);
        expect(container.querySelector('.checkbox-icon').classList.contains('checked')).toBe(false);
        expect(
            container
                .querySelector(`.${iconPrefix}`)
                .classList.contains(`${iconPrefix}-circle-checked`),
        ).toBe(false);
    });
    it('should render correctly when set layout prop', () => {
        const { container: leftComponent } = render(<Checkbox layout="block">Checkbox</Checkbox>);
        expect(leftComponent.querySelector(`.${prefix}`).classList.contains('block')).toBe(true);
        const { container: rightComponent } = render(
            <Checkbox layout="justify">Checkbox</Checkbox>,
        );
        expect(rightComponent.querySelector(`.${prefix}`).classList.contains('justify')).toBe(true);
    });
    it('should render correctly when set custom/null icons', () => {
        const checkIcon = {
            normal: <IconCheck />,
            active: <IconCheck />,
            disabled: <IconCheck />,
            activeDisabled: <IconCheck />,
        };
        const { container: customComponent } = render(
            <Checkbox icons={checkIcon}>Checkbox</Checkbox>,
        );
        expect(customComponent.querySelector('svg').classList.contains(`${iconPrefix}-check`)).toBe(
            true,
        );
        const { container: nullComponent } = render(<Checkbox icons={null}>Checkbox</Checkbox>);
        expect(nullComponent.classList.contains('checkbox-icon')).toBe(false);
    });
});

describe('Checkbox.Group', () => {
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
        const defaultValues = options.map(option => option.value);
        const { container: component } = render(
            <Checkbox.Group options={options} value={defaultValues} />,
        );
        const renderLabels = component.querySelectorAll(`.${prefix}`);
        for (let i = 0; i < 3; i++) {
            const renderLabel = renderLabels[i];
            expect(renderLabel.textContent).toEqual(options[i].label);
        }
        const renderValues = component.querySelectorAll(`.${prefix}`);
        for (let i = 0; i < 3; i++) {
            const renderLabel = renderLabels[i];
            expect(renderLabel.querySelector('.checkbox-icon').classList.contains('checked'));
        }
    });
    it('should limit correctly when set max prop', () => {
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
        const defaultValues = [1, 2];
        const { container: component } = render(
            <Checkbox.Group value={defaultValues} options={options} max={2} />,
        );
        const lastChild = component.querySelectorAll(`.${prefix}`)[2];
        userEvent.click(lastChild);
        expect(lastChild.querySelector('.checkbox-icon').classList.contains('checked')).toBe(false);
    });
    it('should callback and render correctly when change checkbox group', () => {
        const mockFn = jest.fn();
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
        const { container: component } = render(
            <Checkbox.Group options={options} onChange={mockFn} />,
        );
        const lastChild = component.querySelectorAll(`.${prefix}`)[2];
        userEvent.click(lastChild);
        expect(mockFn).toBeCalled();
    });
});
