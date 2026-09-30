import React, { createRef } from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
} from '../../../tests/helpers/mockEvent';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import PickerView from '..';

const mockData=[
    {
        data: [
            ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            ['上午', '下午', '晚上'],
        ],
        value: ['周三', '上午']
    },
    {
        data: [
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
        ],
        value: ['周三', '上午']
    },
    {
        data: [
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
        ],
        value: ['北京市', '北京市', '海淀区']
    },
    {
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
    }
]

demoTest('picker-view');

mountTest(PickerView, 'PickerView', {
    data: mockData[3].data,
    value: mockData[3].value
});

describe('pickerView render correctly',()=>{

    it('should render correctly when set default value as ValueType[][]', () => {
        render( <PickerView data={mockData[0].data} value={mockData[0].value} cascade={false} />)
        const selectedColumnsItem = screen.getByRole('generic',{ name: '周三'})
        const selectedColumnsItemWrap = screen.getByRole('generic',{ name: '上午'})
        const luckyElement1 = screen.getByText('周六')
        const luckyElement2 = screen.getByText('上午')
        expect(selectedColumnsItem).toBeInTheDocument()
        expect(selectedColumnsItemWrap).toBeInTheDocument()
        expect(luckyElement1).toBeInTheDocument()
        expect(luckyElement2).toBeInTheDocument()
    })

    it('should render correctly when set default value as PickerData[][]', () => {
        render( <PickerView data={mockData[1].data} value={mockData[1].value} cascade={false} />)
        const selectedColumnsItem = screen.getByRole('generic',{ name: '周三'})
        const selectedColumnsItemWrap = screen.getByRole('generic',{ name: '上午'})
        const luckyElement1 = screen.getByText('周六')
        const luckyElement2 = screen.getByText('上午')
        expect(selectedColumnsItem).toBeInTheDocument()
        expect(selectedColumnsItemWrap).toBeInTheDocument()
        expect(luckyElement1).toBeInTheDocument()
        expect(luckyElement2).toBeInTheDocument()
    });
})

describe('pickerView action correctly',()=>{

    beforeAll(() => {
        jest.useFakeTimers()
    })

    it('should callback correctly when un cascade picker view is clicked', () => {
        const mockFn = jest.fn();
        const ref = createRef();
        render(<PickerView 
            ref={ref} 
            data={mockData[1].data} 
            value={mockData[1].value} 
            onPickerChange={mockFn} 
            cascade={false}/>)
        const { getColumnValue } = ref.current;
        const valueBeforeClick = getColumnValue();
        expect(valueBeforeClick).toBe('周三');
        const weekdayOne = screen.getByText('周一');
        userEvent.click(weekdayOne)
        act(() => {
            jest.runAllTimers()
        })
        const ValueAfterClick = getColumnValue();
        expect(ValueAfterClick).toBe('周一');
    });

    it('should render and callback correctly when use cascade picker view click', () => {
        const ref = createRef();
        render(<PickerView
            cascade={true}
            ref={ref}
            data={mockData[2].data}
            value={mockData[2].value}
            cols={3}
        />)
        const { getColumnValue, getAllColumnValues } = ref.current;
        const valueBeforeClick = getColumnValue();
        const valuesBeforeClick = getAllColumnValues();
        expect(valueBeforeClick).toBe('北京市');
        expect(valuesBeforeClick).toEqual(['北京市', '北京市', '海淀区']);
        const yunnan = screen.getByText('云南省');
        userEvent.click(yunnan)
        act(()=>{
            jest.runAllTimers()
        })
        const valueAfterClick = getColumnValue();
        const valuesAfterClick = getAllColumnValues();
        expect(valueAfterClick).toBe('云南省');
        expect(valuesAfterClick).toEqual(['云南省', '昆明市', '五华区']);
    });

    it('picker-cell touchAction work correctly',() => {
        const mockFn = jest.fn();
        const ref = createRef();
        const { rerender } = render(<PickerView 
            ref={ref} 
            data={mockData[1].data} 
            value={mockData[1].value} 
            onPickerChange={mockFn} 
            cascade={false}
            touchToStop={true}/>
        )
        const weekdayOne = screen.getByText('周一');
        fireEvent.touchStart(weekdayOne,createStartTouchEventObject({x: 100,y:100}))
        act(() => {
            jest.runAllTimers()
        })
        fireEvent.touchMove(weekdayOne,createMoveTouchEventObject({x: 500,y:500}))
        fireEvent.touchEnd(weekdayOne)
        expect(mockFn).toBeCalled()
        expect(mockFn).toBeCalledTimes(1)
        rerender(<PickerView 
            ref={ref} 
            data={mockData[1].data} 
            value={mockData[1].value} 
            onPickerChange={mockFn} 
            cascade={false}
            disabled/>
        )
        fireEvent.touchStart(weekdayOne,createStartTouchEventObject({x: 100,y:100}))
        fireEvent.touchMove(weekdayOne,createMoveTouchEventObject({x: 500,y:500}))
        fireEvent.touchEnd(weekdayOne)
        expect(mockFn).toBeCalled()
        expect(mockFn).toBeCalledTimes(1)
    })

    it('should scroll with momentum when fast vertical touch move happens',() => {
        const mockFn = jest.fn();
        const ref = createRef();
        const { container } = render(<PickerView
            ref={ref}
            data={mockData[1].data}
            value={mockData[1].value}
            onPickerChange={mockFn}
            cascade={false}/>
        )
        // jsdom 无布局，手动设置选项高度后触发重新布局
        const bar = container.querySelector(`.arco-picker-selection-bar`);
        bar.getBoundingClientRect = () => ({ height: 34 });
        act(() => {
            ref.current.updateLayout();
        });

        // 纵向快速下滑：momentum 计算后定位到首行
        const weekdayOne = screen.getByText('周一');
        fireEvent.touchStart(weekdayOne, {
            touches: [{ screenX: 100, screenY: 100, clientX: 100, clientY: 100 }],
        });
        fireEvent.touchMove(weekdayOne, {
            touches: [{ screenX: 100, screenY: 500, clientX: 100, clientY: 500 }],
            changedTouches: [{ screenX: 100, screenY: 500, clientX: 100, clientY: 500 }],
        });
        fireEvent.touchEnd(weekdayOne);
        act(() => {
            jest.runAllTimers();
        });
        expect(mockFn).toBeCalled();
        expect(ref.current.getColumnValue()).toBe('周一');

        // 纵向快速上滑：momentum 计算后定位到末行
        fireEvent.touchStart(weekdayOne, {
            touches: [{ screenX: 100, screenY: 500, clientX: 100, clientY: 500 }],
        });
        fireEvent.touchMove(weekdayOne, {
            touches: [{ screenX: 100, screenY: 100, clientX: 100, clientY: 100 }],
            changedTouches: [{ screenX: 100, screenY: 100, clientX: 100, clientY: 100 }],
        });
        fireEvent.touchEnd(weekdayOne);
        act(() => {
            jest.runAllTimers();
        });
        expect(ref.current.getColumnValue()).toBe('周日');
    })

    it('should not scroll when touch move is horizontal',() => {
        const mockFn = jest.fn();
        const ref = createRef();
        render(<PickerView
            ref={ref}
            data={mockData[1].data}
            value={mockData[1].value}
            onPickerChange={mockFn}
            cascade={false}/>
        )
        const weekdayOne = screen.getByText('周一');
        // 横向移动距离大于纵向，不产生滚动
        fireEvent.touchStart(weekdayOne, {
            touches: [{ screenX: 100, screenY: 100, clientX: 100, clientY: 100 }],
        });
        fireEvent.touchMove(weekdayOne, {
            touches: [{ screenX: 500, screenY: 120, clientX: 500, clientY: 120 }],
            changedTouches: [{ screenX: 500, screenY: 120, clientX: 500, clientY: 120 }],
        });
        fireEvent.touchEnd(weekdayOne);
        act(() => {
            jest.runAllTimers();
        });
        expect(mockFn).not.toBeCalled();
        expect(ref.current.getColumnValue()).toBe('周三');

        // 仅 touch 未 move，不触发滚动结束逻辑
        fireEvent.touchStart(weekdayOne, {
            touches: [{ screenX: 100, screenY: 100, clientX: 100, clientY: 100 }],
        });
        fireEvent.touchEnd(weekdayOne);
        act(() => {
            jest.runAllTimers();
        });
        expect(mockFn).not.toBeCalled();
        expect(ref.current.getColumnValue()).toBe('周三');
    })

    it('should not respond item click when clickable is false',() => {
        const mockFn = jest.fn();
        const ref = createRef();
        render(<PickerView
            ref={ref}
            data={mockData[1].data}
            value={mockData[1].value}
            onPickerChange={mockFn}
            cascade={false}
            clickable={false}/>
        )
        userEvent.click(screen.getByText('周一'))
        act(() => {
            jest.runAllTimers()
        })
        expect(mockFn).not.toBeCalled();
        expect(ref.current.getColumnValue()).toBe('周三');
    })

    it('should skip scroll of empty column when hideEmptyCols is set',() => {
        const ref = createRef();
        render(<PickerView
            ref={ref}
            data={[mockData[0].data[0], []]}
            value={['周一']}
            cascade={false}
            hideEmptyCols/>
        )
        expect(screen.getByText('周一')).toBeInTheDocument();
        act(() => {
            ref.current.scrollToCurrentIndex();
        });
        expect(ref.current.getColumnValue()).toBe('周一');
    })

    it('should get cell moving status in cascade and normal mode',() => {
        const cascadeRef = createRef();
        render(<PickerView
            ref={cascadeRef}
            data={mockData[2].data}
            value={mockData[2].value}
            cols={3}/>
        )
        expect(Array.isArray(cascadeRef.current.getCellMovingStatus())).toBe(true);

        const normalRef = createRef();
        render(<PickerView
            ref={normalRef}
            data={mockData[1].data}
            value={mockData[1].value}
            cascade={false}/>
        )
        expect(normalRef.current.getCellMovingStatus()).toHaveLength(2);
    })

    it('should get all column data and scroll in cascade and normal mode',() => {
        const cascadeRef = createRef();
        render(<PickerView
            ref={cascadeRef}
            data={mockData[2].data}
            value={mockData[2].value}
            cols={3}/>
        )
        const cascadeData = cascadeRef.current.getAllColumnData();
        expect(Array.isArray(cascadeData)).toBe(true);
        expect(cascadeData[0].value).toBe('北京市');
        act(() => {
            cascadeRef.current.scrollToCurrentIndex();
        });
        expect(cascadeRef.current.getColumnValue()).toBe('北京市');

        const normalRef = createRef();
        render(<PickerView
            ref={normalRef}
            data={mockData[1].data}
            value={mockData[1].value}
            cascade={false}/>
        )
        const normalData = normalRef.current.getAllColumnData();
        expect(normalData).toHaveLength(2);
        expect(normalData[0].value).toBe('周三');
        act(() => {
            normalRef.current.scrollToCurrentIndex();
        });
        expect(normalRef.current.getColumnValue()).toBe('周三');
    })

    it('should reset value to initial value by resetValue',() => {
        const ref = createRef();
        render(<PickerView
            ref={ref}
            data={mockData[1].data}
            value={mockData[1].value}
            cascade={false}/>
        )
        userEvent.click(screen.getByText('周一'))
        act(() => {
            jest.runAllTimers()
        })
        expect(ref.current.getColumnValue()).toBe('周一');
        act(() => {
            ref.current.resetValue();
        })
        act(() => {
            jest.runAllTimers()
        })
        expect(ref.current.getColumnValue()).toBe('周三');
    })
})