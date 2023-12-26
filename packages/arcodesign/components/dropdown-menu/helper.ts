import React from 'react';
import { isArray } from '@arco-design/mobile-utils';
import { OptionsItem } from '../dropdown';
import { CascadeOptions, ValueType } from './type';

/**
 * 判断是否为string数组
 * @en Determine whether it is a string array
 * */
export function isStringArray(
    options: string[] | OptionsItem[][] | CascadeOptions[],
): options is string[] {
    return typeof options[0] === 'string';
}

/**
 * 判断是否为嵌套数组
 * @en Determine if it is a nested array
 * */
export function isCascadeArray(
    options: string[] | OptionsItem[][] | CascadeOptions[],
): options is CascadeOptions[] {
    return typeof options[0] === 'object' && !isArray(options[0]);
}

/**
 * 格式化传入的数组
 * @en format the input array
 * @param {OptionsItem[][] | string[] | CascadeOptions[]} options 上层传入的选择项数组
 * @param {OptionsItem[][] | string[] | CascadeOptions[]} options {en} Array of options from the upper layer
 * @param {ValueType} currentValues Current selected value
 * */
export const getFormattedOptions = (
    options: OptionsItem[][] | string[] | CascadeOptions[],
    currentValues: ValueType,
) => {
    const values = [...currentValues];
    const formattedOptions: Array<OptionsItem[]> = [];
    if (isStringArray(options)) {
        /**
         * 如果传入的是简单的字符串数组
         * @en If is a simple array of strings
         *  */
        formattedOptions.push(
            options.map((op, index) => ({ label: op, value: index, disabled: false })),
        );
    } else if (isCascadeArray(options)) {
        let ops = options;
        let i = 0;
        while (ops) {
            formattedOptions.push(
                ops.map(item => ({
                    ...item,
                    disabled: item.disabled || false,
                })),
            );
            let temp;
            const val = values[i];
            const valIndex = ops.findIndex(op => op.value === val);
            if (valIndex > -1) {
                temp = ops[valIndex].children;
            } else {
                temp = ops[0].children;
                values[i] = ops[0].value;
            }
            i++;
            ops = temp;
        }
    } else {
        formattedOptions.push(...options);
    }
    return {
        formattedOptions,
        formattedValue: values,
    };
};

/**
 * 判断是否为指定ref内的元素
 * @en Determine whether it is an element within the specified ref
 */
export const isRefDom = (dom, ref: React.RefObject<HTMLDivElement>) => {
    const refDom = ref.current;
    if (!refDom || !dom) return false;
    return refDom.contains(dom);
};

/**
 * 判断是否为指定类名下的元素
 * @en Determine whether it is an element under the specified classname
 */
export const isClassNameDom = (dom, className: string) => {
    if (!dom) return false;
    let tempEl = dom;
    while (tempEl) {
        if (tempEl.classList.value.indexOf(className) > -1) {
            return true;
        }
        tempEl = tempEl.parentNode;
    }
    return false;
};
