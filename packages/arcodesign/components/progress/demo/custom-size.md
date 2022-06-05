## 自定义大小 @en{Custom Size}

#### 5

```js
import { Progress } from '@arco-design/mobile-react';

export default function ProgressDemo() {
    return (
        <>
           <div className="progress-demo-custom-size">
             <Progress percentage={75} trackStroke={8} />
           </div>
           <div className="progress-demo-custom-size">
             <Progress percentage={75} trackStroke={4} />
           </div>
           <div className="progress-demo-custom-size">
             <Progress percentage={75} trackStroke={2} />
           </div>
        </>
    );
}
```
