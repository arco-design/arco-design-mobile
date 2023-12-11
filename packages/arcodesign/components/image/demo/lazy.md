## 懒加载 @en{Lazy Load}

#### 5

可以配合`ShowMonitor`组件实现图片懒加载效果。
@en{It can be used with the `ShowMonitor` component to achieve the effect of lazy loading of pictures.}
```js
import { Image, ShowMonitor } from '@arco-design/mobile-react';

export default function ImageDemo() {
    const [show, setShow] = React.useState(false);

    // 这里加负值offset是为了延后展示图片懒加载效果，实际使用时可根据需求设置为0或正值
    // @en The negative value offset is added here to delay the display of the lazy loading effect of the picture. In actual use, it can be set to 0 or a positive value according to the requirements.
    return (<div className="image-fit-demo">
        <ShowMonitor onVisibleChange={(visible) => setShow(visible)} offset={-100} once>
            <Image
                showImage={show}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
        </ShowMonitor>
    </div>);
}
```

```less
.image-fit-demo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    &.fill {
        .@{prefix}-image {
            .rem(width, 64);
            .rem(height, 64);
        }
        .group-text {
            .rem(font-size, 12);
        }
    }
}
```
