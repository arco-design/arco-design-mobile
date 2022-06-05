import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import NoticeBar from '..';
import IconNotice from '../../icon/IconNotice';
import { defaultContext } from '../../context-provider';
import { mockContainerSize, resetContainerSizeMock } from '../../../tests/helpers/mockElement';

const { prefixCls } = defaultContext;
const prefix = `${prefixCls}-notice-bar`;

demoTest('notice-bar');

mountTest(NoticeBar, 'NoticeBar');

function NoticeBarDemo() {
    const [text, setText] = React.useState('Click I will grow and start scrolling!');
    const barRef = React.useRef();
    return (
        <NoticeBar
            ref={barRef}
            marquee="always"
            autoSetGradientStyle={false}
            onClick={() => {
                setText(
                    'I became a long long long long long long long long long long long reminder message',
                );
                if (barRef.current) {
                    barRef.current.updateData();
                }
            }}
        >
            {text}
        </NoticeBar>
    );
}

describe('NoticeBar style', () => {
    it('Common styles render correctly', () => {
        const wrapper = mount(<NoticeBar>Note that this is a reminder message.</NoticeBar>);
        expect(wrapper.text()).toEqual('Note that this is a reminder message.');
    });
    it('Icon styles render correctly', () => {
        const wrapper = mount(
            <NoticeBar leftContent={<IconNotice />}>
                Note that this is a reminder message.
            </NoticeBar>,
        );
        expect(wrapper.find('svg').length).toBe(2);
    });
});

describe('NoticeBar actions', () => {
    beforeAll(() => {
        mockContainerSize();
    });

    afterAll(() => {
        resetContainerSizeMock();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Click render correctly', () => {
        const onClickRight = jest.fn();
        const wrapper = mount(
            <NoticeBar onClose={onClickRight}>Note that this is a reminder message.</NoticeBar>,
        );
        wrapper.find(`.${prefixCls}-icon-close`).simulate('click');
        expect(onClickRight.mock.calls.length).toBe(1);
    });
    it('Should support using ref to update', () => {
        const wrapper = mount(<NoticeBarDemo />);
        wrapper.find(NoticeBar).simulate('click');
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        wrapper.update();
    });
});
