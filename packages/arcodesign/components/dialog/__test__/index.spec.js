import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import { getTestDemo, openMasking, testMaskingCase } from '../../masking/__test__/utils';
import Dialog from '..';
import '@testing-library/jest-dom';

demoTest('dialog', { useFakeTimers: true });

const prefix = `${defaultContext.prefixCls}-dialog`;

const maskingPrefix = `${defaultContext.prefixCls}-masking`;

function simulateClick(text) {
    expect(screen.getAllByText(text).length).toBe(1);
    userEvent.click(screen.getByText(text));
}

function hasClass(dom, className) {
    expect(dom.classList.contains(className)).toBe(true);
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
        // eslint-disable-next-line no-promise-executor-return
        const onDelay = jest.fn(() => new Promise(res => setTimeout(() => res(), 1000)));
        const TestDemo = getTestDemo(Dialog);
        render(
            <TestDemo
                maskTransitionTimeout={0}
                contentTransitionTimeout={0}
                footer={[
                    {
                        content: 'Confirm',
                        className: 'confirm',
                        onClick: onOk,
                    },
                    {
                        content: 'Disabled',
                        className: 'disabled',
                        onClick: onDisabled,
                        disabled: true,
                    },
                    {
                        content: 'Delay',
                        className: 'delay',
                        onClick: onDelay,
                    },
                ]}
            />,
        );
        // click confirm
        openMasking();
        simulateClick('Confirm');
        expect(onOk.mock.calls).toHaveLength(1);
        await jest.runAllTimers();
        expect(document.querySelector(`.${maskingPrefix}`)).not.toBeInTheDocument();
        // click disabled
        openMasking();
        simulateClick('Disabled');
        expect(onDisabled.mock.calls).toHaveLength(0);
        await jest.runAllTimers();
        expect(document.querySelector(`.${maskingPrefix}`)).toBeInTheDocument();
        // click delay
        simulateClick('Delay');
        expect(onDelay.mock.calls).toHaveLength(1);
        await jest.advanceTimersByTime(0);
        expect(document.querySelector(`.${maskingPrefix}`)).toBeInTheDocument();
        await jest.advanceTimersByTime(1000);
        jest.runAllTimers();
        expect(document.querySelector(`.${maskingPrefix}`)).not.toBeInTheDocument();
    });

    it('should set part style correctly', () => {
        const TestDemo = getTestDemo(Dialog);
        const { container: wrapper, rerender } = render(
            <TestDemo
                platform="android"
                renderFooter={() => <div className="demo-dialog-footer" />}
            />,
        );
        openMasking();
        expect(document.querySelectorAll('.demo-dialog-footer')).toHaveLength(1);
        hasClass(document.querySelector(`.${prefix}-body`), 'sub-title');
        rerender(
            <TestDemo
                title="Title"
                platform="android"
                renderFooter={() => <div className="demo-dialog-footer" />}
            />,
        );
        hasClass(document.querySelector(`.${prefix}-header`), 'left');
        hasClass(document.querySelector(`.${prefix}-body`), 'left');
        expect(document.querySelector(`.${prefix}-body`).classList.contains('sub-title')).toBe(
            false,
        );
        rerender(
            <TestDemo
                title="Title"
                platform="ios"
                renderFooter={() => <div className="demo-dialog-footer" />}
            />,
        );
        hasClass(document.querySelector(`.${prefix}-header`), 'center');
        hasClass(document.querySelector(`.${prefix}-body`), 'center');
    });

    it('should support `Dialog.alert` and `Dialog.confirm`', () => {
        const onOk = jest.fn();
        window.instance = Dialog.alert({ children: 'Content', onOk });
        jest.advanceTimersByTime(1100);
        expect(document.querySelectorAll('.dialog-footer-button')).toHaveLength(1);
        expect(document.querySelectorAll('.dialog-footer-button.confirm')).toHaveLength(1);
        document.querySelector('.dialog-footer-button.confirm').click();
        expect(onOk.mock.calls).toHaveLength(1);

        const onConfirm = jest.fn();
        const onCancel = jest.fn();
        window.instance = Dialog.confirm({ children: 'Content', onOk: onConfirm, onCancel });
        jest.advanceTimersByTime(1100);
        expect(document.querySelectorAll('.dialog-footer-button')).toHaveLength(2);
        expect(document.querySelectorAll('.dialog-footer-button.confirm')).toHaveLength(1);
        expect(document.querySelectorAll('.dialog-footer-button.cancel')).toHaveLength(1);
        document.querySelector('.dialog-footer-button.confirm').click();
        expect(onConfirm.mock.calls).toHaveLength(1);
    });
});
