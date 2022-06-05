import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Steps from '..';

const prefix = `${defaultContext.prefixCls}-steps`;
const iconPrefix = `${defaultContext.prefixCls}-icon`;

demoTest('steps');

mountTest(Steps, 'Steps');

describe('Steps', () => {
    it('should render correctly when set default', () => {
        const items = [{
            title: '开始',
        }, {
            title: '进行中',
        }, {
            title: '步骤3',
        }, {
            title: '完成',
        }]
        const component = mount(<Steps current={1} items={items} />);
        const beforeNode = component.find(`.${prefix}-item`).first();
        expect(beforeNode.hasClass('finish')).toBe(true);
        expect(beforeNode.find('.finish-bg-color-with-config').length).toBe(1);
        expect(beforeNode.find('svg').hasClass(`${iconPrefix}-check-bold`)).toBe(true);
        const currentNode = component.find(`.${prefix}-item`).at(1);
        expect(currentNode.hasClass('process')).toBe(true);
        expect(currentNode.find('.process-bg-color-with-config').length).toBe(1);
        expect(currentNode.find('span').hasClass(`${prefix}-item-icon-num`)).toBe(true);
        expect(currentNode.text()).toBe('2进行中');
    });
    it('should render correctly when set description', () => {
        const items = [{
            title: '开始',
            description: 'test'
        }, {
            title: '进行中',
            description: 'test'
        }, {
            title: '步骤3',
            description: 'test'
        }, {
            title: '完成',
            description: 'test'
        }]
        const component = mount(<Steps current={1} items={items} />);
        const children = component.find(`.${prefix}-item-description`);
        const descriptions = children.map(child => child.text());
        expect(descriptions).toEqual(['test', 'test', 'test', 'test']);
    });
    it('should render correctly when set mini size and no text', () => {
        const component = mount(<Steps current={1} items={new Array(4).fill({})} iconType="dot" />);
        expect(component.find(`.${prefix}-item-icon-dot`).length).toBe(4);
        expect(component.text()).toEqual('');
    });
    it('should render correctly when set error status', () => {
        const items = [{
            title: '开始'
        }, {
            title: '错误',
            status: 'error',
        }, {
            title: '步骤3'
        }, {
            title: '完成'
        }];
        const component = mount(<Steps current={1} items={items} />);
        const currentNode = component.find(`.${prefix}-item`).at(1);
        expect(currentNode.hasClass('error')).toBe(true);
    });
    it('should callback correctly when click step', () => {
        const mockFn = jest.fn();
        const items = [{
            title: '开始'
        }, {
            title: '错误',
            status: 'error',
        }, {
            title: '步骤3'
        }, {
            title: '完成'
        }];
        const component = mount(<Steps current={1} items={items} onClick={mockFn}/>);
        const firstChild = component.find(`.${prefix}-item`).first();
        firstChild.simulate('click');
        expect(mockFn).toBeCalled();
    });
});
