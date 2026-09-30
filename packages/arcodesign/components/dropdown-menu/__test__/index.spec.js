import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import DropdownMenu from '..';
import { isClassNameDom, isRefDom } from '../helper';
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

    it('should support cascade options and reset values after selectedIndex', () => {
        const onValuesChange = jest.fn();
        const cascadeOptions = [
            {
                label: 'Beijing',
                value: 0,
                children: [
                    { label: 'Haidian District', value: 0 },
                    { label: 'Fengtai District', value: 1 },
                ],
            },
            {
                label: 'Guangdong Province',
                value: 1,
                children: [
                    {
                        label: 'Guangzhou',
                        value: 0,
                    },
                    {
                        label: 'Shenzhen',
                        value: 1,
                        children: [{ label: 'Nanshan', value: 0 }],
                    },
                ],
            },
        ];
        const { container } = render(
            <DropdownMenu options={cascadeOptions} onValuesChange={onValuesChange} />,
        );

        const selectItems = container.querySelectorAll(selectItemPrefix);
        expect(selectItems).toHaveLength(2);

        // 展开第一级并选择 Guangdong Province
        userEvent.click(selectItems[0]);
        act(() => {});
        userEvent.click(document.querySelectorAll(dropdownOptionsPrefix)[1]);
        act(() => {});
        expect(onValuesChange).toBeCalledTimes(1);
        expect(onValuesChange).toBeCalledWith([1, 0]);
        expect(container.querySelectorAll(`${selectItemPrefix}-label-text`)[0]).toHaveTextContent(
            'Guangdong Province',
        );

        // 切换到第二级并选择 Shenzhen，selectedIndex 之后的值被重置为下一级默认项
        userEvent.click(container.querySelectorAll(selectItemPrefix)[1]);
        act(() => {});
        const secondLevelOptions = document.querySelectorAll(dropdownOptionsPrefix);
        expect([...secondLevelOptions].map(op => op.textContent)).toEqual([
            'Guangzhou',
            'Shenzhen',
        ]);
        userEvent.click(secondLevelOptions[1]);
        act(() => {});
        expect(onValuesChange).toBeCalledTimes(2);
        expect(onValuesChange).toHaveBeenLastCalledWith([1, 1, 0]);
        expect(container.querySelectorAll(`${selectItemPrefix}-label-text`)[1]).toHaveTextContent(
            'Shenzhen',
        );
    });

    it('should close dropdown when touching outside by default onCancel', () => {
        const { container } = render(<DropdownMenu options={options} />);

        const menu = container.querySelector(`.${prefix}`);
        userEvent.click(container.querySelectorAll(selectItemPrefix)[0]);
        act(() => {});
        expect(menu).toHaveClass('show');

        // 触摸组件外部区域触发默认 onCancel 关闭
        fireEvent.touchStart(document.body);
        act(() => {});
        expect(menu).not.toHaveClass('show');
    });

    it('should not cancel dropdown when touching current select item', () => {
        const { container } = render(<DropdownMenu options={options} />);

        const menu = container.querySelector(`.${prefix}`);
        const item = container.querySelectorAll(selectItemPrefix)[0];
        userEvent.click(item);
        act(() => {});
        expect(menu).toHaveClass('show');

        // 触摸当前实例下的选择框不触发外部取消
        fireEvent.touchStart(item);
        act(() => {});
        expect(menu).toHaveClass('show');

        // 再次点击当前选择框切换关闭
        userEvent.click(item);
        act(() => {});
        expect(menu).not.toHaveClass('show');
    });

    it('should not open dropdown when clicking disabled select item', () => {
        const { container } = render(<DropdownMenu options={options} disabled={[true]} />);

        userEvent.click(container.querySelectorAll(selectItemPrefix)[0]);
        act(() => {});
        expect(container.querySelector(`.${prefix}`)).not.toHaveClass('show');
        expect(document.querySelectorAll(dropdownOptionsPrefix).length).toBe(0);
    });

    it('should expose dom via ref', () => {
        const ref = React.createRef();
        const { container } = render(<DropdownMenu ref={ref} options={options} />);

        expect(ref.current.dom).toBe(container.querySelector(`.${prefix}`));
    });

    it('isRefDom and isClassNameDom should handle null dom or ref', () => {
        expect(isRefDom(document.body, { current: null })).toBe(false);
        expect(isRefDom(null, { current: document.body })).toBe(false);
        expect(isClassNameDom(null, 'select-item')).toBe(false);

        // 使用脱离文档的节点，避免向上遍历到 document
        const detachedRoot = document.createElement('div');
        const detachedChild = document.createElement('span');
        detachedRoot.appendChild(detachedChild);
        expect(isClassNameDom(detachedChild, 'not-exist-class')).toBe(false);

        detachedChild.className = `${prefixCls}-select-item`;
        expect(isClassNameDom(detachedChild, 'arco-select-item')).toBe(true);
        expect(isRefDom(detachedChild, { current: detachedRoot })).toBe(true);
    });
});
