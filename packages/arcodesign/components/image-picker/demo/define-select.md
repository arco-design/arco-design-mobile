## 自定义图片选择方法 @en{Define Select Function}

#### 11

默认使用 `<input type="file"/>` 选择文件，使用 `onSelect` 方法重写图片选择
@en{Default Use `<input type="file"/>` Select File, Use `onSelect` to Rewrite}

```js
import { ImagePicker, Toast } from '@arco-design/mobile-react';

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
    ]);
    const selectAdapter = () => {
        Toast.toast('Trigger custom select image');
        return new Promise(resolve => {
            const files = [
                {
                    name: '11vnpmryrl4.jpeg',
                    size: 789020,
                    type: 'image/jpeg',
                    url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg',
                },
                {
                    name: '11vnpmryrl2.jpeg',
                    size: 7820,
                    type: 'image/jpeg',
                    url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg',
                },
                {
                    name: '11vnpmryrl1.jpeg',
                    size: 7820,
                    type: 'image/jpeg',
                    url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_3.jpg',
                },
            ];
            setTimeout(() => {
                resolve({
                    files,
                });
            }, 1000);
        });
    };
    const handleChanged = images => {
        setImages(images);
    };
    const maxSize = 100;
    const limit = 3;
    const onMaxSizeExceed = file => {
        window.toastInstance = Toast.toast(`${file.name} over ${maxSize}K`);
    };
    const onLimitExceed = () => {
        window.toastInstance = Toast.toast(`Select up to ${limit} images`);
    };

    return (
        <ImagePicker
            images={images}
            onChange={handleChanged}
            selectAdapter={selectAdapter}
            limit={limit}
            maxSize={maxSize}
            multiple
            onMaxSizeExceed={onMaxSizeExceed}
            onLimitExceed={onLimitExceed}
        />
    );
}
```
