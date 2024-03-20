## 自定义上传图标 @en{Defined Upload Button}

#### 2

```js
import { Uploader } from '@arco-design/mobile-react';
import IconUpload from '@arco-design/mobile-react/esm/icon/IconUpload';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    const renderButton = () => {
        return (
            <a className="upload-button">
                点击上传
                <IconUpload className="upload-button-icon" />
            </a>
        );
    };

    return <Uploader files={files} onChange={setFiles} renderButton={renderButton} />;
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
