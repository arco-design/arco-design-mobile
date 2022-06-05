import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import { getTestDemo, openMasking, testMaskingCase } from '../../masking/__test__/utils';
import Dialog from '..';

demoTest('dialog');

const prefix = `${defaultContext.prefixCls}-dialog`;

function simulateClick(wrapper, btnClass) {
    expect(wrapper.find(`.dialog-footer-button.${btnClass}`)).toHaveLength(1);
    wrapper.find(`.dialog-footer-button.${btnClass}`).simulate('click');
}

describe('Dialog', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    testMaskingCase('dialog', Dialog, prefix, `${prefix}-container`);

    it('should support `footer` to customize operation buttons', async () => {
        const onOk = jest.fn();
        const onDisabled = jest.fn();
        const onDelay = jest.fn(() => new Promise(res => setTimeout(() => res(), 1000)));
        const TestDemo = getTestDemo(Dialog);
        const wrapper = mount(<TestDemo footer={[{
            content: 'Confirm',
            className: 'confirm',
            onClick: onOk,
        }, {
            content: 'Disabled',
            className: 'disabled',
            onClick: onDisabled,
            disabled: true,
        }, {
            content: 'Delay',
            className: 'delay',
            onClick: onDelay,
        }]} />);
        // click confirm
        openMasking(wrapper, Dialog);
        simulateClick(wrapper, 'confirm');
        expect(onOk.mock.calls).toHaveLength(1);
        expect(wrapper.find(Dialog).props().visible).toBe(false);
        // click disabled
        openMasking(wrapper, Dialog);
        simulateClick(wrapper, 'disabled');
        expect(onDisabled.mock.calls).toHaveLength(0);
        expect(wrapper.find(Dialog).props().visible).toBe(true);
        // click delay
        simulateClick(wrapper, 'delay');
        expect(onDelay.mock.calls).toHaveLength(1);
        expect(wrapper.find(Dialog).props().visible).toBe(true);
        await act(async () => {
            await jest.advanceTimersByTime(1100);
        });
        wrapper.update();
        expect(wrapper.find(Dialog).props().visible).toBe(false);
    });

    it('should set part style correctly', () => {
        const TestDemo = getTestDemo(Dialog);
        const wrapper = mount(<TestDemo
            platform="android"
            renderFooter={() => <div className="demo-dialog-footer" />}
        />);
        openMasking(wrapper, Dialog);
        expect(wrapper.find(`.${prefix}-content`).find('.demo-dialog-footer')).toHaveLength(1);
        expect(wrapper.find(`.${prefix}-body`).hasClass('sub-title')).toBe(true);
        wrapper.setProps({ title: 'Title' });
        expect(wrapper.find(`.${prefix}-header`).hasClass('left')).toBe(true);
        expect(wrapper.find(`.${prefix}-body`).hasClass('left')).toBe(true);
        expect(wrapper.find(`.${prefix}-body`).hasClass('sub-title')).toBe(false);
        wrapper.setProps({ platform: 'ios' });
        expect(wrapper.find(`.${prefix}-header`).hasClass('center')).toBe(true);
        expect(wrapper.find(`.${prefix}-body`).hasClass('center')).toBe(true);
    });

    it('should support `Dialog.alert` and `Dialog.confirm`', () => {
        const onOk = jest.fn();
        window.instance = Dialog.alert({ children: 'Content', onOk });
        act(() => {
            jest.advanceTimersByTime(1100);
        });
        expect(document.querySelectorAll('.dialog-footer-button')).toHaveLength(1);
        expect(document.querySelectorAll('.dialog-footer-button.confirm')).toHaveLength(1);
        document.querySelector('.dialog-footer-button.confirm').click();
        expect(onOk.mock.calls).toHaveLength(1);

        const onConfirm = jest.fn();
        const onCancel = jest.fn();
        window.instance = Dialog.confirm({ children: 'Content', onOk: onConfirm, onCancel });
        act(() => {
            jest.advanceTimersByTime(1100);
        });
        expect(document.querySelectorAll('.dialog-footer-button')).toHaveLength(2);
        expect(document.querySelectorAll('.dialog-footer-button.confirm')).toHaveLength(1);
        expect(document.querySelectorAll('.dialog-footer-button.cancel')).toHaveLength(1);
        document.querySelector('.dialog-footer-button.confirm').click();
        expect(onConfirm.mock.calls).toHaveLength(1);
        document.querySelector('.dialog-footer-button.cancel').click();
        expect(onCancel.mock.calls).toHaveLength(1);
    });

});
