## 自动伸缩高度 @en{Automatically expandable height}

#### 11

传入`autoHeight`可支持自动伸缩高度；当内容为纯图片时，也可以传入`list`属性，直接指定`src`和`onClick`。
@en{Inputing `autoHeight` can support automatic scaling height; when the content is a pure image, you can also input the `list` property and specify `src` and `onClick`.}

```js
import { Carousel } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    return (
        <Carousel
            autoHeight={true}
            indicatorType="circle"
            indicatorPos="end"
            list={[{
                src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
                onClick: () => {},
                text: 'First carousel',
            }, {
                src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg',
                text: 'Second carousel',
            }]}
        />
    );
}
```
