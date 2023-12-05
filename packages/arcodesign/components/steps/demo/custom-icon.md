## 图标步骤条 @en{Icon Steps Bar}

#### 8

```js
import { Steps } from '@arco-design/mobile-react';
import IconGift from '@arco-design/mobile-react/esm/icon/IconGift';
import IconShop from '@arco-design/mobile-react/esm/icon/IconShop';
import IconShopping from '@arco-design/mobile-react/esm/icon/IconShopping';
import IconSubway from '@arco-design/mobile-react/esm/icon/IconSubway';
import './index.less';

export default function StepsDemo() {
    return (
        <div>
            <Steps current={1} className="demo-svg">
                <Steps.Step title="Start" icon={<IconSubway />} />
                <Steps.Step title="In progress" icon={<IconGift />} />
                <Steps.Step title="Step 3" icon={<IconShop />} />
                <Steps.Step title="Finish" icon={<IconShopping />} />
            </Steps>
            <div className="divide"></div>
            <Steps current={2}>
                <Steps.Step title="Order completed" icon={<img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/arco-design/5.svg"/>} />
                <Steps.Step title="Pending payment" icon={<img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/arco-design/6.svg"/>} />
                <Steps.Step title="In transport" icon={<img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/arco-design/7.svg"/>} />
                <Steps.Step title="Taking delivery" icon={<img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/arco-design/8.svg"/>} />
            </Steps>
        </div>
    );
}
```

```less
.divide {
    .rem(height, 8);
    .use-var(background, card-background-color);
}
.demo-svg {
    .@{prefix}-steps-item-custom-icon {
        border-radius: 50%;
    }
    .set-steps-color-var(primary-color, lighter-primary-color);
    .@{prefix}-steps-item-custom-icon {
        font-size: 11PX;
    }
}
```
