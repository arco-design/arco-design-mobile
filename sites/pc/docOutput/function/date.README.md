

------

# formatDateNumber
======

## 类型

```
(value: number) => string
```

## 源码

```
function formatDateNumber(value: number) {
    return value < 10 ? `0${value}` : String(value);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|value|\-|number|必填|

> 输出

string
