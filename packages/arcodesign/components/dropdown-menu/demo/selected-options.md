## 带有默认选择项的选项数组 @en{Options List with Default Value}

#### 4

```js
import { DropdownMenu } from '@arco-design/mobile-react';

export default function DropdownMenuDemo() {
    return (
        <DropdownMenu
            defaultValues={[2,1]}
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
                    label: 'Recommend',
                    value: 1,
                  }
                ],
              },
              {
                label: 'Fengtai District',
                value: 1,
                tip: '500 recommended',
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
                    label: 'Middle floor',
                    value: 1,
                  }
                ],
              }
            ]}
            showTips={true}
            onOptionChange={(value, item) => {
                console.info(value, item);
            }}
        />
    );
}
```