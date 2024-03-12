import React, { createRef } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import SearchBar from '..';
import { pureDelay as delay } from '../../../tests/helpers/utils';

demoTest('search-bar');

mountTest(SearchBar, 'SearchBar');

const prefix = `${defaultContext.prefixCls}-search-bar`;
const cancelBtnSelector = `span.${prefix}-cancel-btn`;
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
const focusSimulator = async (inputDom, delayTime) => {
    await fireEvent.focus(inputDom);
    await delay(delayTime);
};
const blurSimulator = async (inputDom, delayTime) => {
    await fireEvent.blur(inputDom, 25);
    await delay(delayTime);
};
const createInputDomSimulator = (inputDom, component) => {
    const originSimulate = inputDom.simulate;
    inputDom.simulate = (event, config) => {
        originSimulate.call(inputDom, event, config);
        delay(component, 25);
    };
    return inputDom;
};

describe('SearchBar', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('component should render correctly', async () => {
        const { container: component } = render(<SearchBar />);
        // 输入框框被正常渲染
        expect(component.querySelectorAll(inputSelector).length).toBe(1);
        // 搜索icon被正常渲染
        expect(component.querySelectorAll(searchIconSelector).length).toBe(1);
        const inputDom = createInputDomSimulator(component.querySelector('input'), component);
        await userEvent.click(inputDom);

        // 清除按钮被正常渲染
        expect(component.querySelectorAll(clearIconSelector).length).toBe(0);
        userEvent.type(inputDom, '测试');
        expect(component.querySelectorAll(clearIconSelector).length).toBe(1);
        // 右侧actionBtn被正常渲染
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(1);
    });

    it('actionBtn should render correctly', async () => {
        const handleCancel = jest.fn();
        const { container: component, rerender } = render(<SearchBar onCancel={handleCancel} />);

        const inputDom = createInputDomSimulator(component.querySelector(inputSelector), component);

        // 测试actionBtnShowType为default的情况
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(0);
        await focusSimulator(inputDom, 25);
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(1);

        await blurSimulator(inputDom, 25);
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(0);

        userEvent.type(inputDom, '测试');
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(1);

        await blurSimulator(inputDom, 25);
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(1);

        await userEvent.click(component.querySelector(cancelBtnSelector));
        delay(25);
        expect(handleCancel).toBeCalledTimes(1);
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(0);

        await focusSimulator(inputDom, 25);
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(1);
        await userEvent.click(component.querySelector(cancelBtnSelector));
        delay(25);
        expect(component.querySelectorAll(cancelBtnSelector).length).toBe(0);
        expect(handleCancel).toBeCalledTimes(2);

        // 测试自定义append是否正常
        rerender(
            <SearchBar
                onCancel={handleCancel}
                actionButton={<span id="search">搜索</span>}
                append={<span id="test">测试</span>}
            />,
        );
        expect(component.querySelectorAll('#test').length).toBe(1);
        expect(component.querySelectorAll('#search').length).toBe(1);
        // rerender(
        //     <SearchBar
        //         onCancel={handleCancel}
        //         actionButton={<span id="search">搜索</span>}
        //         append={() => <span id="test">测试</span>}
        //     />,
        // );
        // expect(component.querySelectorAll('#test').length).toBe(1);
        // expect(component.querySelectorAll('#search').length).toBe(1);
    });

    it('association should render correctly', async () => {
        const associationItems = [
            {
                content: '测试',
            },
        ];

        const { container: component, rerender } = render(
            <SearchBar enableAssociation associationItems={associationItems} />,
        );

        expect(component.querySelectorAll(associationContainerSelector).length).toBe(0);

        // associationShowType为default
        const inputDom = component.querySelector(inputSelector);
        userEvent.type(inputDom, '测');
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);

        await blurSimulator(inputDom, 25);
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(0);

        userEvent.clear(inputDom);
        userEvent.type(inputDom, '');
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(0);

        // associationShowType为value，blur也不会消失
        rerender(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                associationShowType="value"
            />,
        );
        userEvent.clear(inputDom);
        userEvent.type(inputDom, '测');
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);
        await blurSimulator(inputDom, 25);
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);
        userEvent.clear(inputDom);
        userEvent.type(inputDom, '');
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(0);

        // associationShowType为focus, blur也消失
        rerender(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                associationShowType="focus"
            />,
        );
        await blurSimulator(inputDom, 25);
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(0);
        userEvent.type(inputDom, '测');
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);

        rerender(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                associationShowType="always"
            />,
        );
        await blurSimulator(inputDom, 25);
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);
        userEvent.type(inputDom, '');
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);
        await blurSimulator(inputDom, 25);
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);
    });

    it('search-bar ref and on-event handler work correctly', async () => {
        const associationItems = [
            {
                content: '测试',
            },
        ];

        const ref = createRef();
        const handleAssociationClick = jest.fn();
        const handleAssociationItemClick = jest.fn();

        const { container: component } = render(
            <SearchBar
                enableAssociation
                ref={ref}
                associationItems={associationItems}
                onAssociationClick={handleAssociationClick}
                onAssociationItemClick={handleAssociationItemClick}
            />,
        );

        expect(component.querySelectorAll(associationContainerSelector).length).toBe(0);
        act(() => {
            ref.current.toggleAssociation();
        });
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);
        act(() => {
            ref.current.toggleAssociation();
        });
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(0);

        act(() => {
            ref.current.toggleAssociation(true);
        });
        expect(component.querySelectorAll(associationContainerSelector).length).toBe(1);

        await userEvent.click(component.querySelector(associationContainerSelector));
        expect(handleAssociationClick).toBeCalled();
        const associationItemDoms = component.querySelectorAll(associationItemSelector);
        expect(associationItemDoms.length).toBe(1);

        const firstAssociationItem = associationItemDoms[0];
        await userEvent.click(firstAssociationItem);
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
                content: '一个测试组',
            },
        ];

        const { container: component, rerender } = render(
            <SearchBar enableAssociation associationItems={associationItems} />,
        );

        expect(component.querySelectorAll(associationItemSelector).length).toBe(
            associationItems.length,
        );
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(0);

        rerender(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                highlightMode="prefix"
            />,
        );
        const inputDom = component.querySelector(inputSelector);

        userEvent.type(inputDom, 'A');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(2);
        userEvent.clear(inputDom);
        userEvent.type(inputDom, 'Arco');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(2);
        userEvent.clear(inputDom);
        userEvent.type(inputDom, 'react');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(1);
        userEvent.clear(inputDom);
        userEvent.type(inputDom, '');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(0);

        rerender(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                highlightMode="contain"
            />,
        );
        userEvent.clear(inputDom);
        userEvent.type(inputDom, '测试');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(2);

        rerender(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                highlightMode={(content, keyword, defaultClassName) =>
                    content.includes(keyword) ? (
                        <span className={defaultClassName}>{content}</span>
                    ) : (
                        content
                    )
                }
            />,
        );
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(2);
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

        const { container: component } = render(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                highlightMode="contain"
            />,
        );

        expect(component.querySelectorAll(associationItemSelector).length).toBe(
            associationItems.length,
        );
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(0);
        const inputDom = component.querySelector(inputSelector);
        userEvent.type(inputDom, 'e');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(4);
        userEvent.clear(inputDom);
        userEvent.type(inputDom, 're');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(3);
        userEvent.clear(inputDom);
        userEvent.type(inputDom, '');
        expect(component.querySelectorAll(highlightNodeSelector).length).toBe(0);
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

        const { container: component } = render(
            <SearchBar
                enableAssociation
                associationItems={associationItems}
                renderAssociation={renderSearchAssociation}
                renderAssociationItem={renderSearchAssociationItem}
                highlightMode="unknown"
            />,
        );

        const inputDom = component.querySelector(inputSelector);
        userEvent.type(inputDom, 'test');

        expect(component.querySelectorAll('#test').length).toBe(1);
        expect(component.querySelectorAll('#test-item').length).toBe(1);
    });
});
