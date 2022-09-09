## 隐藏选择/删除图标 @en{Select&Delete Icon Hide}

#### 4

alwaysShowSelect的优先级高于hideSelect
@en{alwaysShowSelect has higher priority than hideSelect}
#### 7

```js
import { ImagePicker } from '@arco-design/mobile-react';

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' }
    ]);
    return <div>
        <div className="demo-space" />
        <ImagePicker images={images} onChange={setImages} hideDelete={true} />
        <div className="demo-space" />
        <ImagePicker images={images} onChange={setImages} hideSelect={true} />
    </div>;
}
```
