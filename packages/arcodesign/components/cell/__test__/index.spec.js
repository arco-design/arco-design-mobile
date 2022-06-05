import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Cell from '..';
import IconSound from '../../icon/IconSound';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-cell`;

const options = [
    {
        label: 'content',
    },
    {
        label: 'content',
    },
    {
        label: 'content',
    },
];

demoTest('cell');

mountTest(Cell, 'Cell');

describe('Cell', () => {
    it('Cell render correctly', () => {
        const wrapper = mount(<Cell label="content" desc="desc" bordered={false} />);
        expect(wrapper.find(`.${prefix}`).length).toBe(1);
        const wrapper1 = mount(<Cell label="content" text="desc" showArrow />);
        expect(wrapper1.find('.cell-text').length).toBe(1);
        expect(wrapper1.find('.cell-arrow-icon').length).toBe(1);
        const wrapper2 = mount(<Cell icon={<IconSound />} label="content" showArrow />);
        expect(wrapper2.find('.cell-label-icon svg').length).toBe(1);
        const wrapper3 = mount(
            <Cell
                label="content"
                prepend={<div className="prepend">desc</div>}
                append={<div className="append">desc</div>}
                showArrow
            >
                <div className="demo-cell-info">
                    <div className="info">info</div>
                    <div className="sub-info">sub-info</div>
                </div>
            </Cell>,
        );
        expect(wrapper3.text()).toEqual('desccontentinfosub-infodesc');
        const wrapper4 = mount(<Cell.Group options={options} />);
        expect(wrapper4.find(`.${prefix}`).length).toBe(3);
    });

    it('Cell click correctly', () => {
        const mockFn = jest.fn();
        const wrapper = mount(
            <Cell.Group>
                <Cell label="content" onClick={mockFn} />
                <Cell label="content" showArrow />
                <Cell label="content" showArrow />
            </Cell.Group>,
        );
        wrapper.find(Cell).at(0).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });
});
