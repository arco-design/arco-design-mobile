## 限制上传张数和图片大小 @en{Number & Size Limit}

#### 4

```js
import { ImagePicker, Toast } from '@arco-design/mobile-react';

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
    ]);
    const maxSize = 500;
    const limit = 3;
    const onMaxSizeExceed = file => {
        window.toastInstance = Toast.toast(`${file.name} over ${maxSize}K`);
    };
    const onLimitExceed = () => {
        window.toastInstance = Toast.toast(`Select up to ${limit} images`);
    };
    return (
        <div>
            <ImagePicker
                images={images}
                onChange={setImages}
                limit={limit}
                maxSize={maxSize}
                multiple
                onMaxSizeExceed={onMaxSizeExceed}
                onLimitExceed={onLimitExceed}
            />
            <div className="demo-space" />
            <ImagePicker
                images={images}
                onChange={setImages}
                limit={limit}
                maxSize={maxSize}
                multiple
                alwaysShowSelect
                onMaxSizeExceed={onMaxSizeExceed}
                onLimitExceed={onLimitExceed}
            />
        </div>
    );
}
```
