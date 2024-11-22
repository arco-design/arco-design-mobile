## 动态主题 @en{Dynamic theme}

#### 2

如果需要动态主题切换，需要配置 less 选项`@use-css-vars: 1`以启用 css 变量（[详情见【快速上手 - 主题变量定制 & 动态切换】](/#/doc/readme)）。@en{If there is a need for dynamic theme switching, you need to configure the less option `@use-css-vars: 1` to enable css variable([For details, see [Quick Start - Theme variable customization & dynamic switching]](/#/doc/readme)).}

请注意，由于 css variable 存在兼容性问题（<a href="https://caniuse.com/css-variables" target="_blank">查看兼容性</a>），请自行判断使用风险@en{Please note that due to the compatibility issues of css variables(<a href="https://caniuse.com/css-variables" target="_blank">Check compatibility</a>), please use it at your own risk.}

```js
import { ContextProvider, Button, Cell, Switch } from '@arco-design/mobile-react';

export default function ContextProviderDemo() {
    const [checked, setChecked] = React.useState(true);
    const theme = React.useMemo(() => {
        if (checked) {
            return {
                'button-primary-background': '#34C759',
                'button-primary-clicked-background': '#00B42A',
            };
        }
        return null;
    }, [checked]);
    return (
        <ContextProvider theme={theme}>
            <Cell label="Switch Theme" bordered={false}>
                <Switch
                    checked={checked}
                    platform="ios"
                    onChange={value => {
                        setChecked(value);
                    }}
                />
            </Cell>
            <Button className="context-button">button</Button>
        </ContextProvider>
    );
}
```

```less
.arco-cell {
    .rem(border-radius, 8);
}
.context-button {
    margin-top: 10px;
}
```
