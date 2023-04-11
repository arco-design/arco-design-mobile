## 基础用法 @en{Basic Usage}

#### 1

```js
import { Input } from '@arco-design/mobile-react';

export default function InputDemo() {
    const [input, setInput] = React.useState('');
    return (<>
        <Input
            label="Four characters"
            placeholder="Please enter a nickname"
            clearable
            border="none"
            onChange={(_, value) => console.log('input changed 1', value)}
        />
        <Input
            value={input}
            onInput={(_, value) => setInput(value)}
            onChange={(_, value) => console.log('input changed 2', value)}
            blockChangeWhenCompositing={true}
            label="Nickname"
            placeholder="Please enter nickname"
            clearable
            border="none"
            onClear={() => {
                setInput('');
            }}
            clearShowType='always'
        />
        <Input
            label="Nickname"
            onChange={(_, value) => console.log('input changed 3', value)}
            blockChangeWhenCompositing={true}
            placeholder="Please enter nickname"
            border="none"
            inputStyle={{ textAlign: 'right' }}
        />
    </>);
}
```
