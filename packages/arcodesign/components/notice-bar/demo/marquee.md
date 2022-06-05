## 滚动播放 @en{Scroll to play}

#### 4

```js
import { NoticeBar } from '@arco-design/mobile-react';

export default function NoticeBarDemo() {
    const [text, setText] = React.useState('Click me and I\'ll get longer and start scrolling!');
    const barRef = React.useRef();
    return (<>
        <NoticeBar>Note that this is a very long reminder message displayed on a single line, longer than the container width, so it will scroll.</NoticeBar>
        <NoticeBar marquee="always" style={{ marginTop: 12 }}>It's a short message, but also scrollable.</NoticeBar>
        <NoticeBar style={{ marginTop: 12 }} ref={barRef} onClick={() => {
            setText('I became a long long long long long long long long long long long reminder message');
            if (barRef.current) {
                barRef.current.updateData();
            }
        }}>{text}</NoticeBar>
    </>);
}
```
