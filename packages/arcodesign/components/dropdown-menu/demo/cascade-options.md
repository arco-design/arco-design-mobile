## 级联选项数组 @en{Cascading Options List}

#### 5

```js
import { DropdownMenu } from '@arco-design/mobile-react';

export default function DropdownMenuDemo() {
    return (
        <DropdownMenu
            options={[
              {
                label: 'Beijing',
                value: 0,
                disabled: false,
                children: [
                  {
                    label: 'Haidian District',
                    value: 0,
                  },
                  {
                    label: 'Fengtai District',
                    value: 1,
                  }
                ],
              },
              {
                label: 'Guangdong Province',
                value: 1,
                children: [
                  {
                    label: 'Guangzhou',
                    value: 0,
                    children: [
                      {
                        label: 'Haizhu',
                        value: 0,
                      }
                    ]
                  },
                  {
                    label: 'Shenzhen',
                    value: 1,
                    children: [
                      {
                        label: 'Nanshan District',
                        value: 0,
                      }
                    ]
                  }
                ],
              },
              {
                label: 'Zhejiang Province',
                value: 2,
                disabled: true,
                children: [
                  {
                    label: 'Hangzhou',
                    value: 0,
                  },
                  {
                    label: 'Ningbo',
                    value: 1,
                  }
                ],
              },
              {
                label: 'Shanghai',
                value: 3,
              }
            ]}
            onOptionChange={(value, item) => {
                console.info(value, item);
            }}
        />
    );
}
```
