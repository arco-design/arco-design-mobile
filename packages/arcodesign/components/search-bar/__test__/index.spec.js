import React, { createRef } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import SearchBar from '..';
import { delay } from '../../../tests/helpers/utils';

demoTest('search-bar');

mountTest(SearchBar, 'SearchBar');

const prefix = `${defaultContext.prefixCls}-search-bar`;
const actionBtnSelector = `.${prefix}-action-btn`;
const inputSelector = `.${prefix}-input`;
const clearIconSelector = `.${prefix}-clear`;
const searchIconSelector = `svg.${prefix}-search-icon`;
const associationContainerSelector = `.${prefix}-association-visible`;
const associationItemSelector = `.${prefix}-association-item`;
const highlightNodeSelector = `${associationItemSelector}-highlight`;

const useFakeTimersTest = (description, callback) => {
    it(description, () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        jest.useFakeTimers();

        callback(root);

        jest.useRealTimers();
        document.body.removeChild(root);
    });
};

// useInputLogic钩子中，onBlur和onFocus的回调都被延长了一个nextTick(20ms)，导致视图更新的延迟
// 因此需要手动延迟一段时间(比nextTick)长才能正确断言和显示隐藏相关的测试用例
const createInputDomSimulator = (inputDom, component) => {
    const originSimulate = inputDom.simulate;
    inputDom.simulate = (event, config) => {
        originSimulate.call(inputDom, event, config);
        delay(component, 25);
    };
    return inputDom;
};

describe('SearchBar', () => {
    useFakeTimersTest('component should render correctly', root => {
        const component = mount(<SearchBar />, { attachTo: root });
        // 输入框框被正常渲染
        expect(component.find(inputSelector).length).toBe(1);
        // 搜索icon被正常渲染
        expect(component.find(searchIconSelector).length).toBe(1);
        const inputDom = createInputDomSimulator(component.find('input'), component);
        inputDom.simulate('click');

        // 清除按钮被正常渲染
        expect(component.find(clearIconSelector).length).toBe(1);
        // 右侧actionBtn被正常渲染
        expect(component.find(actionBtnSelector).length).toBe(1);
    });

    useFakeTimersTest('actionBtn should render correctly', root => {
        const handleActionBtnClick = jest.fn();
        const component = mount(
            <SearchBar actionBtnText="搜索" onActionBtnClick={handleActionBtnClick} />,
            { attachTo: root },
        );

        const inputDom = createInputDomSimulator(component.find(inputSelector), component);

        // 测试actionBtnShowType为default的情况
        expect(component.find(actionBtnSelector).length).toBe(0);
        inputDom.simulate('focus');
        expect(component.find(actionBtnSelector).length).toBe(1);

        inputDom.simulate('blur');
        expect(component.find(actionBtnSelector).length).toBe(0);
        inputDom.simulate('change', { target: { value: '测试' } });
        expect(component.find(actionBtnSelector).length).toBe(1);
        inputDom.simulate('blur');
        expect(component.find(actionBtnSelector).length).toBe(1);

        // 测试actionBtnShowType为always的情况
        component.setProps({ actionBtnShowType: 'always' });
        inputDom.simulate('change', { target: { value: '' } });
        inputDom.simulate('blur');
        expect(component.find(actionBtnSelector).length).toBe(1);

        // 测试actionBtnShowType为focus的情况
        component.setProps({ actionBtnShowType: 'focus' });
        inputDom.simulate('blur');
        expect(component.find(actionBtnSelector).length).toBe(0);
        inputDom.simulate('focus');
        expect(component.find(actionBtnSelector).length);
        inputDom.simulate('blur');
        expect(component.find(actionBtnSelector).length).toBe(0);

        // 测试actionBtnShowType为value的情况
        component.setProps({ actionBtnShowType: 'value' });
        inputDom.simulate('change', { target: { value: '' } });
        expect(component.find(actionBtnSelector).length).toBe(0);
        inputDom.simulate('change', { target: { value: '测试' } });
        expect(component.find(actionBtnSelector).length).toBe(1);
        inputDom.simulate('blur');
        expect(component.find(actionBtnSelector).length).toBe(1);

        // 测试actionBtnShowType为none的情况
        component.setProps({ actionBtnShowType: 'none' });
        inputDom.simulate('focus');
        expect(component.find(actionBtnSelector).length).toBe(0);
        inputDom.simulate('change', { target: { value: '测' } });
        expect(component.find(actionBtnSelector).length).toBe(0);

        // 测试自定义append是否正常
        component.setProps({ actionBtnShowType: 'default' });
        const actionBtn = component.find(actionBtnSelector);
        inputDom.simulate('change', { target: { value: '测试' } });
        actionBtn.simulate('click');
        expect(handleActionBtnClick).toHaveBeenCalledWith('测试');

        component.setProps({
            append: <span id="test">测试</span>,
        });
        expect(component.find('#test').length).toBe(1);
    });

    it('association should render correctly', () => {
        const associationItems = [
            {
                content: '测试',
            },
        ];

        const component = mount(
            <SearchBar showSearchAssociation searchAssociationItems={associationItems} />,
        );

        expect(component.find(associationContainerSelector).length).toBe(0);

        // searchAssociationShowType为default
        const inputDom = component.find(inputSelector);
        inputDom.simulate('change', { target: { value: '测' } });
        expect(component.find(associationContainerSelector).length).toBe(1);

        inputDom.simulate('blur');
        expect(component.find(associationContainerSelector).length).toBe(0);

        inputDom.simulate('change', { target: { value: '' } });
        expect(component.find(associationContainerSelector).length).toBe(0);

        // searchAssociationShowType为value，blur也不会消失
        component.setProps({
            searchAssociationShowType: 'value',
        });
        inputDom.simulate('change', { target: { value: '测' } });
        expect(component.find(associationContainerSelector).length).toBe(1);
        inputDom.simulate('blur');
        expect(component.find(associationContainerSelector).length).toBe(1);
        inputDom.simulate('change', { target: { value: '' } });
        expect(component.find(associationContainerSelector).length).toBe(0);

        // searchAssociationShowType为focus, blur也消失
        component.setProps({
            searchAssociationShowType: 'focus',
        });
        inputDom.simulate('blur');
        expect(component.find(associationContainerSelector).length).toBe(0);
        inputDom.simulate('change', { target: { value: '测' } });
        expect(component.find(associationContainerSelector).length).toBe(1);

        component.setProps({
            searchAssociationShowType: 'always',
        });
        inputDom.simulate('blur');
        expect(component.find(associationContainerSelector).length).toBe(1);
        inputDom.simulate('change', { target: { value: '' } });
        expect(component.find(associationContainerSelector).length).toBe(1);
        inputDom.simulate('blur');
        expect(component.find(associationContainerSelector).length).toBe(1);
    });

    it('search-bar ref and on-event handler work correctly', () => {
        const associationItems = [
            {
                content: '测试',
            },
        ];

        const ref = createRef();
        const handleAssociationClick = jest.fn();
        const handleAssociationItemClick = jest.fn();

        const component = mount(
            <SearchBar
                showSearchAssociation
                ref={ref}
                searchAssociationItems={associationItems}
                onAssociationClick={handleAssociationClick}
                onAssociationItemClick={handleAssociationItemClick}
            />,
        );

        expect(component.find(associationContainerSelector).length).toBe(0);
        act(() => {
            ref.current.toggleAssociation();
        });
        component.update();
        expect(component.find(associationContainerSelector).length).toBe(1);
        act(() => {
            ref.current.toggleAssociation();
        });
        component.update();
        expect(component.find(associationContainerSelector).length).toBe(0);

        act(() => {
            ref.current.toggleAssociation(true);
        });
        component.update();
        expect(component.find(associationContainerSelector).length).toBe(1);

        component.find(associationContainerSelector).simulate('click');
        expect(handleAssociationClick).toBeCalled();
        const associationItemDoms = component.find(associationItemSelector);
        expect(associationItemDoms.length).toBe(1);

        const firstAssociationItem = associationItemDoms.at(0);
        firstAssociationItem.simulate('click');
        expect(handleAssociationItemClick).toHaveBeenCalledWith(associationItems[0], 0);
    });

    it('highlight prefix mode work correctly', () => {
        const associationItems = [
            {
                content: '测试',
            },
            {
                content: 'ArcoDesign',
            },
            {
                content: 'react',
            },
            {
                content: 'Ad',
            },
            {
                content: '',
            },
        ];

        const component = mount(
            <SearchBar showSearchAssociation searchAssociationItems={associationItems} />,
        );

        expect(component.find(associationItemSelector).length).toBe(associationItems.length);
        expect(component.find(highlightNodeSelector).length).toBe(0);

        component.setProps({
            highlightMode: 'prefix',
        });
        const inputDom = component.find(inputSelector);
        inputDom.simulate('change', { target: { value: 'A' } });
        expect(component.find(highlightNodeSelector).length).toBe(2);
        inputDom.simulate('change', { target: { value: 'Arco' } });
        expect(component.find(highlightNodeSelector).length).toBe(2);
        inputDom.simulate('change', { target: { value: 'react' } });
        expect(component.find(highlightNodeSelector).length).toBe(1);

        inputDom.simulate('change', { target: { value: '' } });
        expect(component.find(highlightNodeSelector).length).toBe(0);
    });

    it('highlight prefix mode work correctly', () => {
        const associationItems = [
            {
                content: '测试',
            },
            {
                content: 'ArcoDesign',
            },
            {
                content: 'react',
            },
            {
                content: 'great, refactor',
            },
            {
                content: '',
            },
        ];

        const component = mount(
            <SearchBar
                showSearchAssociation
                searchAssociationItems={associationItems}
                highlightMode="contain"
            />,
        );

        expect(component.find(associationItemSelector).length).toBe(associationItems.length);
        expect(component.find(highlightNodeSelector).length).toBe(0);
        const inputDom = component.find(inputSelector);
        inputDom.simulate('change', { target: { value: 'e' } });

        expect(component.find(highlightNodeSelector).length).toBe(4);
        inputDom.simulate('change', { target: { value: 're' } });
        expect(component.find(highlightNodeSelector).length).toBe(3);
        inputDom.simulate('change', { target: { value: '' } });
        expect(component.find(highlightNodeSelector).length).toBe(0);
    });

    it('render function should work correctly', () => {
        const renderSearchAssociation = Content => {
            return (
                <div>
                    <span id="test">Test</span>
                    {Content}
                </div>
            );
        };

        const renderSearchAssociationItem = (item, index, node) => {
            return (
                <>
                    <span id="test-item">Test</span>
                    {node}
                </>
            );
        };

        const associationItems = [
            {
                content: '测试',
            },
        ];

        const component = mount(
            <SearchBar
                showSearchAssociation
                searchAssociationItems={associationItems}
                renderSearchAssociation={renderSearchAssociation}
                renderSearchAssociationItem={renderSearchAssociationItem}
                highlightMode="unknown"
            />,
        );

        const inputDom = component.find(inputSelector);
        inputDom.simulate('change', { target: { value: 'test' } });

        expect(component.find('#test').length).toBe(1);
        expect(component.find('#test-item').length).toBe(1);
    });
});
