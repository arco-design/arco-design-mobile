import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import NoticeBar from '..';
import IconNotice from '../../icon/IconNotice';
import { defaultContext } from '../../context-provider';
import { defineHtmlRefProperties } from '../../../tests/helpers/mockElement';
import { pureDelay } from '../../../tests/helpers/utils';

const { prefixCls } = defaultContext;
const prefix = `${prefixCls}-notice-bar`;

demoTest('notice-bar');

mountTest(NoticeBar, 'NoticeBar');

const { setHTMLProperties, unsetHTMLProperties } = defineHtmlRefProperties({
    offsetWidth: 375,
    offsetHeight: 200,
});

const longText =
    'I became a long long long long long long long long long long long reminder message';

function NoticeBarDemo() {
    const [text, setText] = React.useState('Click I will grow and start scrolling!');
    const barRef = React.useRef();
    return (
        <NoticeBar
            ref={barRef}
            marquee="always"
            autoSetGradientStyle={false}
            onClick={() => {
                setText(longText);
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
        const { container } = render(<NoticeBar>Note that this is a reminder message.</NoticeBar>);
        expect(container.textContent).toEqual('Note that this is a reminder message.');
    });

    it('Icon styles render correctly', () => {
        const { container } = render(
            <NoticeBar leftContent={<IconNotice />}>
                Note that this is a reminder message.
            </NoticeBar>,
        );
        const svgArray = container.getElementsByTagName('svg');
        expect(svgArray.length).toBe(2);
    });
});

describe('NoticeBar actions', () => {
    beforeAll(() => {
        // mockContainerSize();
        setHTMLProperties();
    });

    afterAll(() => {
        // resetContainerSizeMock();
        unsetHTMLProperties();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Click render correctly', async () => {
        const onClickRight = jest.fn();
        const { container } = render(
            <div>
                <NoticeBar onClose={onClickRight}>Note that this is a reminder message.</NoticeBar>,
            </div>,
        );
        const closeIcon = container.querySelectorAll(`.${prefixCls}-icon-close`)[0];
        userEvent.click(closeIcon);
        expect(onClickRight.mock.calls.length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}`).length).toBe(0);
    });

    it('Should support using ref to update', () => {
        const { container } = render(<NoticeBarDemo />);
        const noticeBar = container.querySelectorAll(`.${prefix}`)[0];

        userEvent.click(noticeBar);
        pureDelay(2000);
        const content = container.querySelectorAll(`.${prefix}-content-inner`)[0];
        expect(content.textContent).toBe(longText);
    });
});
