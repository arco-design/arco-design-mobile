## 基础样式 @en{Basic Usage}

#### 1

```js
import { Uploader } from '@arco-design/mobile-react';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    return <Uploader files={files} onChange={setFiles} />;
}
```
