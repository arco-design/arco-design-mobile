## 上传状态 @en{Upload}

#### 7

```js
import { Uploader } from '@arco-design/mobile-react';

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'employeelist.doc', {
    type: mimeType,
});

export async function mockUpload({ file }) {
    await sleep(1000);
    return {
        url: URL.createObjectURL(file),
    };
}

export async function mockUploadFail() {
    await sleep(3000);
    throw new Error('Upload failed');
}

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([{ file, status: 'loaded' },]);
    const [files1, setFiles1] = React.useState([{ file, status: 'error' },]);
    return (
        <div>
            <div className="demo-space" />
            <Uploader files={files} onChange={setFiles} upload={mockUpload} />
            <div className="demo-space" />
            <Uploader files={files1} onChange={setFiles1} upload={mockUploadFail} />
        </div>
    );
}
```

```less
.demo-space {
    font-size: 14px;
    line-height: 1;
    margin: 8px 0;
}
```
