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

export function handleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}

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
 * 历史逻辑问题，轻喷 _(:з」∠)_
 * @desc {en} Please ignore this weird function _(:з」∠)_
 */
export function nextTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function x = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 */
export function fingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
