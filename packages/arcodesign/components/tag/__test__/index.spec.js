import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Tag from '..';

const prefix = `${defaultContext.prefixCls}-tag`;

demoTest('tag');

mountTest(Tag, 'Tag');

describe('Tag', () => {
    mountTest(() => <Tag type="hollow">Tag</Tag>, 'should mount correctly when set type prop');
    mountTest(() => <Tag size="small">Tag</Tag>, 'should mount correctly when set size prop');
    it('should callback correctly when close icon be clicked', () => {
        const mockFn = jest.fn();
        const component = mount(<Tag closeable onClose={mockFn}>标签</Tag>);
        expect(component.find('.tag-close-wrap').length).toBe(1);
        component.find('.tag-close-wrap').simulate('click');
        expect(mockFn).toBeCalled();
    });
    it('should callback correctly when click tag', () => {
        const mockFn = jest.fn();
        const component = mount(<Tag onClick={mockFn}>标签</Tag>);
        component.simulate('click');
        expect(mockFn).toBeCalled();
    });
    it('should render correctly when set filleted/halfBorder/borderStyle', () => {
        const component = mount(<Tag filleted halfBorder borderStyle="solid">标签</Tag>);
        expect(component.find(`.${prefix}`).hasClass('half-border')).toBe(true);
        expect(component.find(`.${prefix}`).props().style.borderStyle).toBe('solid');
        expect(component.find(`.${prefix}`).hasClass('filleted')).toBe(true);
    });
    it('should render correctly when use tag list', () => {
        const list = [1, 1].map(item => ({
            closeable: true,
            children: `标签${item}`
        }));
        const component = mount(<Tag.List list={list}/>);
        expect(component.find(`.${prefix}`).length).toBe(3);
        expect(component.find('.tag-list-add-wrap').length).toBe(1);
    });
})
