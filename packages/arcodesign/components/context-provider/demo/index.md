## 基础用法 @en{Basic Usage}

#### 1

在应用的最外层进行配置，一次设置，全局生效。@en{Configure at the outermost layer of the application. Once set, it will take effect globally.}

```js
import { ContextProvider, Cell, Dialog } from '@arco-design/mobile-react';

export default function ContextProviderDemo() {
    const [visible, setVisible] = React.useState(false);
    return (<ContextProvider system="android">
        <Cell.Group bordered={false}>
            <Cell label="Follow system style dialog" showArrow onClick={() => setVisible(true)} />
        </Cell.Group>
        <Dialog
            visible={visible}
            close={() => setVisible(false)}
            title="Tips"
            footer={[
                { content: 'OK' },
            ]}
        >The platform attribute of Dialog is not specified here, which should follow the current system value, but system="android" is specified by wrapping ContextProvider, so what you see here must be an Android-style dialog</Dialog>
    </ContextProvider>);
}
```
