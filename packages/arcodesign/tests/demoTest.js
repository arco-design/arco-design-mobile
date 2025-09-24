import React from 'react';
import { render, act } from '@testing-library/react';
import glob from 'glob';
import path from 'path';

/**
 * @function demoTest
 * @description 测试组件的 demo 是否能正确渲染
 * @param {string} comp 组件名称
 * @param {boolean} useFakeTimers 是否使用 fake timers
 * @returns {void}
 */
export default function demoTest(comp, { useFakeTimers = false } = {}) {
    describe(`${comp} demo test`, () => {
        beforeEach(() => {
            if (useFakeTimers) {
                jest.useFakeTimers();
            }
        });

        afterEach(() => {
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

                // 检查快照
                // 这里的 asFragment() 返回一个 DocumentFragment，包含了组件的渲染结果
                expect(asFragment()).toMatchSnapshot();

                // 确保在测试结束时卸载组件，避免内存泄漏
                unmount();
            });
        });
    });
}
