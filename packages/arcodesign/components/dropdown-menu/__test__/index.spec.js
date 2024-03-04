import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import DropdownMenu from '..';
import { defaultContext } from '../../context-provider';
import '@testing-library/jest-dom';

const { prefixCls } = defaultContext;
const prefix = `${prefixCls}-dropdown-menu`;
const selectItemPrefix = `.${prefixCls}-select-item`;
const dropdownOptionsPrefix = `.${prefixCls}-dropdown-options-item`;

demoTest('dropdown-menu');

mountTest(DropdownMenu, 'DropdownMenu');

const options = ['海淀区', '丰台区', '昌平区'];

describe('DropdownMenu', () => {
    it('dropdown open correctly', () => {
        const { container } = render(<DropdownMenu options={options} />);
        const item = container.querySelectorAll(selectItemPrefix)[0];
        userEvent.click(item);
        expect(container.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(document.querySelectorAll(dropdownOptionsPrefix).length).toBe(3);
    });

    it('dropdown open in the up direction', () => {
        const { container } = render(
            <DropdownMenu
                options={options}
                extraForDropdown={{ direction: 'up', maxHeight: 120 }}
            />,
        );
        const item = container.querySelectorAll(selectItemPrefix)[0];
        userEvent.click(item);
        expect(document.querySelectorAll('.drop-up').length).toBe(1);
    });

    it('should click dropdown item correctly', () => {
        const { container } = render(
            <DropdownMenu
                options={options}
                extraForDropdown={{ direction: 'up', maxHeight: 120 }}
            />,
        );
        const item = container.querySelectorAll(selectItemPrefix)[0];
        userEvent.click(item);

        const dropDownItemSecond = document.querySelectorAll(
            `.${prefixCls}-dropdown-options-item`,
        )[1];
        userEvent.click(dropDownItemSecond);

        expect(dropDownItemSecond).toHaveClass('selected');
        expect(container.querySelectorAll(`${selectItemPrefix}-label-text`)[0]).toHaveTextContent(
            '丰台区',
        );
    });

    it('should click multiple dropdown items correctly', () => {
        const { container } = render(
            <DropdownMenu
                options={options}
                extraForDropdown={{ direction: 'up', maxHeight: 120 }}
                multiple
            />,
        );
        const item = container.querySelectorAll(selectItemPrefix)[0];
        userEvent.click(item);

        const dropDownItems = document.querySelectorAll(dropdownOptionsPrefix);
        const dropDownItemFirst = dropDownItems[0];
        const dropDownItemSecond = dropDownItems[1];
        userEvent.click(dropDownItemFirst);
        userEvent.click(dropDownItemSecond);

        expect(dropDownItemFirst).toHaveClass('selected');
        expect(dropDownItemSecond).toHaveClass('selected');
        expect(container.querySelectorAll(`${selectItemPrefix}-label-text`)[0]).toHaveTextContent(
            '海淀区,丰台区',
        );
    });

    it('should open dropdown that has cascadeArray options correctly', () => {
        const { container } = render(
            <DropdownMenu
                options={[
                    [
                        {
                            label: 'Haidian District',
                            value: 0,
                            disabled: false,
                        },
                        {
                            label: 'Fengtai District',
                            value: 1,
                        },
                        {
                            label: 'Changping District',
                            value: 2,
                            disabled: true,
                        },
                    ],
                    [
                        {
                            label: 'Low floor',
                            value: 0,
                            disabled: false,
                        },
                        {
                            label: 'Middle floor',
                            value: 1,
                        },
                        {
                            label: 'High floor',
                            value: 2,
                            disabled: true,
                        },
                    ],
                ]}
            />,
        );
        const dropDownItemSecond = container.querySelectorAll(selectItemPrefix)[1];
        userEvent.click(dropDownItemSecond);
        expect(container.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(document.querySelectorAll(dropdownOptionsPrefix).length).toBe(3);
    });
});
