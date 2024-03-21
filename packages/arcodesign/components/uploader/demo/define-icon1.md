## 自定义索引/删除图标 @en{Define Index&Delete Icon}

#### 4

```js
import { Uploader } from '@arco-design/mobile-react';
import IconClose from '@arco-design/mobile-react/esm/icon/IconClose';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    const fileIndexArea = () => null;
    const deleteArea = () => <IconClose />;

    return (
        <Uploader
            files={files}
            onChange={setFiles}
            renderDeleteArea={deleteArea}
            hideFile={true}
            renderFileIndexArea={fileIndexArea}
        />
    );
}
```
