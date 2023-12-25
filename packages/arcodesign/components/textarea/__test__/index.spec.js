import React from 'react';
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Textarea from '..';

demoTest('textarea');

mountTest(Textarea, 'Textarea');

describe('Textarea', () => {
    it('should callback correctly when change text', () => {
        const mockFn = jest.fn();
        const caculatorFn= (value)=>{
            return value.length
        };
        const { container }=render(<Textarea onInput={mockFn} statisticsLengthCaculator={caculatorFn} cloneNodeWhenAutosize autosize/>)
        const textArea = container.querySelector('textarea')
        userEvent.type(textArea,'test')
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(4);
    });

    it('should render and callback correctly when more than limit', () => {
        jest.useFakeTimers()
        const mockFn = jest.fn();
        const { container } = render(<Textarea statisticsMaxlength={5} onErrStatusChange={mockFn} />)
        const textArea = container.querySelector('textarea')
        // 不清空输入会接收到234567891
        userEvent.clear(textArea)
        userEvent.type(textArea,'123456789')
        expect(mockFn).toBeCalled()
        expect(mockFn).toBeCalledTimes(2)
        const statisticText = container.querySelector('.statistic-text')
        jest.advanceTimersByTime(5000)
        expect(statisticText).toHaveClass('exceed')
        expect(statisticText).toHaveTextContent('9/5')
        expect(textArea).toHaveTextContent('123456789')
    });

    it('should render correctly when set area limit', () => {
        const { container } = render(<Textarea textareaStyle={{ height: 55 }}/>)
        const textArea = container.querySelector('textarea')
        expect(textArea).toHaveStyle('height: 55px')
    });
});