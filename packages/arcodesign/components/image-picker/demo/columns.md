## 自定义数量 @en{Columns}

#### 3

```js
import { ImagePicker } from '@arco-design/mobile-react';

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg' },
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_3.jpg' },
    ]);
    return (
        <div>
            <ImagePicker images={images} onChange={setImages} columns={4} />
        </div>
    );
}
```

