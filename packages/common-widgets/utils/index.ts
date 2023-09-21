/**
 * @type utils
 * @name utils
 */

export { default as cls } from './classnames';
export * from './dom';
export * from './is';
export * from './type';
export * from './color';
export * from './browser';
export * from './locale';
export * from './date';
export * from './validator';

/**
 * 给值带上 px 的单位，有单位的值直接返回
 * @desc {en} Add the unit of px to the number, and return it directly if there is a unit.
 * @param {number | string} value 需要设置的值
 * @param {number | string} value {en} The value that needs to be set
 * @returns {string} 返回带有单位的值
 * @returns {string} {en} Returns a value with units
 */
export function handleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}

/**
 * 基于给定的过滤函数返回一个过滤后的数组
 * @desc {en} Returns a filtered array based on the given filter function
 * @param {T[]} data 数据数组
 * @param {T[]} data {en} data array
 * @param {Function} filterFn 过滤函数
 * @param {Function} filterFn {en} filter function
 * @param {Object} options 可选对象
 * @param {Object} options {en} Optional object
 * @returns {string} 过滤后的数组
 * @returns {string} filtered array
 */
export function arrayTreeFilter<T>(
    data: T[],
    filterFn: (item: T, level: number) => boolean,
    options?: {
        childrenKeyName?: string;
        fallbackChildIndex?: number;
    },
) {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || 'children';
    let children = data || [];
    const result: T[] = [];
    let level = 0;

    do {
        let foundItem: T | undefined = children.find(item => filterFn(item, level));
        if (!foundItem && options.fallbackChildIndex !== undefined) {
            foundItem = children[options.fallbackChildIndex];
        }
        if (!foundItem) {
            break;
        }
        result.push(foundItem);
        children = (foundItem as any)[options.childrenKeyName] || [];
        level += 1;
    } while (children.length > 0);
    return result;
}

/**
 * 使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计算得到的新值
 * @desc {en} When the ease-out method is used, the new value calculated according to the easing function is returned within a given time.
 * @param {number} elapsed 持续时间
 * @param {number} elapsed {en} duration
 * @param {number} initialValue 初始值
 * @param {number} initialValue {en} initial value
 * @param {number} amountOfChange 变动系数
 * @param {number} amountOfChange {en} coefficient of variation
 * @param {number} duration 持续时间
 * @param {number} duration {en} duration
 * @returns {number} 返回在给定时间内根据缓动函数计算得到的新值
 * @returns {number} {en} Returns the new value calculated from the easing function within the given time
 */
export function easeOutCubic(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return amountOfChange * (newElapsed * newElapsed * newElapsed + 1) + initialValue;
}

/**
 * 在下一个事件循环周期执行给定的函数
 * @desc {en} Execute the given function on the next event loop cycle
 * @param {Function} func 执行的函数
 * @param {Function} func {en} function executed
 */
export function nextTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function x = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 * @param {number} x 元素位移
 * @param {number} x {en} element displacement
 * @param {[number, number] | number} damping 阻尼参数
 * @param {[number, number] | number} damping {en} Damping parameters
 * @returns {number} 返回需要滑动的距离
 * @returns {number} {en} Return the distance required to slide
 */
export function fingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
