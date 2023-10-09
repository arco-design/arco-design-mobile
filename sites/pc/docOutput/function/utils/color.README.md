### utils color

------

# fadeColor

获取任意颜色的透明色

======

## 示例

```
import { fadeColor } from '@arco-design/mobile-utils';
const transparentColor = fadeColor('#ffffff');
// transparentColor is '#ffffff00'
```

## 类型

```
(color: string) => string
```

## 源码

```
function fadeColor(color: string): string {
    if (!color) {
        return '';
    }
    if (w3cx11[color]) {
        return `${w3cx11[color]}00`;
    }
    if (/^#[A-Fa-f0-9]{6}$/.test(color)) {
        return `${color}00`;
    }
    if (/^rgb\(.*?\)$/.test(color)) {
        return color.replace(/rgb\((.*?)\)/, 'rgba($1, 0)');
    }
    return '';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|color|颜色|string|必填|

> 输出

transparent color
