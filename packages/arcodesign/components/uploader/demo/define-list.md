## 自定义上传列表 @en{Defined Upload List}

#### 5

```js
import { Uploader } from '@arco-design/mobile-react';
import IconUpload from '@arco-design/mobile-react/esm/icon/IconUpload';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    return <Uploader accept="image/*" files={files} onChange={setFiles} />;
}
```
