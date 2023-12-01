

------

# componentWrapper
======

## 示例

```
import { componentWrapper } from '@arco-design/mobile-utils';
import Group from './group';
const NewComponent1 = componentWrapper(Component, { Group });
// usage: <NewComponent1.Group />
const NewComponent2 = componentWrapper(Component, 'ComponentName');
// usage: NewComponent2.displayName is 'ComponentName'
```

## 类型

```
(Component: any, params: string | E, extra?: E | undefined) => C & E & { displayName?: string | undefined; }
```

## 源码

```
function componentWrapper<C, E extends {}>(Component, params: string | E, extra?: E) {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|Component|组件|any|必填|
|params|挂载的属性，若为string类型，则直接作为属性displayName的值|string \| E|必填|
|extra|额外挂载在组件上的属性，当params为string时使用|E \| undefined|-|

> 输出

component

------

# createPropsGetter

解决defaultProps不能被TS识别类型的问题

======

## 示例

```
import { createPropsGetter } from '@arco-design/mobile-utils';
const propsGetter = createPropsGetter(props);
```

## 类型

```
() => function
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

{function} 返回可被TS识别的Props的函数
