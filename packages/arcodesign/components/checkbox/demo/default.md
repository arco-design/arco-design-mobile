## 默认 @en{Default}

#### 1

```js
import { Checkbox } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
    const [check, setCheck] = React.useState(true);

    return (
        <div>
          <Checkbox value={1} style={{width: '50%'}}>Option content</Checkbox>
          <Checkbox
              value={2}
              checked={check}
              style={{width: '50%'}}
              onChange={value => {setCheck(value)}}
          >
              Option content
          </Checkbox>
        </div>
    );
}
```
