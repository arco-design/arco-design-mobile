## 完全受控的组件 @en{Controlled}

#### 6

```js
import { DropdownMenu } from '@arco-design/mobile-react';

export default function DropdownMenuDemo() {
  const [showDropdown, setShowDropdown] = React.useState(false);
    return (
        <DropdownMenu
            values={[1,0]}
            showDropdown={showDropdown}
            options={[
              {
                label: 'Beijing',
                value: 0,
                disabled: false,
                children: [
                  {
                    label: 'Haidian',
                    value: 0,
                  },
                  {
                    label: 'Fengtai',
                    value: 1,
                  }
                ],
              },
              {
                label: 'Shenzhen',
                value: 1,
                children: [
                  {
                    label: 'Nanshan',
                    value: 0,
                  }
                ],
              },
              {
                label: 'Wuhan',
                value: 2,
                disabled: true,
                children: [
                  {
                    label: 'Wuchang',
                    value: 0,
                  },
                  {
                    label: 'Hankou',
                    value: 1,
                  }
                ],
              }
            ]}
            onDropdownChange={(dropdown, _) => {
              setShowDropdown(dropdown);
            }}
            onOptionChange={(_, item) => {
                console.info('You clicked', item.label);
            }}
        />
    );
}
```
