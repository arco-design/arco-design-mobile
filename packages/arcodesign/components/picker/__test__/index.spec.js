import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Picker from '..';

demoTest('picker');

mountTest(Picker, 'Picker');

const mockData = {
    data: [
        {label: '湖北', value: '湖北'},
        {label: '河南', value: '河南'},
        {label: '湖南', value: '湖南'},
        {label: '北京', value: '北京'},
        {label: '上海', value: '上海'},
        {label: '广东', value: '广东'},
        {label: '重庆', value: '重庆'},
        {label: '四川', value: '四川'}
    ],
    value: ['北京']
};

describe('Picker', () => {

    it('should render correctly', () => {
        render(<Picker data={mockData.data} value={mockData.value}/>)
    });

    it('should callback correctly when click btn', () => {
        jest.useFakeTimers()
        const okMock = jest.fn();
        const changeMock = jest.fn();
        const dismissMock = jest.fn();
        const onHideMock = jest.fn();
        render(<Picker 
            data={mockData.data} 
            value={mockData.value} 
            visible={true} 
            onOk={okMock} 
            onChange={changeMock} 
            onDismiss={dismissMock} 
            onHide={onHideMock}
            dismissText='cancel'
            okText='ok'/>)
        const dismissButton = screen.getByText('cancel')
        const okButton = screen.getByText('ok')
        userEvent.click(dismissButton)
        userEvent.click(okButton)
        act(() => {
            jest.runAllTimers()
        })
        expect(okMock).toBeCalled()
        expect(changeMock).toBeCalled()
        expect(dismissMock).toBeCalled()
        expect(onHideMock).toBeCalled()
        expect(okMock).toBeCalledTimes(1)
        expect(changeMock).toBeCalledTimes(1)
        expect(dismissMock).toBeCalledTimes(1)
        // 取消和确认都会调用onHide，所以应该调用两次
        expect(onHideMock).toBeCalledTimes(2)
    });

    it('should support ref methods', () => {
        jest.useFakeTimers()
        const ref = React.createRef();
        render(<Picker ref={ref} data={mockData.data} value={mockData.value} visible={true}/>)
        act(() => {
            jest.runAllTimers()
        })
        expect(ref.current.getCellMovingStatus().length).toBe(3)
        expect(ref.current.getColumnValue(0)).toBe('北京')
        act(() => {
            ref.current.updateLayout()
            ref.current.scrollToCurrentIndex()
        })
    });

    it('should update layout when window resized while visible', () => {
        jest.useFakeTimers()
        render(<Picker data={mockData.data} value={mockData.value} visible={true}/>)
        act(() => {
            jest.runAllTimers()
        })
        act(() => {
            window.dispatchEvent(new Event('resize'))
        })
    });

    it('should open picker when clicking linked container and close by mask', () => {
        jest.useFakeTimers()
        const onHideMock = jest.fn();
        const { container } = render(<Picker
            data={mockData.data}
            value={mockData.value}
            maskClosable={true}
            onHide={onHideMock}
            renderLinkedContainer={(value) => <div className="linked-btn">{value}</div>}/>)
        const linkedBtn = container.querySelector('.linked-btn')
        expect(linkedBtn).toHaveTextContent('北京')
        act(() => {
            userEvent.click(linkedBtn)
        })
        act(() => {
            jest.runAllTimers()
        })
        const mask = document.querySelector('.arco-masking-mask')
        expect(mask).toBeInTheDocument()
        act(() => {
            userEvent.click(mask)
        })
        act(() => {
            jest.runAllTimers()
        })
        expect(onHideMock).toBeCalledWith('mask')
    });
});