## 基础用法 @en{Basic Usage}

#### 1

```js
import { DropdownMenu } from '@arco-design/mobile-react';

export default function DropdownMenuDemo() {
    return (
        <>
            <DropdownMenu
                options={['Haidian District', 'Fengtai District', 'Changping District']}
            />
            <DropdownMenu
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
                onOptionChange={(value, item) => {
                    console.info(value, item);
                }}
            />
            <DropdownMenu
                defaultValues={[1]}
                options={[
                {
                    label: 'Haidian District',
                    value: 0,
                    disabled: false,
                    children: [{
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
                    }]
                },
                {
                    label: 'Fengtai District',
                    value: 1,
                    children: [{
                        label: 'Low floor',
                        value: 0,
                        disabled: false,
                    },
                    {
                        label: 'Middle floor',
                        value: 1,
                    }],
                },
                {
                    label: 'Changping District',
                    value: 2,
                    disabled: true,
                    children: [{
                        label: 'Low floor',
                        value: 0,
                    }]
                }
                ]}
                onOptionClick={(value, item) => {
                    console.info('click');
                }}
                onOptionChange={(value, item) => {
                    console.info(value, item);
                }}
            />
        </>
    );
}
```
