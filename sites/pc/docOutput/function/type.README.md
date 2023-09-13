

------

# componentWrapper
======

## 类型

```
(Component: C, displayName: string, extra?: E) => C & E & { displayName?: string; }
```

## 源码

```

/* eslint-disable no-redeclare */
/**
 * @type utils
 * @name types
 */

function componentWrapper<C, E extends {}>(
    Component: C,
    displayName: string,
    extra?: E,
): C & E & { displayName?: string };
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|Component|\-|C|必填|
|displayName|\-|string|必填|
|extra|\-|E|-|

> 输出

无

------

# createPropsGetter

解决defaultProps不能被TS识别类型的问题

======

## 类型

```
() => <P extends Partial<DP>>(props: P) => RecomposedProps
```

## 源码

```

function createPropsGetter<DP extends object>() {
    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>;
        type RecomposedProps = DP & PropsExcludingDefaults;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return props as any as RecomposedProps;
    };
}
```

======

> 输入

无

> 输出

无
