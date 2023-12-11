## 填充模式 @en{Fill Mode}

#### 2

可选填充模式为`contain` `cover` `fill` `none` `scale-down`，具体含义见<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit" target="_blank" rel="noopener noreferrer">这里</a>。
@en{The optional fill modes are `contain` `cover` `fill` `none` `scale-down`, see <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS for specific meanings /object-fit" target="_blank" rel="noopener noreferrer">here</a>.}

```js
import { Image } from '@arco-design/mobile-react';

export default function ImageDemo() {
    return (<div className="image-fit-demo fill">
        <div className="image-group">
            <Image
                fit="contain"
                showLoading={true}
                showError={true}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">contain</div>
        </div>
        <div className="image-group">
            <Image
                fit="cover"
                showLoading={true}
                showError={true}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">cover</div>
        </div>
        <div className="image-group">
            <Image
                fit="fill"
                showLoading={true}
                showError={true}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">fill</div>
        </div>
        <div className="image-group">
            <Image
                fit="none"
                showLoading={true}
                showError={true}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">none</div>
        </div>
        <div className="image-group">
            <Image
                fit="scale-down"
                showLoading={true}
                showError={true}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">scale-down</div>
        </div>
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
.image-group {
    display: inline-block;
    vertical-align: top;
    .group-text {
        .rem(font-size, 14);
        .rem(margin-top, 8);
        color: #939AA3;
        text-align: center;
    }
}
```
