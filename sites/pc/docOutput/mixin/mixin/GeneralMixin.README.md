### mixin GeneralMixin

------

# .text-overflow

文本溢出，支持1行/多行文本

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo1{
   .text-overflow();
}
.demo2 {
   .text-overflow(2);
}
```

## 源码

```
.text-overflow(@lines:1) when (@lines = 1) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.text-overflow(@lines) when (@lines > 1) {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: @lines;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    white-space: normal;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@lines|最大展示行数，默认为1行|number|1|

------

# .noselect

禁用用户选择文本

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
   .noselect();
}
```

## 源码

```
.noselect() {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;           /* Non-prefixed version, currently*/
}
```

======

> 输入

无

------

# .full-screen

全屏布局

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
   .full-screen();
}
```

## 源码

```
.full-screen() {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

======

> 输入

无

------

# .text-medium

文本加粗，兼容安卓设备

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo1 {
   .text-medium();
}
.demo2 {
   .text-medium(#fff, 0.5px);
}
```

## 源码

```
.text-medium(@color: currentColor, @stroke: 0.3PX) {
    font-weight: bold;
    .android &,
    &.android,
    &.system-android {
        font-weight: 400;
        -webkit-text-stroke: @stroke @color;
        text-stroke: @stroke @color;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|文本颜色，默认为currentColor|string|currentColor|
|@stroke|文本字符笔触宽度，默认为0\.3PX|string|0.3PX|

------

# .remove-text-medium

消除文本加粗样式，兼容安卓设备

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
   .remove-text-medium();
}
```

## 源码

```
.remove-text-medium() {
    font-weight: normal;
    .android &,
    &.android,
    &.system-android {
        font-weight: normal;
        -webkit-text-stroke: 0;
        text-stroke: 0;
    }
}
```

======

> 输入

无

------

# .onepx-border

1px(物理像素)边框

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
   .onepx-border();
}
```

## 源码

```
.onepx-border(@direction, @borderColor: inherit, @borderRadius: 0, @borderWidth: 1PX, @borderStyle: solid) {
    position: relative;
    border-width: 0;

    @onepx-border-map: {
        @all: {
            @x: left;
            @y: top;
            @scale: scale;
            @border: ~"-";
            @width: 100%;
            @height: 100%;
        }
        @top: {
            @x: left;
            @y: top;
            @scale: scaleY;
            @border: -top-;
            @width: 100%;
            @height: @borderWidth;
        }
        @bottom: {
            @x: left;
            @y: bottom;
            @scale: scaleY;
            @border: -bottom-;
            @width: 100%;
            @height: @borderWidth;
        }
        @left: {
            @x: left;
            @y: top;
            @scale: scaleX;
            @border: -left-;
            @width: @borderWidth;
            @height: 100%;
        }
        @right: {
            @x: right;
            @y: top;
            @scale: scaleX;
            @border: -right-;
            @width: @borderWidth;
            @height: 100%;
        }
    }

    .set-onepx-content() {
        @map: @onepx-border-map[@@direction];
        @x: @map[@x];
        @y: @map[@y];
        @scale: @map[@scale];
        @border: @map[@border];
        @width: @map[@width];
        @height: @map[@height];

        content: '';
        width: @width;
        height: @height;
        position: absolute;
        @{x}: 0;
        @{y}: 0;
        z-index: 1;
        border@{border}style: @borderStyle;
        border@{border}width: @borderWidth;
        border@{border}color: @borderColor;
        box-sizing: border-box;
        transform-origin: @x @y;
        -webkit-transform-origin: @x @y;
        pointer-events: none;
        border-radius: @borderRadius;
        @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
            & when (@direction = all) {
                width: 200%;
                height: 200%;
            }
            transform: ~"@{scale}(0.5)";
            -webkit-transform: ~"@{scale}(0.5)";
            border-radius: @borderRadius * 2;
        }
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            & when (@direction = all) {
                width: 300%;
                height: 300%;
            }
            transform: ~"@{scale}(0.33333333)";
            -webkit-transform: ~"@{scale}(0.33333333)";
            border-radius: @borderRadius * 3;
        }
    }

    & when (@direction = all), (@direction = bottom), (@direction = right) {
        &::after {
            .set-onepx-content();
        }
    }
    & when (@direction = top), (@direction = left) {
        &::before {
            .set-onepx-content();
        }
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@direction|边框方向|string|必填|
|@borderColor|边框颜色，默认inherit|string|inherit|
|@borderRadius|边框圆角，默认0|number|0|
|@borderWidth|边框宽度，默认1px|string|1PX|
|@borderStyle|边框样式，默认solid|string|solid|

------

# @border-map
======

## 源码

```
@border-map: {
    @bottom: {
        @x: 0;
        @y: -1PX;
        @spread: 0;
    }
    @top: {
        @x: 0;
        @y: 1PX;
        @spread: 0;
    }
    @right: {
        @x: -1PX;
        @y: 0;
        @spread: 0;
    }
    @left: {
        @x: 1PX;
        @y: 0;
        @spread: 0;
    }
    @all: {
        @x: 0;
        @y: 0;
        @spread: 1PX;
    }
}
```

======

> 输入

无

------

# .hairline

0.5px的边框线

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo1 {
     .hairline(#000);
}
.demo2 {
     .hairline(#000, top);
}
```

## 源码

```
.hairline(@color, @direction: all) {
    // 因为 Android/PC 不一定支持 0.5px border width
    box-shadow: @border-map[@@direction][@x] @border-map[@@direction][@y] 0 @border-map[@@direction][@spread] @color inset;

    @media (min-resolution: 2dppx) {
        box-shadow: (@border-map[@@direction][@x]/2) (@border-map[@@direction][@y]/2) 0 (@border-map[@@direction][@spread]/2) @color inset;
    }

    // 因为 iOS 目前不支持 0.5px shadow offset/spread width
    .ios &,
    &.ios {
        box-shadow: none;

        & when (@direction = all) {
            border: 0.5PX solid @color;
        }

        & when not (@direction = all) {
            border-@{direction}: 0.5PX solid @color;
        }
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|边框颜色|string|必填|
|@direction|边框方向，默认为全部方向|string|all|

------

# .remove-hairline

移除0.5px的边框线

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
     .remove-hairline(all);
}
```

## 源码

```
.remove-hairline(@direction: all) {
    box-shadow: none;
    @media (min-resolution: 2dppx) {
        box-shadow: none;
    }
    .ios &,
    &.ios {
        box-shadow: none;
        & when (@direction = all) {
            border: 0;
        }
        & when not (@direction = all) {
            border-@{direction}: 0;
        }
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@direction|边框方向，默认为全部方向|string|all|

------

# .hairline-bottom-right

元素右下 0.5px border

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
     .hairline-bottom-right(#000);
}
```

## 源码

```
.hairline-bottom-right(@color) {
    box-shadow: -1PX -1PX 0 0 @color inset;
    @media (min-resolution: 2dppx) {
        box-shadow: -0.5PX -0.5PX 0 0 @color inset;
    }
    .ios &, &.ios {
        box-shadow: none;
        border-right: 0.5PX solid @color;
        border-bottom: 0.5PX solid @color;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|边框颜色|string|必填|

------

# .hairline-top-left

元素左上 0.5px border

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
     .hairline-top-left(#000);
}
```

## 源码

```
.hairline-top-left(@color) {
    box-shadow: 1PX 1PX 0 0 @color inset;
    @media (min-resolution: 2dppx) {
        box-shadow: 0.5PX 0.5PX 0 0 @color inset;
    }
    .ios &, &.ios {
        box-shadow: none;
        border-top: 0.5PX solid @color;
        border-left: 0.5PX solid @color;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|边框颜色|string|必填|

------

# .prop-with-rtl

输入涉及左右相关的属性名，获取方向相反的属性名，可用于处理rtl模式

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
   @a: .prop-with-rtl(margin-left)[@property-name]; // @a 变量值为margin-right
}
```

## 源码

```
.prop-with-rtl(@origin-property) {
    @property-map: {
        @left: right;
        @right: left;
        @margin-left: margin-right;
        @margin-right: margin-left;
        @padding-left: padding-right;
        @padding-right: padding-left;
        @border-right: border-left;
        @border-left: border-right;
        @border-top-left-radius: border-top-right-radius;
        @border-bottom-left-radius: border-bottom-right-radius;
        @border-top-right-radius: border-top-left-radius;
        @border-bottom-right-radius: border-bottom-left-radius;
    }
    @property-name: @property-map[@@origin-property];
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@origin-property|css属性名|string|必填|

------

# .set-prop-with-rtl

设置涉及左右相关的属性名，在rtl模式下自动替换为相反的属性名

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
   .set-prop-with-rtl(right, auto);
}
```

## 源码

```
.set-prop-with-rtl(@property, @value, @rules: {
    @{property}: initial;
}) {
    @{property}: @value;
    [dir="rtl"] & {
        @rules();
        @new-property: .prop-with-rtl(@property)[@property-name];
        @{new-property}: @value;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|css属性名|string|必填|
|@value|css属性值|string|必填|
|@rules|自定义的复写规则，默认重置为initial|string|-|

------

# .set-value-with-rtl

设置涉及左右相关的属性值，在rtl模式下自动替换为相反的属性值

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
   .set-value-with-rtl(text-align, left);
}
```

## 源码

```
.set-value-with-rtl(@property, @value) {
    @{property}: @value;
    [dir="rtl"] & {
        @new-value: .prop-with-rtl(@value)[@property-name];
        @{property}: @new-value;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@property|css属性名|string|必填|
|@value|css属性值|string|必填|

------

# .set-loading-color

设置Loading组件颜色

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
    .set-loading-color(#000);
}
```

## 源码

```
.set-loading-color(@color) {
    .bg-color-with-config {
        background: @color;
    }
    .stop-color-with-config {
        stop-color: @color;
    }
    .fill-color-with-config {
        fill: @color;
    }
    .stroke-color-with-config {
        stroke: @color;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|颜色|string|必填|

------

# .set-font-size

设置最小字号

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
    .set-font-size(10px);
}
```

## 源码

```
.set-font-size(@size) {
    & when (@size < 12PX) {
        font-size: 12PX;
        transform: scale(round(unit(@size / 12PX), 4));
    }
    & when not (@size < 12PX) {
        font-size: @size;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@size|最小字号|string|必填|

------

# .set-content-box-width

设置content-box盒模型下元素宽度

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
    .set-content-box-width(min-width, 300px, 10px, 10px);
}
```

## 源码

```
.set-content-box-width(@property, @width, @padding-left, @padding-right) {
    @{property}: @width - @padding-left - @padding-right;
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

------

# .set-steps-color

设置Steps组件当前步骤主要颜色，已完成步骤颜色自动计算为当前步骤颜色透明度10%

======

## 示例

```
@import '@arco-design/mobile-utils/style/mixin.less';
.demo {
    .set-steps-color(#FFB400);
}
```

## 源码

```
.set-steps-color(@color, @finish-color: fade(@color, 10%)) {
    .process-bg-color-with-config,
    .process-custom-icon-bg-color-with-config {
        background: @color;
        .use-var(color, steps-process-with-config-item-icon-color);
    }
    .finish-bg-color-with-config,
    .finish-custom-icon-bg-color-with-config {
        background: @finish-color;
        color: @color;
        svg {
            color: inherit;
        }
    }
    .wait-custom-icon-bg-color-with-config {
        .use-var(background, steps-wait-icon-num-background);
        .use-var(color, sub-info-font-color);
    }
    .process-title-color-with-config {
        color: @color;
    }
    .finish-tail-color-with-config::before,
    .finish-tail-color-with-config::after,
    .process-tail-color-with-config::before,
    .error-tail-color-with-config::before {
        background: @color;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@color|当前步骤背景、标题文本颜色|string|必填|
|@finish-color|已完成步骤背景色|string|-|
