## 自定义成功/失败/加载中区域 @en{Define Success/Fail/Loading area}

#### 4

```js
import { Uploader, CircleProgress } from '@arco-design/mobile-react';
import IconDownload from '@arco-design/mobile-react/esm/icon/IconDownload';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    const errorNode = () => {
        return (
            <div className="upload-error">
                <a>上传失败，点击重试</a>
            </div>
        );
    };

    return (
        <Uploader
            files={files}
            onChange={setFiles}
            loadedIcon={<IconDownload />}
            loadingIcon={<CircleProgress size="mini" percentage={25} radius={8} />}
            errorIcon={errorNode()}
        />
    );
}
```

```less
.upload-error {
    display: flex;
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(245, 63, 63, 1);
}

.upload-loading {
    font-size: 16px;
}
```
