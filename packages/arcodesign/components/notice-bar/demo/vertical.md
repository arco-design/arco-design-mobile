## 垂直滚动 @en{Vertical Scroll}

#### 5

NoticeBar 组件中内置了垂直轮播的默认样式，可以嵌套 Carousel 组件实现垂直滚动文字。
@en{The default style of vertical carousel is built into the NoticeBar component, and the Carousel component can be nested to achieve vertical scrolling of text.}
```js
import { NoticeBar, Carousel } from '@arco-design/mobile-react';
import IconNotice from '@arco-design/mobile-react/esm/icon/IconNotice';

export default function NoticeBarDemo() {
    return (
        <NoticeBar leftContent={<IconNotice />}>
            <Carousel vertical>
                <div>Note that this is the first reminder message.</div>
                <div>Note that this is the second reminder message.</div>
                <div>Note that this is the third reminder message.</div>
            </Carousel>
        </NoticeBar>
    );
}
```
