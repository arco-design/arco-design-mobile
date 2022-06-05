import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Collapse from '..';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { defaultContext } from '../../context-provider';
import { delay } from '../../../tests/helpers/utils';

const prefix = `${defaultContext.prefixCls}-collapse`;

demoTest('collapse');

mountTest(Collapse, 'Collapse');

const activeItem = [
    '1'
]
const item = [
    {
        header: 'title1',
        value: '1',
        content: 'content1'
    },
    {
        header: 'title2',
        value: '2',
        content: 'content2'
    },
    {
        header: 'title3',
        value: '3',
        content: 'content3'
    }
]

describe('Collapse', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Default expanded rendering is correct', () => {
        const wrapper = mount(
            <Collapse
                header="title1"
                value="1"
                content={
                    <div>content</div>
                } />,
        );
        wrapper.find(`.${prefix}-header`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-content`).at(0).getDOMNode().style.height).toBe('auto');
    });

    it('Default Group expanded rendering is correct', () => {
        const mockFn = jest.fn();
        const wrapper = mount(
            <Collapse.Group
                items={item}
                activeItem={activeItem}
                onCollapse={mockFn}>
            </Collapse.Group>,
        );
        wrapper.setProps({
            activeItem: ['2']
        });
        wrapper.find(`.${prefix}-header`).at(0).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });
    it('OnCollapse rendering is correct', () => {
        const mockFn = jest.fn();
        const wrapper = mount(
            <Collapse
                header="title1"
                value="1"
                content={
                    <div>content</div>
                }
                onCollapse={mockFn}/>,
        );
        wrapper.find(`.${prefix}-header`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-content-container`).text()).toEqual('content');
        expect(mockFn.mock.calls.length).toBe(1);
    });
    it('Rerender is correct', () => {
        const wrapper = mount(
            <Collapse
                header="title1"
                value="1"
                content={
                    <div>content</div>
                }/>,
        );
        wrapper.setProps({
            content: (
                <div>
                    <div>content1</div>
                    <div>content1</div>
                    <div>content1</div>
                    <div>content1</div>
                </div>
            )
        })
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        wrapper.update();
        wrapper.find(`.${prefix}-header`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-content-container`).text()).toEqual('content1content1content1content1');
    });
    it('Disabled rendering is correct', () => {
        const wrapper = mount(
            <Collapse
                header="title3"
                value="3"
                disabled
                content={
                    <div>content</div>
                } />,
        );
        expect(wrapper.find(`.${prefix}-content`).at(0).getDOMNode().style.height).toBe('0px');
        wrapper.find(`.${prefix}-header`).simulate('click');
        expect(wrapper.find(`.${prefix}-content`).at(0).getDOMNode().style.height).toBe('0px');
    });
    it('Combined folds render correctly', () => {
        const wrapper = mount(
            <Collapse.Group defaultActiveItems={['1']} useAccordion>
                <Collapse
                    header="title1"
                    value="1"
                    content={
                        <Collapse.Group defaultActiveItems={['1']} useAccordion groupKey="sub-group">
                            <Collapse
                                header="children-title"
                                value="1"
                                content="content1"
                            />
                        </Collapse.Group>
                    }
                />
                <Collapse
                    header="content2"
                    active
                    value="2"
                    content="content2"
                />
            </Collapse.Group>,
        );
        expect(wrapper.find(`.${prefix}-content`).at(0).getDOMNode().style.height).toBe('auto');
        expect(wrapper.find(`.${prefix}-content`).at(1).getDOMNode().style.height).toBe('auto');
        expect(wrapper.find(`.${prefix}-content`).at(2).getDOMNode().style.height).toBe('0px');
        wrapper.find(`.${prefix}-header`).at(2).simulate('click');
        expect(wrapper.find(`.${prefix}-content`).at(0).getDOMNode().style.height).toBe('0px');
        expect(wrapper.find(`.${prefix}-content`).at(1).getDOMNode().style.height).toBe('auto');
        expect(wrapper.find(`.${prefix}-content`).at(2).getDOMNode().style.height).toBe('auto');
    });
})
