## 基础用法 @en{Basic Usage}

#### 1

```js
import { Progress } from '@arco-design/mobile-react';
import {useEffect,useState} from "react";

export default function ProgressDemo() {
    return (
        <Progress percentage={75} mode="nav" style={{ position: 'relative', zIndex: 1 }} />
    );
}
```
