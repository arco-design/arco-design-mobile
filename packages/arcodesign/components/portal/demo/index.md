## 基础用法 @en{Basic Usage}

#### 1

```js
import { Portal } from '@arco-design/mobile-react';
import './index.less';

export default function PortalDemo() {
    return (<Portal>
        <div className="demo-protal-text">This is the DOM mounted directly on the body</div>
    </Portal>);
}
```

```less-global
.demo-protal-text {
    .rem(font-size, 16);
    .use-var(background, background-color);
    .use-var(color, font-color);
    .rem(margin, 0, 16);
    .rem(padding, 12, 16);
    .rem(border-radius, 8);
    overflow: hidden;
}
```
