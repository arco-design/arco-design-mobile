import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Toast from '..';
import Cell from '../../cell'
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { defaultContext } from '../../context-provider';

demoTest('toast');

mountTest(Toast, 'Toast');

const prefix = `${defaultContext.prefixCls}-toast`;
const iconPrefix = `${defaultContext.prefixCls}-icon`;

describe('Toast', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render default type correctly', () => {
        const onClose = jest.fn();
        window.toastInstance = Toast.toast({ content: 'Toast', onClose });
        act(() => {
            jest.advanceTimersByTime(310);
        });
        expect(document.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}`)[0].textContent).toBe('Toast');
        window.toastInstance.close();
        act(() => {
            jest.advanceTimersByTime(3100);
        });
        expect(onClose).toBeCalled();
    });
    it('should render success type correctly', () => {
        const onClose = jest.fn();
        window.toastInstance = Toast.success({ content: 'Toast', onClose });
        act(() => {
            jest.advanceTimersByTime(310);
        });
        expect(document.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}`)[0].textContent).toBe('Toast');
        expect(document.querySelectorAll(`.${iconPrefix}-success-circle`).length).toBe(1);
        window.toastInstance.close();
        act(() => {
            jest.advanceTimersByTime(3100);
        });
        expect(onClose).toBeCalled();
    });
    it('should render error type correctly', () => {
        const onClose = jest.fn();
        window.toastInstance = Toast.error({ content: 'Toast', onClose });
        act(() => {
            jest.advanceTimersByTime(310);
        });
        expect(document.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}`)[0].textContent).toBe('Toast');
        expect(document.querySelectorAll(`.${iconPrefix}-error-circle`).length).toBe(1);
        window.toastInstance.close();
        act(() => {
            jest.advanceTimersByTime(3100);
        });
        expect(onClose).toBeCalled();
    });
    it('should render warn type correctly', () => {
        const onClose = jest.fn();
        window.toastInstance = Toast.warn({ content: 'Toast', onClose });
        act(() => {
            jest.advanceTimersByTime(310);
        });
        expect(document.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}`)[0].textContent).toBe('Toast');
        expect(document.querySelectorAll(`.${iconPrefix}-warn-circle`).length).toBe(1);
        window.toastInstance.close();
        act(() => {
            jest.advanceTimersByTime(3100);
        });
        expect(onClose).toBeCalled();
    });
});
