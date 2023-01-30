## 手动切换 @en{Manually change index}

#### 10.5

```js
import { Carousel, Button } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    const ref = React.useRef();
    const currentIndexRef = React.useRef(0);

    return (<>
        <Carousel
            ref={ref}
            indicatorType="circle"
            bounceDampRate={4}
            autoPlay={false}
            onChange={current => {
                currentIndexRef.current = current;
            }}
        >
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg" alt="" />
        </Carousel>
        <div className="change-index-btns">
            <Button
                size="small"
                onClick={() => ref.current?.changeIndex(currentIndexRef.current - 1, false, 'right')}
            >Previous</Button>
            <Button
                size="small"
                onClick={() => ref.current?.changeIndex(currentIndexRef.current + 1, false, 'left')}
            >Next</Button>
        </div>
    </>);
}
```
