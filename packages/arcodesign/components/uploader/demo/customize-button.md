## 自定义上传图标 @en{Customize Upload Button}

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
    .rem(font-size, 14);
    .rem(line-height, 22);
    align-items: center;
    font-weight: 400;
    .use-var(color, primary-color);
    &-icon {
        .rem-with-rtl(margin-left, 4);
    }
}
```
