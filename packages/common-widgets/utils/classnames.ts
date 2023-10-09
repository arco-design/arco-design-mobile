/**
 * @type utils
 * @name classnames
 */
import { isArray, isObject, isString } from './is';

export type ClassNamesArg = string | string[] | { [key: string]: any } | undefined | null | boolean;

/**
 * 将传入的值转为class字符串
 * @param args 字符串，字符串数组，对象，undefined，null，boolean
 * @param args {en} string, string[], object, undefined, null, boolean
 * @returns class字符串
 * @returns {en} class string
 * @example
 * import { cls } from '@arco-design/mobile-utils';
 *
 * <div className={cls('a', 'b', { ok: true })} />
 * // result: <div class="a b ok"></div>
 */
export default function (...args: ClassNamesArg[]): string {
    const { length } = args;
    let classNames: string[] = [];
    for (let i = 0; i < length; i++) {
        const v = args[i];
        if (!v) {
            continue;
        }
        if (isString(v)) {
            classNames.push(v);
        } else if (isArray(v)) {
            classNames = classNames.concat(v);
        } else if (isObject(v)) {
            Object.keys(v).forEach(k => {
                if (v[k]) {
                    classNames.push(k);
                }
            });
        } else {
            throw new Error(
                `[classnames] Arguments must be one of string/array/object. Current value: ${
                    JSON.stringify(v) || String(v)
                }`,
            );
        }
    }
    return classNames.join(' ');
}
