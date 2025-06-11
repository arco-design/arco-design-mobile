import React from 'react';
import { render, act } from '@testing-library/react';
import glob from 'glob';
import path from 'path';

export default function demoTest(comp, { useFakeTimers = false } = {}) {
    describe(`${comp} demo test`, () => {
        beforeEach(() => {
            if (useFakeTimers) {
                jest.useFakeTimers();
            }
        });

        afterEach(() => {
            if (useFakeTimers) {
                act(() => jest.runAllTimers());
                jest.clearAllTimers();
                jest.useRealTimers();
            }
        });

        const files = glob.sync(path.resolve(__dirname, `../components/${comp}/demo/*.md`));
        files.forEach(file => {
            const filename = file.split('/').slice(-1)[0];
            it(`${comp} demo: ${filename} renders correctly`, () => {
                const demo = require(file).default;
                const { asFragment, unmount } = render(React.createElement(demo));

                // 如果使用了 fake timers，需要运行所有挂起的定时器
                if (useFakeTimers) {
                    act(() => jest.runAllTimers());
                }

                // 检查快照
                // 这里的 asFragment() 返回一个 DocumentFragment，包含了组件的渲染结果
                expect(asFragment()).toMatchSnapshot();

                // 确保在测试结束时卸载组件，避免内存泄漏
                unmount();

                // 再次清理剩余的定时器
                if (useFakeTimers) {
                    act(() => jest.runAllTimers());
                    jest.clearAllTimers();
                }
            });
        });
    });
}
