const opt = Object.prototype.toString;

/**
 * 判断一个对象是否为数组类型
 * @desc {en} Whether it is an array
 * @param {any} obj 入参
 * @param {any} obj {en} Entering
 * @returns {boolean} 返回是否为数组类型
 * @returns {boolean} {en} Returns whether it is an array type
 */
export function isArray(obj: any): obj is any[] {
    return opt.call(obj) === '[object Array]';
}

/**
 * 判断一个对象是否为对象类型
 * @desc {en} Whether it is an object
 * @param {any} obj 入参
 * @param {any} obj {en} Entering
 * @returns {boolean} 返回是否为对象类型
 * @returns {boolean} {en} Returns whether it is an object type
 */
export function isObject(obj: any): obj is { [key: string]: any } {
    return opt.call(obj) === '[object Object]';
}

/**
 * 判断一个对象是否为字符串类型
 * @desc {en} Whether it is an string
 * @param {any} obj 入参
 * @param {any} obj {en} Entering
 * @returns {boolean} 返回是否为字符串类型
 * @returns {boolean} {en} Returns whether it is an string type
 */
export function isString(obj: any): obj is string {
    return opt.call(obj) === '[object String]';
}

/**
 * 检查一个值是否在给定的有效值列表中
 * @desc {en} Checks whether a value is in the given list of valid values
 * @param {T} value 检查的值
 * @param {T} value {en} value to check
 * @param {T[]} validList 有效值列表
 * @param {T[]} validList {en} List of valid values
 * @returns {boolean} 返回要检查的值是否在有效值列表中
 * @returns {boolean} {en} Returns whether the value to be checked is in the list of valid values
 */
export function isOneOf<T>(value: T, validList: T[]) {
    return validList.indexOf(value) !== -1;
}

/**
 * 检查一个值是否为空值
 * @desc {en} Check if a value is null
 * @param {any} obj 入参
 * @param {any} obj {en} Entering
 * @returns {boolean} 返回该值是否为空值
 * @returns {boolean} {en} Returns whether the value is null
 */
export function isEmptyValue(obj: any): boolean {
    return obj === undefined || obj === null || obj === '';
}

/**
 * 检查一个值是否为函数类型
 * @desc {en} Check if a value is function
 * @param {unknown} obj 入参
 * @param {unknown} obj {en} Entering
 * @returns {boolean} 返回该值是否为函数
 * @returns {boolean} {en} Returns whether the value is function
 */
export function isFunction(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object function]';
}

/**
 * 检查一个值是否为 null
 * @desc {en} Check if a value is null
 * @param {unknown} obj 入参
 * @param {unknown} obj {en} Entering
 * @returns {boolean} 返回该值是否为 null
 * @returns {boolean} {en} Returns whether the value is null
 */
export function isNull(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object null]';
}

/**
 * 检查一个值是否为 undefined
 * @desc {en} Check if a value is undefined
 * @param {unknown} obj 入参
 * @param {unknown} obj {en} Entering
 * @returns {boolean} 返回该值是否为 undefined
 * @returns {boolean} {en} Returns whether the value is undefined
 */
export function isUndefined(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object undefined]';
}

/**
 * 检查一个值是否为空数组
 * @desc {en} Check if a value is an empty array
 * @param {Array<unknown>} obj 入参
 * @param {Array<unknown>} obj {en} Entering
 * @returns {boolean} 返回该值是否为空数组
 * @returns {boolean} {en} Returns whether the value is an empty array
 */
export function isEmptyArray(obj: Array<unknown>): boolean {
    return isArray(obj) && !obj?.length;
}

/**
 * 深比较两个对象是否相等
 * @desc {en} Check if a value is an empty array
 * @param {any} obj 要比较的第一个对象
 * @param {any} obj {en} the first object to compare
 * @param {any} obj 要比较的第二个对象
 * @param {any} obj {en} the second object to be compared
 * @returns {boolean} 返回两个对象是否相等
 * @returns {boolean} {en} Returns whether two objects are equal
 */
export function isDeepEqual(obj: any, sub: any): boolean {
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
}
