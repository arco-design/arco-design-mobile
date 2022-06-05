## 基础用法 @en{Basic Usage}

#### 1

```js
import { Cell, ImagePreview } from '@arco-design/mobile-react';

export default function ImagePreviewDemo() {
    return (<>
        <Cell label="Open image preview" bordered={false} showArrow onClick={() => {
            window.modalInstance = ImagePreview.open({
                showLoading: true,
                openIndex: 0,
                loop: true,
                onImageDoubleClick: (index) => console.log('dbl click', index),
                onImageLongTap: (index, image) => console.log('long tap', index, image),
                images: [
                    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg' },
                    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
                    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg' },
                ],
            });
        }} />
    </>);
}
```
