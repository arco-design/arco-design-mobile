## 监听切换事件 @en{Listen for the onChange event}

#### 8

```js
import { Carousel, Toast } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    return (
        <Carousel
            autoPlay={false}
            onChange={(current) => {
                Toast.info({
                    content: `Currently switch to ${current}`,
                    duration: 1000,
                });
            }}
        >
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg" alt="" />
        </Carousel>
    );
}
```
