## 基础用法 @en{Basic Usage}

#### 1

```js
import { Textarea } from '@arco-design/mobile-react';

export default function TextareaDemo() {
    return (
        <>
            <Textarea
                statisticsMaxlength={100}
                onErrStatusChange={hasError => console.log('hasError', hasError)}
                autosize
                placeholder="Please enter the description of no less than 10 characters"
                border="none"
            />
        </>
    );
}
```
