## 自定义展开方向--向上展开 @en{Customize the expansion direction - expand up}

#### 3

```js
import { DropdownMenu } from '@arco-design/mobile-react';

export default function DropdownMenuDemo() {
    return (
        <DropdownMenu
            multiple={true}
            options={[[{
              label: 'Haidian District',
              value: 0,
              disabled: false,
            },
            {
              label: 'Fengtai District',
              value: 1,
            },
            {
              label: 'Changping District',
              value: 2,
              disabled: true,
            }], [{
              label: 'Low floor',
              value: 0,
              disabled: false,
            },
            {
              label: 'Middle floor',
              value: 1,
            },
            {
              label: 'High floor',
              value: 2,
              disabled: true,
            }]]}
            extraForDropdown={{direction: 'up', maxHeight: 120, useColumn: 3}}
            onOptionChange={(value, item) => {
                console.info(value, item);
            }}
        />
    );
}
```
