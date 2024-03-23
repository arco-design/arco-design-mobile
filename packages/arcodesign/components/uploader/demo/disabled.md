## 禁用状态 @en{Basic Usage}

#### 2

```js
import { Uploader } from '@arco-design/mobile-react';

const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'employeelist.doc', {
    type: mimeType,
});

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([{ file, status: 'loaded' }]);

    return <Uploader files={files} onChange={setFiles} disabled={true} />;
}
```
