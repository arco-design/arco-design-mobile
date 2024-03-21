## 禁用状态 @en{Basic Usage}

#### 2

```js
import { Uploader } from '@arco-design/mobile-react';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    return <Uploader files={files} onChange={setFiles} disabled={true} />;
}
```
