## 滑块偏移和间距 @en{Slider offset and spacing}

#### 4

支持两边露出（此时默认不可循环播放，如需循环请设置fakeItem=true），支持轮播卡片设置间距，支持切页缩放效果。@en{Support both sides exposed (the default is not loopable at this time, if you need to loop, please set fakeItem=true), support for carousel cards to set spacing, and support for page-cutting zoom effects.}

```js
import { Carousel } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    return (
        <Carousel
            initialIndex={1}
            offsetBetween={30}
            spaceBetween={5}
            inactiveScale={0.8}
            fakeItem={true}
        >
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg" alt="" />
        </Carousel>
    );
}
```
