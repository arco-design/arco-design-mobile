## 自定义上传图标 @en{Defined Upload Button}

#### 3

```js
import { Uploader } from '@arco-design/mobile-react';
import IconUpload from '@arco-design/mobile-react/esm/icon/IconUpload';

const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'employeelist.doc', {
    type: mimeType,
});

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([{ file, status: 'loaded' }]);

    const uploadArea = () => {
        return (
            <a className="upload-button">
                点击上传
                <IconUpload className="upload-button-icon" />
            </a>
        );
    };

    return <Uploader files={files} onChange={setFiles} renderUploadArea={uploadArea} />;
}
```

```less
.upload-button {
    display: flex;
    font-size: 14px;
    line-height: 22px;
    align-items: center;
    font-weight: 400;
    color: rgba(22, 93, 255, 1);
    &-icon {
        margin-left: 4px;
    }
}
```
