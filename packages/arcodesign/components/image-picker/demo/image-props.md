## 图片相关属性 @en{Image Props}

#### 10

```js
import { ImagePicker } from '@arco-design/mobile-react';

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg' },
    ]);

    return (
        <div>
            <ImagePicker
                images={images}
                onChange={setImages}
                imageProps={{
                    fit: 'contain',
                }}
            />
        </div>
    );
}
```
