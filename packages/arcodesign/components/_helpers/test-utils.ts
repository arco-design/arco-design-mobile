import React, { useEffect, useRef } from 'react';
import { Promise as ES6Promise, Promise } from 'es6-promise';

/**
 * React 19 兼容的 act 包装器
 * 用于包装可能触发状态更新的异步操作
 */
export const actWrapper = (callback: () => void | ES6Promise<void>): ES6Promise<void> => {
    return new ES6Promise<void>((resolve, reject) => {
        try {
            // 尝试使用 react-dom/test-utils 的 act
            const testUtils = require('react-dom/test-utils');
            if (testUtils && typeof testUtils.act === 'function') {
                // 对于同步回调
                if (typeof callback === 'function') {
                    try {
                        const result = callback();
                        if (result && typeof result.then === 'function') {
                            testUtils
                                .act(() => result)
                                .then(() => resolve())
                                .catch(reject);
                        } else {
                            testUtils.act(() => {
                                callback();
                            });
                            resolve();
                        }
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    resolve();
                }
            } else {
                const result = callback();
                if (result && typeof result.then === 'function') {
                    result.then(() => resolve()).catch(reject);
                } else {
                    resolve();
                }
            }
        } catch (error) {
            // 如果 act 不可用，直接执行回调
            try {
                const result = callback();
                if (result && typeof result.then === 'function') {
                    result.then(() => resolve()).catch(reject);
                } else {
                    resolve();
                }
            } catch (callbackError) {
                reject(callbackError);
            }
        }
    });
};

/**
 * 清理未处理的异步操作，防止内存泄漏警告
 */
export const cleanupAsync = (): ES6Promise<void> => {
    return new ES6Promise<void>(resolve => {
        setTimeout(() => resolve(), 0);
    });
};

/**
 * 安全的状态更新，检查组件是否已卸载
 */
export const createSafeStateUpdater = (isMountedRef: React.MutableRefObject<boolean>) => {
    return (updater: () => void) => {
        if (isMountedRef.current) {
            updater();
        }
    };
};

/**
 * 用于测试的 useEffect 清理函数
 */
export const useTestCleanup = (cleanupFn: () => void) => {
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            cleanupFn();
        };
    }, [cleanupFn]);

    return isMountedRef;
};
