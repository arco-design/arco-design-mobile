import React from 'react';
import { mount } from 'enzyme';
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
        const wrapper = mount(
            <Ellipsis text={text} maxLine={2}/>
        );
        expect(wrapper.find(`.${prefix}-native.ellipsis`).props().style.WebkitLineClamp).toBe(2);
    });
})

describe('Ellipsis action', () => {
    it('Text multi-line omission renders correctly', () => {
        const wrapper = mount(
            <EllipsisDemo />
        );
        wrapper.find('.display').simulate('click');
        expect(wrapper.find('.hide').text()).toEqual('收起');
        wrapper.find('.hide').simulate('click');
        expect(wrapper.find('.hide').length).toBe(0);
    });
})
