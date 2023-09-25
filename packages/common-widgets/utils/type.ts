/* eslint-disable no-redeclare */
/**
 * @type utils
 * @name types
 */

/**
 * 给组件挂载可直接访问的属性，用于挂载组件名或相关子组件
 * @desc {en} Mount directly accessible attributes to the component, usually used to mount the component name or related subcomponents
 * @param Component 组件
 * @param Component {en} component
 * @param params 挂载的属性，若为string类型，则直接作为属性displayName的值
 * @param params {en} The mounted attribute, if it is of string type, is directly used as the value of the attribute displayName.
 * @param extra 额外挂载在组件上的属性，当params为string时使用
 * @param extra {en} Additional attributes mounted on the component, used when params is string
 * @returns component
 * @example
 * ```
 * import { componentWrapper } from '@arco-design/mobile-utils';
 *
 * const newComponent = componentWrapper(Component, { TestComponent })
 * ```
 */
export function componentWrapper<C, E extends {}>(
    Component: C,
    displayName: string,
    extra?: E,
): C & E & { displayName?: string };
export function componentWrapper<C, E extends {}>(Component: C, extra: E): C & E;
export function componentWrapper<C, E extends {}>(Component, params: string | E, extra?: E) {
    const Comp = Component as C & E & { displayName?: string };

    if (typeof params === 'string') {
        Comp.displayName = params;
        extra &&
            Object.keys(extra).length &&
            Object.keys(extra).forEach(key => {
                Comp[key] = extra[key];
            });
    } else {
        Object.keys(params).forEach(key => {
            Comp[key] = params[key];
        });
    }

    return Comp;
}

/**
 * 解决defaultProps不能被TS识别类型的问题
 * @desc {en} Solve the problem that defaultProps cannot be recognized by TS
 * @returns {function} 返回可被TS识别的Props的函数
 * @returns {function} {en} Function that returns Props that can be recognized by TS
 * @example
 * ```
 * import { createPropsGetter } from '@arco-design/mobile-utils';
 *
 * const propsGetter = createPropsGetter(props);
 * ```
 */
export function createPropsGetter<DP extends object>() {
    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>;
        type RecomposedProps = DP & PropsExcludingDefaults;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return props as any as RecomposedProps;
    };
}
