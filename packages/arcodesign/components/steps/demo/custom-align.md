## 自定义对齐方式 @en{Custom Alignment}

#### 6.5

```js
import { Steps } from '@arco-design/mobile-react';
import { GlobalContext } from '@arco-design/mobile-react/esm/context-provider';
import { useContext } from 'react';
export default function StepsDemo() {
    const { useRtl } = useContext(GlobalContext);
    const getStyle = () => {
        if(useRtl) {
            return {
                marginRight: '20px'
            }
        }
        return {
            marginLeft: '20px'
        }
    }
    const style = getStyle()
    return (
        <div>
            <Steps current={1} direction="horizontal" align="start" style={style}>
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
            <div className="divide"></div>
            <Steps current={1} direction="vertical" align="center">
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
        </div>
    );
}
```
