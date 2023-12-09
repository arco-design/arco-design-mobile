### mixin-var GeneralMixinVars

------

# .rem

根据 base-font-size，设置单位尺寸为 rem

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

根据 base-font-size，设置常规模式和 rtl 模式下单位尺寸为 rem

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

当 less 变量 use-dark-mode=1 时，自定义暗黑模式样式规则

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
        @{arco-dark-mode-selector} & {
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

为属性设置 arco 提供的 token 变量

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
     .use-var(background, primary-color);
     .use-var(border, primary-color, 1px solid);
     .use-var(border, cell-border-width, '', solid black);
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

在常规模式和 rtl 模式下为属性设置 arco 提供的 token 变量

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
|@property|css 属性名|string|必填|
|@variables|token 变量名|string|必填|
|@preValues|\-|string|-|
|@nextValues|\-|string|-|

------

# .hairline-var

0.5px 的边框线

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
|@color|使用 css 变量为线设置颜色|string|必填|
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
|@color|使用 css 变量设置加粗的字体颜色，默认继承文字当前颜色|string|currentColor|
|@stroke|字体粗细，默认 0\.3px|string|0.3PX|

------

# .onepx-border-var

1px 边框

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
|@borderColor|使用 css 变量设置边框颜色|string|必填|
|@borderRadius|border\-radius，默认为 0|number|0|
|@borderWidth|border\-width，默认为 1px|string|1PX|
|@borderStyle|border\-style，默认为 solid|string|solid|

------

# .hairline-bottom-right-var

元素右下 0.5px 边框

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
|@color|使用 css 变量设置边框颜色|string|必填|

------

# .hairline-top-left-var

元素左上 0.5px 边框

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
|@color|使用 css 变量设置边框颜色|string|必填|

------

# .set-loading-color-var

设置 Loading 组件颜色

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
|@color|使用 css 变量设置颜色|string|必填|

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
|@size|使用 css 变量设置最小字号|string|必填|
|@scale|设置最小字号下文字缩放比例，默认为 0\.9|string|0.9|

------

# .set-content-box-width-var

设置 content-box 盒模型下元素宽度

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
|@property|css 属性名|string|必填|
|@width|元素总宽度，包含内边距|string|必填|
|@padding-left|左侧内边距|string|必填|
|@padding-right|右侧内边距|string|必填|

------

# .set-steps-color-var

设置 Steps 组件颜色

======

## 示例

```
@import '@arco-design/mobile-react/style/mixin.less';
.demo {
    .set-steps-color-var(primary-color, lighter-primary-color);
}
```

## 源码

```
.set-steps-color-var(@color, @finish-color) {
    .set-steps-color(@@color, @@finish-color);
    & when (@use-css-vars = 1) {
        .set-steps-color(var(~"--@{color}", @@color), var(~"--@{finish-color}", @@finish-color));
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|使用 css 变量设置主颜色|string|必填|
|@finish-color|使用 css 变量设置已完成步骤的颜色|string|必填|
