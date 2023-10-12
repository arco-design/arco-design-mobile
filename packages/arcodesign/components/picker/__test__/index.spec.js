import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Picker from '..';

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
});