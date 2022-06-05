import React, { createRef } from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import PickerView from '..';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { defaultContext } from '../../context-provider';

const pickerPrefix = `${defaultContext.prefixCls}-picker`;

demoTest('picker-view');

mountTest(PickerView, 'PickerView', {
    data: [
        {
            label: '北京市',
            value: '北京市',
            children: [
                {
                    label: '朝阳区',
                    value: '朝阳区',
                },
                {
                    label: '海淀区',
                    value: '海淀区',
                },
                {
                    label: '东城区',
                    value: '东城区',
                },
                {
                    label: '西城区',
                    value: '西城区',
                },
            ],
        },
    ],
    value: ['北京市', '海淀区'],
});

describe('PickerView', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render correctly when set default value as ValueType[][]', () => {
        const data = [
            ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            ['上午', '下午', '晚上'],
        ];
        const defaultValue = ['周三', '上午'];
        const component = mount(
            <PickerView data={data} value={defaultValue} cascade={false} />,
        );
        const firstCol = component.find(`.${pickerPrefix}-column`).first();
        expect(firstCol.find(`.${pickerPrefix}-column-item`).length).toBe(7);
        expect(firstCol.find('.selected-neighbor-2').length).toBe(2);
        expect(firstCol.find('.selected-neighbor-1').length).toBe(2);
        expect(firstCol.find('.selected').length).toBe(1);
        expect(firstCol.find('.selected').text()).toBe('周三');
        const secondCol = component.find(`.${pickerPrefix}-column`).last();
        expect(secondCol.find(`.${pickerPrefix}-column-item`).length).toBe(3);
        expect(secondCol.find('.selected-neighbor-2').length).toBe(1);
        expect(secondCol.find('.selected-neighbor-1').length).toBe(1);
        expect(secondCol.find('.selected').length).toBe(1);
        expect(secondCol.find('.selected').text()).toBe('上午');
    });
    it('should render correctly when set default value as PickerData[][]', () => {
        const data = [
            [
                { label: '周一', value: '周一' },
                { label: '周二', value: '周二' },
                { label: '周三', value: '周三' },
                { label: '周四', value: '周四' },
                { label: '周五', value: '周五' },
                { label: '周六', value: '周六' },
                { label: '周日', value: '周日' },
            ],
            [
                { label: '上午', value: '上午' },
                { label: '下午', value: '下午' },
                { label: '晚上', value: '晚上' },
            ],
        ];
        const defaultValue = ['周三', '上午'];
        const component = mount(
            <PickerView data={data} value={defaultValue} cascade={false} />,
        );
        const firstCol = component.find(`.${pickerPrefix}-column`).first();
        expect(firstCol.find(`.${pickerPrefix}-column-item`).length).toBe(7);
        expect(firstCol.find('.selected-neighbor-2').length).toBe(2);
        expect(firstCol.find('.selected-neighbor-1').length).toBe(2);
        expect(firstCol.find('.selected').length).toBe(1);
        expect(firstCol.find('.selected').text()).toBe('周三');
        const secondCol = component.find(`.${pickerPrefix}-column`).last();
        expect(secondCol.find(`.${pickerPrefix}-column-item`).length).toBe(3);
        expect(secondCol.find('.selected-neighbor-2').length).toBe(1);
        expect(secondCol.find('.selected-neighbor-1').length).toBe(1);
        expect(secondCol.find('.selected').length).toBe(1);
        expect(secondCol.find('.selected').text()).toBe('上午');
    });
    it('should callback correctly when un cascade picker view is clicked', () => {
        const mockFn = jest.fn();
        const ref = createRef();
        const data = [
            [
                { label: '周一', value: '周一' },
                { label: '周二', value: '周二' },
                { label: '周三', value: '周三' },
                { label: '周四', value: '周四' },
                { label: '周五', value: '周五' },
                { label: '周六', value: '周六' },
                { label: '周日', value: '周日' },
            ],
            [
                { label: '上午', value: '上午' },
                { label: '下午', value: '下午' },
                { label: '晚上', value: '晚上' },
            ],
        ];
        const defaultValue = ['周三', '上午'];
        const component = mount(
            <PickerView ref={ref} data={data} value={defaultValue} onPickerChange={mockFn} cascade={false} />,
        );
        const { getColumnValue } = ref.current;
        const firstCol = component.find(`.${pickerPrefix}-column`).first();
        const neighborNode = firstCol.find(`.${pickerPrefix}-column-item`).first();
        const valueBeforeClick = getColumnValue();
        expect(valueBeforeClick).toBe('周三');
        neighborNode.simulate('click');
        act(() => {
            jest.advanceTimersByTime(200);
        })
        component.update();
        const valueAfterClick = getColumnValue();
        expect(mockFn).toBeCalled();
        expect(valueAfterClick).toBe('周一');
    });
    it('should render and callback correctly when use cascade picker view click', () => {
        const data = [
            {
                label: '北京市',
                value: '北京市',
                children: [
                    {
                        label: '北京市',
                        value: '北京市',
                        children: [
                            {
                                label: '朝阳区',
                                value: '朝阳区',
                            },
                            {
                                label: '海淀区',
                                value: '海淀区',
                            },
                            {
                                label: '东城区',
                                value: '东城区',
                            },
                            {
                                label: '西城区',
                                value: '西城区',
                            },
                        ],
                    },
                ],
            },
            {
                label: '辽宁省',
                value: '辽宁省',
                children: [
                    {
                        label: '沈阳市',
                        value: '沈阳市',
                        children: [
                            {
                                label: '沈河区',
                                value: '沈河区',
                            },
                            {
                                label: '浑南区',
                                value: '浑南区',
                            },
                            {
                                label: '沈北新区',
                                value: '沈北新区',
                            },
                        ],
                    },
                    {
                        label: '本溪市',
                        value: '本溪市',
                        children: [
                            {
                                label: '溪湖区',
                                value: '溪湖区',
                            },
                            {
                                label: '东明区',
                                value: '东明区',
                            },
                            {
                                label: '桓仁满族自治县',
                                value: '桓仁满族自治县',
                            },
                        ],
                    },
                ],
            },
            {
                label: '云南省',
                value: '云南省',
                children: [
                    {
                        label: '昆明市',
                        value: '昆明市',
                        children: [
                            {
                                label: '五华区',
                                value: '五华区',
                            },
                            {
                                label: '官渡区',
                                value: '官渡区',
                            },
                            {
                                label: '呈贡区',
                                value: '呈贡区',
                            },
                        ],
                    },
                ],
            },
        ];
        const value = ['北京市', '北京市', '海淀区'];
        const ref = createRef();
        const components = mount(<PickerView
            cascade={true}
            ref={ref}
            data={data}
            value={value}
            cols={3}
        />);
        const { getColumnValue, getAllColumnValues } = ref.current;
        const firstCol = components.find(`.${pickerPrefix}-column`).first();
        const firstColLastNode = firstCol.find(`.${pickerPrefix}-column-item`).last();
        const valueBeforeClick = getColumnValue();
        const valuesBeforeClick = getAllColumnValues();
        expect(valueBeforeClick).toBe('北京市');
        expect(valuesBeforeClick).toEqual(['北京市', '北京市', '海淀区']);
        firstColLastNode.simulate('click');
        act(() => {
            jest.advanceTimersByTime(200);
        })
        components.update();
        const valueAfterClick = getColumnValue();
        const valuesAfterClick = getAllColumnValues();
        expect(valueAfterClick).toBe('云南省');
        expect(valuesAfterClick).toEqual(['云南省', '昆明市', '五华区']);
    });
});
