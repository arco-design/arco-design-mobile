## 上传状态 @en{Upload}

#### 2

```js
import { ImagePicker } from '@arco-design/mobile-react';
export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export async function mockUpload({file}) {
    await sleep(1000);
    return {
        url: URL.createObjectURL(file),
    };
}

export async function mockUploadFail() {
    await sleep(3000);
    return {
        url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/not_exists.jpg',
    };
}

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        {
            url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg',
        }
    ]);
    const [images1, setImages1] = React.useState([
        {
            url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg',
        }
    ]);
    return (
        <div>
            <div className="demo-space" />
            <ImagePicker images={images} onChange={setImages} upload={mockUpload} />
            <div className="demo-space" />
            <ImagePicker images={images1} onChange={setImages1} upload={mockUploadFail} />
        </div>
    );
}
```
