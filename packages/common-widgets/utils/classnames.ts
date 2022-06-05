import { isArray, isObject, isString } from './is';

export type ClassNamesArg = string | string[] | { [key: string]: any } | undefined | null | boolean;

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
