## 字数限制超出提示 @en{Word limit exceeded tips}

#### 3

```js
import { Textarea, Toast } from '@arco-design/mobile-react';

export default function TextareaDemo() {
    return (<>
        <Textarea
            statisticsMaxlength={5}
            onErrStatusChange={(hasError) => {
                hasError && Toast.toast({ content: 'no more than 5 characters' });
            }}
            autosize
            placeholder="Please enter the description of no more than 5 characters"
            border="none"
            rows={1}
        />
    </>);
}
```
