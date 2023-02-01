/* eslint-disable no-redeclare */
/**
 * @type utils
 * @name types
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
 */
export function createPropsGetter<DP extends object>() {
    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>;
        type RecomposedProps = DP & PropsExcludingDefaults;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return props as any as RecomposedProps;
    };
}
