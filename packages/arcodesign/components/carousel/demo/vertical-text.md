## 垂直文字轮播 @en{Vertical text carousel}

#### 10

```js
import { Carousel } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    return (
        <Carousel
            boxHeight={22}
            vertical
            showIndicator={false}
            stayDuration={1000}
            swipeable={false}
        >
            <div className="vertical-text">Carousel 1</div>
            <div className="vertical-text">Carousel 2</div>
        </Carousel>
    );
}
```
