## 带有选择指引的选项数组 @en{Options List with Selection Guide}

#### 2

```js
import { DropdownMenu } from '@arco-design/mobile-react';

export default function DropdownMenuDemo() {
    return (
        <DropdownMenu
            selectTips = {[
              'District', 'Position',
            ]}
            options={[
              {
                label: 'Haidian District',
                value: 0,
                disabled: false,
                children: [
                  {
                    label: 'All',
                    value: 0,
                  },
                  {
                    label: 'Low floor',
                    value: 1,
                  }
                ],
              },
              {
                label: 'Fengtai District',
                value: 1,
                children: [
                  {
                    label: 'All',
                    value: 0,
                  }
                ],
              },
              {
                label: 'Changping District',
                value: 2,
                disabled: true,
                children: [
                  {
                    label: 'All',
                    value: 0,
                  },
                  {
                    label: 'High floor',
                    value: 1,
                  }
                ],
              }
            ]}
            onOptionChange={(value, item) => {
              console.info(value, item);
            }}
        />
    );
}
```
