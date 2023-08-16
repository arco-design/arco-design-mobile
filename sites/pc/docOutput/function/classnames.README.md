

------

# classnames
======

## 类型

```
(args: ClassNamesArg[]) => string
```

## 源码

```
function (...args: ClassNamesArg[]): string {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|args|\-|ClassNamesArg\[\]|必填|

> 输出

描述：无

> ClassNamesArg

```
string|boolean|string[]|{ [key: string]: any; }
```
