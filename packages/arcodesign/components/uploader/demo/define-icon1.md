## 自定义索引/删除图标 @en{Define Index&Delete Icon}

#### 3

```js
import { Uploader } from '@arco-design/mobile-react';
import IconClose from '@arco-design/mobile-react/esm/icon/IconClose';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    return (
        <Uploader files={files} onChange={setFiles} deleteIcon={<IconClose />} hideFile={true} />
    );
}
```
