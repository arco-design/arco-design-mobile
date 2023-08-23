### mixin 公共mixin

------

# .rem

格式化文本，保留指定行数文本，溢出时使用...

======

## 示例

```
.text-overflow(2);

```

## 源码

```
测试一下
.rem(@property; @values...) {
    @{property}: ~`(
            function () {var baseFontSize= @{base-font-size}; var sizeList = @{values}; if (
                    !Array.isArray(sizeList)
                ) {sizeList = [sizeList];} return sizeList.map(
                    function (item) {return pxtorem(item) ;}
                ) .join(' ') ; }()
        )
        `;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|\-|string|必填|
|@values|\-|string|-|

------

# .rem-with-rtl
======

## 源码

```
.rem-with-rtl(@property; @values...) {
    .rem(@property; @values...);
    [dir='rtl'] & {
        @{property}: initial;
        @new-property: .prop-with-rtl(@property) [ @property-name];
        .rem(@new-property; @values...);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|\-|string|必填|
|@values|\-|string|-|

------

# .use-dark-mode-query
======

## 源码

```
.use-dark-mode-query(@rules) {
    & when (@use-dark-mode = 1) {
        @media (prefers-color-scheme: dark) {
            @rules();
        }
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@rules|\-|string|必填|

------

# .use-var
======

## 源码

```
.use-var(@property, @variables, @preValues: '', @nextValues: '') {
    @{property}: ~'@{preValues}' @@variables ~'@{nextValues}';
    & when (@use-css-vars = 1) {
        @{property}: ~'@{preValues}' ~'var(--@{variables})' ~'@{nextValues}';
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|\-|string|必填|
|@variables|\-|string|必填|
|@preValues|\-|string|-|
|@nextValues|\-|string|-|

------

# .use-var-with-rtl
======

## 源码

```
.use-var-with-rtl(@property, @variables, @preValues: '', @nextValues: '') {
    .use-var(@property, @variables, @preValues, @nextValues);
    [dir='rtl'] & {
        @{property}: initial;
        @new-property: .prop-with-rtl(@property) [ @property-name];
        .use-var(@new-property, @variables, @preValues, @nextValues);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|\-|string|必填|
|@variables|\-|string|必填|
|@preValues|\-|string|-|
|@nextValues|\-|string|-|

------

# .hairline-var
======

## 源码

```
.hairline-var(@color, @direction: all) {
    .hairline(@@color, @direction);
    & when (@use-css-vars = 1) {
        .hairline(var(~'--@{color}', @@color), @direction);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|\-|string|必填|
|@direction|\-|string|all|

------

# .text-medium-var
======

## 源码

```
.text-medium-var(@color: currentColor, @stroke: 0.3px) {
    .text-medium(@@color, @stroke);
    & when (@use-css-vars = 1) {
        .text-medium(var(~'--@{color}', @@color), @stroke);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|\-|string|currentColor|
|@stroke|\-|string|0.3px|

------

# .onepx-border-var
======

## 源码

```
.onepx-border-var(@direction, @borderColor, @borderRadius: 0, @borderWidth: 1px, @borderStyle: solid) {
    .onepx-border(@direction, @@borderColor, @borderRadius, @borderWidth, @borderStyle);
    & when (@use-css-vars = 1) {
        .onepx-border(@direction, var(~'--@{borderColor}', @@borderColor), @borderRadius, @borderWidth, @borderStyle);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@direction|\-|string|必填|
|@borderColor|\-|string|必填|
|@borderRadius|\-|number|0|
|@borderWidth|\-|string|1px|
|@borderStyle|\-|string|solid|

------

# .hairline-bottom-right-var
======

## 源码

```
.hairline-bottom-right-var(@color) {
    .hairline-bottom-right(@@color);
    & when (@use-css-vars = 1) {
        .hairline-bottom-right(var(~'--@{color}', @@color));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|\-|string|必填|

------

# .hairline-top-left-var
======

## 源码

```
.hairline-top-left-var(@color) {
    .hairline-top-left(@@color);
    & when (@use-css-vars = 1) {
        .hairline-top-left(var(~'--@{color}', @@color));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|\-|string|必填|

------

# .set-loading-color-var
======

## 源码

```
.set-loading-color-var(@color) {
    .set-loading-color(@@color);
    & when (@use-css-vars = 1) {
        .set-loading-color(var(~'--@{color}', @@color));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|\-|string|必填|

------

# .set-font-size-var
======

## 源码

```
.set-font-size-var(@size, @scale: 0.9) {
    & when not (@use-css-vars = 1) {
        .set-font-size(@@size);
    }
    & when (@use-css-vars = 1) {
        & when (@@size < 12px) {
            font-size: calc(var(~'--@{size}', @@size) / @scale);
            transform: scale(@scale);
        }
        & when not (@@size < 12px) {
            font-size: var(~'--@{size}', @@size);
        }
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@size|\-|string|必填|
|@scale|\-|string|0.9|

------

# .set-content-box-width-var
======

## 源码

```
.set-content-box-width-var(@property, @width, @padding-left, @padding-right) {
    & when not (@use-css-vars = 1) {
        .set-content-box-width(@property, @@width, @@padding-left, @@padding-right);
    }
    & when (@use-css-vars = 1) {
        @{property}: calc(
            var(~'--@{width}', @@width) - var(~'--@{padding-left}', @@padding-left) -
                var(~'--@{padding-right}', @@padding-right)
        );
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|\-|string|必填|
|@width|\-|string|必填|
|@padding-left|\-|string|必填|
|@padding-right|\-|string|必填|
