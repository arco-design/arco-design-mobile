import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Ellipsis from '..';

const prefix = `${defaultContext.prefixCls}-ellipsis`;

demoTest('ellipsis');

mountTest(Ellipsis, 'Ellipsis');

const text =
        'The Arco Design Mobile component library system consists of a pattern of "one core library + multiple business libraries". If the business to be used is already in the existing business component library list, it is recommended to use or jointly build the corresponding business component library; if there is no specific business or there is no corresponding business component library but you are anxious to use it, you can use the core basic library.';


export function EllipsisDemo() {
    const [ellipsis, setEllipsis] = React.useState(true);
    const collapseNode = <span className="hide">收起</span>;

    return (
        <Ellipsis
            ellipsis={ellipsis}
            text={text}
            maxLine={2}
            ellipsisNode={
                <span>
                    ...<span className="display">display</span>
                </span>
            }
            collapseNode={collapseNode}
            reflowOnResize={true}
            onEllipsisNodeClick={() => {
                setEllipsis(false);
            }}
            onCollapseNodeClick={() => {
                setEllipsis(true);
            }}
        />
    );
}

describe('Ellipsis style', () => {
    it('Text multi-line omission renders correctly', () => {
        const { container } = render(
            <Ellipsis text={text} maxLine={2}/>
        );
        expect(container.querySelector(`.${prefix}-native.ellipsis`).style.WebkitLineClamp).toBe('2');
    });
})

describe('Ellipsis action', () => {
    it('Text multi-line omission renders correctly', () => {
        const { container } = render(
            <EllipsisDemo />
        );
        const ellipsisBtn = screen.getByText('display');
        userEvent.click(ellipsisBtn);
        const hideEllipsisBtn = container.querySelector('.hide');
        expect(hideEllipsisBtn.textContent).toBe('收起');
        userEvent.click(hideEllipsisBtn);
        expect(container.querySelector(`.${prefix}-js-content-ellipsis`).style.display).toBe('none');
    });

    it('DangerousInnerHTML render correctly', async() => {
        const ref = createRef();
        const htmlText = `This wasn't the first time ''natural'' sounds had been used in <a class="demo-link-line">musical compositions</a>; that sort of thing had been going on at least as far back as the 19th century, and the surrealists and futurists of the 1920s and 1930s were way into this kind of thing`;
        jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
            getPropertyValue: () => 'normal'
        }));
        const { container } = render(<Ellipsis text={htmlText} dangerouslyUseInnerHTML maxLine={2} ref={ref} onReflow={() => {}} />);
        const child = container.querySelector(`.${prefix}-js`);
        Object.defineProperty(child, 'getBoundingClientRect', {
            value: jest.fn(() => ({ height: 60 })),
        });
        ref.current.reflow();
        expect(container.querySelectorAll(`.${prefix}-js-content-text`).length).toEqual(1);
        expect(container.querySelector(`.${prefix}-js-content-ellipsis`).style.display).toBe('inline');
    });
})
