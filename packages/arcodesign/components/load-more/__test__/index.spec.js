import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { mockElementProperty } from '../../../tests/helpers/mockElement';
import LoadMore from '..';

demoTest('load-more');

mountTest(LoadMore, 'LoadMore');

describe('LoadMore type', () => {
    it('Loading state is rendered correctly', () => {
        render(<LoadMore status="loading" />);
        const element = screen.getByText('正在努力加载中...');
        expect(element).toBeInTheDocument();
    });

    it('Prepare state is rendered correctly', () => {
        render(<LoadMore status="prepare" />);
        const element = screen.getByText('上拉加载更多');
        expect(element).toBeInTheDocument();
    });

    it('Nomore state is rendered correctly', () => {
        render(<LoadMore status="nomore" />);
        const element = screen.getByText('没有更多数据了');
        expect(element).toBeInTheDocument();
    });

    it('Retry state is rendered correctly', () => {
        render(<LoadMore status="retry" />);
        const element = screen.getByText('加载失败，点击重试');
        expect(element).toBeInTheDocument();
    });

    it('BeforeReady state is rendered correctly', () => {
        render(<LoadMore status="before-ready" beforeReadyArea="before-ready" />);
        const element = screen.getByText('before-ready');
        expect(element).toBeInTheDocument();
    });

    it('Default state is rendered correctly', () => {
        render(<LoadMore status="default" />);
        const element = screen.getAllByRole('generic');
        // 查询的第二个才是正确结果，所以是1
        expect(element[1]).toBeEmptyDOMElement();
    });
});

describe('LoadMore action', () => {
    it('onClick listener correctly', () => {
        const onClick = jest.fn();
        const { rerender } = render(<LoadMore onClick={onClick} throttle={200} trigger="click" />);
        userEvent.click(screen.getAllByRole('generic')[1]);
        expect(onClick).toBeCalled();
        expect(onClick).toBeCalledTimes(1);
        rerender(
            <LoadMore
                onClick={onClick}
                throttle={200}
                trigger="scroll"
                status="prepare"
                getDataAtFirst={false}
                getDataWhenNoScrollAtFirst
            />,
        );
        userEvent.click(screen.getAllByRole('generic')[1]);
        expect(onClick).toBeCalled();
        expect(onClick).toBeCalledTimes(2);
    });

    it('onScroll listener correctly', () => {
        const onChange = jest.fn();
        const { rerender } = render(
            <LoadMore status="ready" trigger="scroll" onStatusChange={onChange} threshold={0} />,
        );
        rerender(
            <LoadMore status="prepare" trigger="scroll" onStatusChange={onChange} threshold={0} />,
        );
        fireEvent.scroll(screen.getAllByRole('generic')[1]);
        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledTimes(1);
    });
});

describe('LoadMore scroll trigger', () => {
    const containers = [];
    function createScrollContainer() {
        const scrollContainer = document.createElement('div');
        document.body.appendChild(scrollContainer);
        mockElementProperty(scrollContainer, 'scrollHeight', 1000);
        mockElementProperty(scrollContainer, 'clientHeight', 500);
        containers.push(scrollContainer);
        return scrollContainer;
    }
    afterEach(() => {
        containers.forEach(container => container.remove());
        containers.length = 0;
    });

    it('should trigger loading when scrolled to bottom and expose ref methods', () => {
        const onEndReached = jest.fn();
        const onStatusChange = jest.fn();
        const scrollContainer = createScrollContainer();
        const ref = React.createRef();
        render(
            <LoadMore
                ref={ref}
                trigger="scroll"
                threshold={0}
                getDataAtFirst={false}
                getScrollContainer={() => scrollContainer}
                onEndReached={onEndReached}
                onStatusChange={onStatusChange}
                getData={cb => cb('nomore')}
            />,
        );
        // 未滚动到底部时不触发
        // @en Do not trigger when not scrolled to bottom
        scrollContainer.scrollTop = 0;
        fireEvent.scroll(scrollContainer);
        expect(onEndReached).not.toBeCalled();

        // 滚动到底部时触发加载并回调状态
        // @en Trigger loading and callback status when scrolled to bottom
        scrollContainer.scrollTop = 600;
        fireEvent.scroll(scrollContainer);
        expect(onEndReached).toBeCalledTimes(1);
        expect(onStatusChange).toBeCalledWith('loading', 'scrollEnd');
        expect(onStatusChange).toBeCalledWith('nomore', 'manual');

        // 状态离开loading后lastScrollEnd被重置，但nomore状态不再触发请求
        // @en lastScrollEnd resets after loading finishes, but nomore status no longer requests
        fireEvent.scroll(scrollContainer);
        expect(onEndReached).toBeCalledTimes(2);
        expect(onStatusChange).toBeCalledTimes(2);

        // 容器一屏可放下时通过ref方法触发加载
        // @en Trigger loading via ref method when container fits in one screen
        mockElementProperty(scrollContainer, 'clientHeight', 1200);
        act(() => {
            ref.current.getDataWithEndReachCheck();
        });
        expect(onStatusChange).toBeCalledWith('loading', 'pageEnd');
    });

    it('should not trigger getData repeatedly while loading', () => {
        const onEndReached = jest.fn();
        const getData = jest.fn();
        const scrollContainer = createScrollContainer();
        render(
            <LoadMore
                trigger="scroll"
                threshold={0}
                getDataAtFirst={false}
                getScrollContainer={() => scrollContainer}
                onEndReached={onEndReached}
                getData={getData}
            />,
        );
        scrollContainer.scrollTop = 600;
        fireEvent.scroll(scrollContainer);
        expect(onEndReached).toBeCalledTimes(1);
        expect(getData).toBeCalledTimes(1);

        // loading状态下再次滚动到底部不重复请求
        // @en Do not request repeatedly when scrolling to bottom while loading
        scrollContainer.scrollTop = 0;
        fireEvent.scroll(scrollContainer);
        scrollContainer.scrollTop = 600;
        fireEvent.scroll(scrollContainer);
        expect(onEndReached).toBeCalledTimes(2);
        expect(getData).toBeCalledTimes(1);
    });

    it('should not trigger getData when disabled', async () => {
        const getData = jest.fn();
        const { container } = render(<LoadMore trigger="click" disabled getData={getData} />);
        await userEvent.click(container.querySelector('.arco-load-more'));
        expect(getData).not.toBeCalled();
    });
});
