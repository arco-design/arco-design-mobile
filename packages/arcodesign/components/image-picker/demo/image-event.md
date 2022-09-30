## 图片点击/长按事件 @en{Click&LongPress Event}

#### 9


```js
import { ImagePicker, ImagePreview, Dialog } from '@arco-design/mobile-react';

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg' },
    ]);
    const onClick = (e, image, index) => {
        window.modalInstance = ImagePreview.open({
            showLoading: true,
            openIndex: index,
            loop: true,
            onImageDoubleClick: index => console.log('dbl click', index),
            onImageLongTap: (index, image) => console.log('long tap', index, image),
            images: images.map(i => {
                i.src = i.url;
                return i;
            }),
        });
    };
    const onLongPress = (e, image, index) => {
        window.modalInstance = Dialog.confirm({
            children: `Confirm to delete?`,
            platform: 'ios',
            okText: 'ok',
            cancelText: 'cancel',
            onOk: () => {
                setImages(images.filter((_i, j) => j !== index));
            },
        });
    };
    return (
        <div>
            <ImagePicker
                images={images}
                onChange={setImages}
                onClick={onClick}
                onLongPress={onLongPress}
            />
        </div>
    );
}
```
