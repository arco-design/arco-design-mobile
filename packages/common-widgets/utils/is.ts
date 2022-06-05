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
