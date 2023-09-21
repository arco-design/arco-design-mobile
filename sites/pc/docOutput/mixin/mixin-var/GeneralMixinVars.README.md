### mixin-var GeneralMixinVars

------

# .rem

根据base-font-size，设置单位尺寸为rem

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
     .rem(font-size, 14);
     .rem(padding, 16, 0);
}
```

## 源码

```
.rem(@property; @values...) {
    @{property}: ~`(function () {
        var baseFontSize=@{base-font-size};
        var sizeList = @{values};
        if (!Array.isArray(sizeList)) {
            sizeList = [sizeList];
        }
        return sizeList.map(function (item) {
            return pxtorem(item);
        }).join(' ');
    }())`;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|css属性名|string|必填|
|@values|css属性值，如果为复合属性，值可以用逗号分隔开|string|-|

------

# .rem-with-rtl

根据base-font-size，设置常规模式和rtl模式下单位尺寸为rem

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
     .rem-with-rtl(font-size, 14);
     .rem-with-rtl(padding, 16, 0);
}
```

## 源码

```
.rem-with-rtl(@property; @values...) {
    .rem(@property; @values...);
    [dir="rtl"] & {
        @{property}: initial;
        @new-property: .prop-with-rtl(@property)[@property-name];
        .rem(@new-property; @values...);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|css属性名|string|必填|
|@values|css属性值，如果为复合属性，值可以用逗号分隔开|string|-|

------

# .use-dark-mode-query

当less变量use-dark-mode=1时，为原生暗黑模式媒体查询事件prefers-color-scheme:dark绑定对应css规则

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
     .use-dark-mode-query({
         background-color: #000;
     });
}
```

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
|@rules|对应的暗黑模式规则|string|必填|

------

# .use-var

为属性设置arco提供的token变量

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
@border-width: 1px;
.demo {
     .use-var(background, primary-color);
     .use-var(background, primary-color, 1px solid);
     .use-var(background, @border-width:, solid black);
}
```

## 源码

```
.use-var(@property, @variables, @preValues: '', @nextValues: '') {
    @{property}: ~"@{preValues}" @@variables ~"@{nextValues}";
    & when (@use-css-vars = 1) {
        @{property}: ~"@{preValues}" ~"var(--@{variables})" ~"@{nextValues}";
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|css属性名|string|必填|
|@variables|token变量名|string|必填|
|@preValues|复合属性css变量前缀|string|-|
|@nextValues|复合属性css变量后缀|string|-|

------

# .use-var-with-rtl

在常规模式和rtl模式下为属性设置arco提供的token变量

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
     .use-var-with-rtl(margin-left, button-icon-text-gutter);
}
```

## 源码

```
.use-var-with-rtl(@property, @variables, @preValues: '', @nextValues: '') {
    .use-var(@property, @variables, @preValues, @nextValues);
    [dir="rtl"] & {
        @{property}: initial;
        @new-property: .prop-with-rtl(@property)[@property-name];
        .use-var(@new-property, @variables, @preValues, @nextValues);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|css属性名|string|必填|
|@variables|token变量名|string|必填|
|@preValues|\-|string|-|
|@nextValues|\-|string|-|

------

# .hairline-var

0.5px的边框线

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
     .hairline-var(line-color);
     .hairline-var(line-color, top);
}
```

## 源码

```
.hairline-var(@color, @direction: all) {
    .hairline(@@color, @direction);
    & when (@use-css-vars = 1) {
        .hairline(var(~"--@{color}", @@color), @direction);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|使用css变量为线设置颜色|string|必填|
|@direction|边框方向，默认为全部方向|string|all|

------

# .text-medium-var

字体加粗

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .text-medium-var();
    .text-medium-var(primary-color, 0.5PX);
}
```

## 源码

```
.text-medium-var(@color: currentColor, @stroke: 0.3PX) {
    .text-medium(@@color, @stroke);
    & when (@use-css-vars = 1) {
        .text-medium(var(~"--@{color}", @@color), @stroke);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|使用css变量设置加粗的字体颜色，默认继承文字当前颜色|string|currentColor|
|@stroke|字体粗细，默认0\.3px|string|0.3PX|

------

# .onepx-border-var

1px边框

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .onepx-border-var(top, line-color);
    .onepx-border-var(all, line-color, 2, 2px, dashed);
}
```

## 源码

```
.onepx-border-var(@direction, @borderColor, @borderRadius: 0, @borderWidth: 1PX, @borderStyle: solid) {
    .onepx-border(@direction, @@borderColor, @borderRadius, @borderWidth, @borderStyle);
    & when (@use-css-vars = 1) {
        .onepx-border(@direction, var(~"--@{borderColor}", @@borderColor), @borderRadius, @borderWidth, @borderStyle);
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@direction|边框方向|string|必填|
|@borderColor|使用css变量设置边框颜色|string|必填|
|@borderRadius|border\-radius，默认为0|number|0|
|@borderWidth|border\-width，默认为1px|string|1PX|
|@borderStyle|border\-style，默认为solid|string|solid|

------

# .hairline-bottom-right-var

元素右下0.5px边框

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .hairline-bottom-right-var(line-color);
}
```

## 源码

```
.hairline-bottom-right-var(@color) {
    .hairline-bottom-right(@@color);
    & when (@use-css-vars = 1) {
        .hairline-bottom-right(var(~"--@{color}", @@color));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|使用css变量设置边框颜色|string|必填|

------

# .hairline-top-left-var

元素左上0.5px边框

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .hairline-top-left-var(line-color);
}
```

## 源码

```
.hairline-top-left-var(@color) {
    .hairline-top-left(@@color);
    & when (@use-css-vars = 1) {
        .hairline-top-left(var(~"--@{color}", @@color));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|使用css变量设置边框颜色|string|必填|

------

# .set-loading-color-var

设置Loading组件颜色

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .set-loading-color-var(primary-color);
}
```

## 源码

```
.set-loading-color-var(@color) {
    .set-loading-color(@@color);
    & when (@use-css-vars = 1) {
        .set-loading-color(var(~"--@{color}", @@color));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|使用css变量设置颜色|string|必填|

------

# .set-font-size-var

设置最小字号

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .set-font-size-var(badge-font-size);
    .set-font-size-var(badge-font-size, 0.5);
}
```

## 源码

```
.set-font-size-var(@size, @scale: 0.9) {
    & when not (@use-css-vars = 1) {
        .set-font-size(@@size);
    }
    & when (@use-css-vars = 1) {
        & when (@@size < 12PX) {
            font-size: calc(var(~"--@{size}", @@size) / @scale);
            transform: scale(@scale);
        }
        & when not (@@size < 12PX) {
            font-size: var(~"--@{size}", @@size);
        }
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@size|使用css变量设置最小字号|string|必填|
|@scale|设置最小字号下文字缩放比例，默认为0\.9|string|0.9|

------

# .set-content-box-width-var

设置content-box盒模型下元素宽度

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .set-content-box-width-var(min-width, badge-text-width, badge-text-padding-left, badge-text-padding-right);
}
```

## 源码

```
.set-content-box-width-var(@property, @width, @padding-left, @padding-right) {
    & when not (@use-css-vars = 1) {
        .set-content-box-width(@property, @@width, @@padding-left, @@padding-right);
    }
    & when (@use-css-vars = 1) {
        @{property}: calc(var(~"--@{width}", @@width) - var(~"--@{padding-left}", @@padding-left) - var(~"--@{padding-right}", @@padding-right));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|css属性名|string|必填|
|@width|元素总宽度，包含内边距|string|必填|
|@padding-left|左侧内边距|string|必填|
|@padding-right|右侧内边距|string|必填|
