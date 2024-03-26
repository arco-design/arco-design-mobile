## 自定义成功/失败/加载中区域 @en{Customize Success/Fail/Loading area}

#### 5

```js
import { Uploader, CircleProgress } from '@arco-design/mobile-react';
import IconDownload from '@arco-design/mobile-react/esm/icon/IconDownload';

const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'employeelist.doc', {
    type: mimeType,
});

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([
        { file, status: 'loaded' },
        { file, status: 'loading' },
        { file, status: 'error' },
    ]);

    const loadedArea = () => <IconDownload className="upload-loaded" />;
    const loadingArea = () => <CircleProgress size="mini" percentage={25} radius={8} />;
    const errorArea = () => {
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
            renderLoadedArea={loadedArea}
            renderLoadingArea={loadingArea}
            renderErrorArea={errorArea}
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
    .use-var(color, danger-color);
}

.upload-loaded {
    .use-var(color, sub-font-color);
}
```
