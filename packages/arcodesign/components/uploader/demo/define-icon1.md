## 自定义索引/删除图标 @en{Define Index&Delete Icon}

#### 4

```js
import { Uploader } from '@arco-design/mobile-react';
import IconClose from '@arco-design/mobile-react/esm/icon/IconClose';

const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'employeelist.doc', {
    type: mimeType,
});

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([{ file, status: 'loaded' }]);

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
