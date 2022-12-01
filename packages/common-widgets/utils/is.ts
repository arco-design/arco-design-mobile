const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
    return opt.call(obj) === '[object Array]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
    return opt.call(obj) === '[object Object]';
}

export function isString(obj: any): obj is string {
    return opt.call(obj) === '[object String]';
}

export function isOneOf<T>(value: T, validList: T[]) {
    return validList.indexOf(value) !== -1;
}

export function isEmptyValue(obj: any): boolean {
    return obj === undefined || obj === null || obj === '';
}

export function isFunction(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object function]';
}

export function isNull(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object null]';
}
export function isUndefined(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object undefined]';
}
export function isEmptyArray(obj: Array<unknown>): boolean {
    return isArray(obj) && !obj?.length;
}

export const isDeepEqual = (obj: any, sub: any): boolean => {
    if (typeof obj !== 'object' || typeof sub !== 'object' || obj === null || sub === null) {
        return obj === sub;
    }
    if (isFunction(obj) && isFunction(sub)) {
        return obj === sub || obj.toString() === sub.toString();
    }

    if (Object.keys(obj).length !== Object.keys(sub).length) {
        return false;
    }
    for (const key in obj) {
        if (!isDeepEqual(obj[key], sub[key])) return false;
    }
    return true;
};
