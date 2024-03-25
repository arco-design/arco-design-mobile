import React from 'react';
import { render, screen,fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import LoadMore from '..';

demoTest('load-more');

mountTest(LoadMore, 'LoadMore');

describe('LoadMore type', () => {

    it('Loading state is rendered correctly', () => {
        render(<LoadMore status = 'loading' />)
        const element = screen.getByText('正在努力加载中...')
        expect(element).toBeInTheDocument();
    });

    it('Prepare state is rendered correctly', () => {
        render(<LoadMore status = 'prepare' />)
        const element = screen.getByText('上拉加载更多')
        expect(element).toBeInTheDocument();
    });

    it('Nomore state is rendered correctly', () => {
        render(<LoadMore status = 'nomore' />)
        const element = screen.getByText('没有更多数据了')
        expect(element).toBeInTheDocument();
    });
    
    it('Retry state is rendered correctly', () => {
        render(<LoadMore status = 'retry' />)
        const element = screen.getByText('加载失败，点击重试')
        expect(element).toBeInTheDocument();
    });

    it('BeforeReady state is rendered correctly', () => {
        render(<LoadMore status = 'before-ready' beforeReadyArea = 'before-ready'/>)
        const element = screen.getByText('before-ready')
        expect(element).toBeInTheDocument();
    });

    it('Default state is rendered correctly', () => {
        render(<LoadMore status = 'default' />)
        const element = screen.getAllByRole('generic')
        // 查询的第二个才是正确结果，所以是1
        expect(element[1]).toBeEmptyDOMElement();
    });
})

describe('LoadMore action', () => {

    it('onClick listener correctly', () => {
        const onClick = jest.fn();
        const { rerender } = render(<LoadMore onClick = {onClick} throttle = {200} trigger = 'click'/>)
        userEvent.click(screen.getAllByRole('generic')[1])
        expect(onClick).toBeCalled();
        expect(onClick).toBeCalledTimes(1);
        rerender(<LoadMore onClick = {onClick} throttle = {200} trigger = 'scroll' status='prepare' getDataAtFirst={false} getDataWhenNoScrollAtFirst/>)
        userEvent.click(screen.getAllByRole('generic')[1])
        expect(onClick).toBeCalled();
        expect(onClick).toBeCalledTimes(2);
    });

    it('onScroll listener correctly',()=>{
        const onChange = jest.fn();
        const { rerender } = render(<LoadMore status='ready' trigger='scroll' onStatusChange={onChange} threshold={0}/>)
        rerender(<LoadMore status = 'prepare' trigger='scroll' onStatusChange={onChange} threshold={0}/>)
        fireEvent.scroll(screen.getAllByRole('generic')[1])
        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledTimes(1);
    })
})