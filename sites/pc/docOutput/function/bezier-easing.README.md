

------

# bezier

获取一个用于计算贝塞尔曲线的函数

======

## 示例

```
import { bezierEasing } from '@arco-design/mobile-utils';
const p = (Date.now() - start) / duration;
if (p > 1) {
     scrollTo(targetTop);
} else {
     const newTop = initTop + (targetTop - initTop) * bezierEasing(0.34, 0.69, 0.1, 1)(p);
     scrollTo(newTop);
}
```

## 类型

```
(mX1: number, mY1: number, mX2: number, mY2: number) => (x: number) => number
```

## 源码

```
function bezier(mX1: number, mY1: number, mX2: number, mY2: number) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
        throw new Error('bezier x values must be in [0, 1] range');
    }

    if (mX1 === mY1 && mX2 === mY2) {
        return LinearEasing;
    }

    // Precompute samples table
    const sampleValues = float32ArraySupported
        ? new Float32Array(kSplineTableSize)
        : new Array(kSplineTableSize);
    for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }

    function getTForX(aX) {
        let intervalStart = 0.0;
        let currentSample = 1;
        const lastSample = kSplineTableSize - 1;

        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }
        --currentSample;

        // Interpolate to provide an initial guess for t
        const dist =
            (aX - sampleValues[currentSample]) /
            (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        const guessForT = intervalStart + dist * kSampleStepSize;

        const initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        }
        if (initialSlope === 0.0) {
            return guessForT;
        }
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }

    return function BezierEasing(x: number) {
        // Because JavaScript number are imprecise, we should guarantee the extremes are right.
        if (x === 0 || x === 1) {
            return x;
        }
        return calcBezier(getTForX(x), mY1, mY2);
    };
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|mX1|第一个点的x坐标|number|必填|
|mY1|第一个点的y坐标|number|必填|
|mX2|第二个点的x坐标|number|必填|
|mY2|第二个点的y坐标|number|必填|

> 输出

计算贝塞尔曲线的函数
