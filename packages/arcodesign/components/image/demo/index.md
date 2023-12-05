## 基础用法 @en{Basic Usage}

#### 1

当图片加载完成之前可展示 loading 内容，图片加载完成时会有切入动画。也可以配置`animate`属性关掉切入动画。
@en{The loading content can be displayed before the image is loaded, and there will be a cut-in animation when the image is loaded. You can also configure the `animate` property to turn off the cut-in animation.}
```js
import { Image } from '@arco-design/mobile-react';
import './index.less';

export default function ImageDemo() {
    return (<div className="image-fit-demo">
        <Image src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg" />
        <Image
            width="2.18rem"
            height="2.18rem"
            staticLabel
            retryTime={3}
            src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
            onAutoRetry={(e) => console.log('retry', e)}
            onError={(e) => console.log('error', e)}
            onLoad={(e) => console.log('load', e)}
            nativeProps={{
                crossOrigin: 'anonymous'
            }}
        />
        <Image
            showLoading={true}
            showError={true}
            src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg"
        />
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
