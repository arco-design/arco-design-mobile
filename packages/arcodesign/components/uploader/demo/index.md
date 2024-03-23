## 基础样式 @en{Basic Usage}

#### 1

```js
import { Uploader } from '@arco-design/mobile-react';

const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'employeelist.doc', {
    type: mimeType,
    lastModified: new Date().getTime(),
});

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([
        { file, status: 'loaded' },
        { file, status: 'loading' },
        { file, status: 'error' },
    ]);

    return <Uploader files={files} onChange={setFiles} />;
}
```
