

------

# .text-overflow
======

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
|@lines|\-|number|1|

------

# .noselect
======

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
======

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
======

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
|@color|\-|string|currentColor|
|@stroke|\-|string|0.3PX|

------

# .remove-text-medium
======

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
======

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
|@direction|\-|string|必填|
|@borderColor|\-|string|inherit|
|@borderRadius|\-|number|0|
|@borderWidth|\-|string|1PX|
|@borderStyle|\-|string|solid|

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
======

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
|@color|\-|string|必填|
|@direction|\-|string|all|

------

# .remove-hairline
======

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
|@direction|\-|string|all|

------

# .hairline-bottom-right
======

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
|@color|\-|string|必填|

------

# .hairline-top-left
======

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
|@color|\-|string|必填|

------

# .prop-with-rtl
======

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
    }
    @property-name: @property-map[@@origin-property];
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|@origin-property|\-|string|必填|

------

# .set-prop-with-rtl
======

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
|@property|\-|string|必填|
|@value|\-|string|必填|
|@rules|\-|string|-|

------

# .set-value-with-rtl
======

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
|@property|\-|string|必填|
|@value|\-|string|必填|

------

# .set-loading-color
======

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
|@color|\-|string|必填|

------

# .set-font-size
======

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
|@size|\-|string|必填|

------

# .set-content-box-width
======

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
|@property|\-|string|必填|
|@width|\-|string|必填|
|@padding-left|\-|string|必填|
|@padding-right|\-|string|必填|

------

# .set-steps-color
======

## 源码

```
.set-steps-color(@color) {
    .process-bg-color-with-config,
    .process-custom-icon-bg-color-with-config {
        background: @color;
        .use-var(color, steps-process-with-config-item-icon-color);
    }
    .finish-bg-color-with-config,
    .finish-custom-icon-bg-color-with-config {
        background: fade(@color, 10%);
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
|@color|\-|string|必填|
