import React from 'react';
import { render, act } from '@testing-library/react';
import glob from 'glob';
import path from 'path';

/**
 * @function demoTest
 * @description 测试组件的 demo 是否能正确渲染
 * @param {string} comp 组件名称
 * @param {boolean} useFakeTimers 是否使用 fake timers
 * @param {boolean} waitTimers 是否等待所有挂起的定时器，有一些场景下需要等待定时器执行完毕，例如用了 nextTick 或 setTimeout 等异步操作，防止 unmount 后仍然执行代码而报错
 * @returns {void}
 */
export default function demoTest(comp, { useFakeTimers = false, waitTimers = false } = {}) {
    describe(`${comp} demo test`, () => {
        beforeEach(() => {
            if (useFakeTimers) {
                jest.useFakeTimers();
            }
        });

        afterEach(() => {
            // 如果设置了 waitTimers，运行所有挂起的定时器
            if (waitTimers) {
                act(() => jest.runAllTimers());
                jest.clearAllTimers();
            }
            // 如果使用了 fake timers，确保在测试结束时清除定时器
            if (useFakeTimers) {
                jest.useRealTimers();
            }
        });

        const files = glob.sync(path.resolve(__dirname, `../components/${comp}/demo/*.md`));
        files.forEach(file => {
            const filename = file.split('/').slice(-1)[0];
            it(`${comp} demo: ${filename} renders correctly`, () => {
                const demo = require(file).default;
                const { asFragment, unmount } = render(React.createElement(demo));

                // 如果使用了 fake timers，并且需要等待定时器，运行所有挂起的定时器
                if (useFakeTimers && waitTimers) {
                    act(() => jest.runAllTimers());
                }

                // 检查快照
                // 这里的 asFragment() 返回一个 DocumentFragment，包含了组件的渲染结果
                expect(asFragment()).toMatchSnapshot();

                // 确保在测试结束时卸载组件，避免内存泄漏
                unmount();
            });
        });
    });
}
