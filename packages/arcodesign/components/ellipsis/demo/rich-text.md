## 富文本缩略 @en{Rich Text Ellipsis}

注意：一定要确保 text 安全可靠，否则易造成 XSS 漏洞
@en{Note: Make sure the text is safe and reliable, otherwise it will easily cause XSS vulnerabilities}
#### 4

```js
import { Ellipsis } from '@arco-design/mobile-react';
import './index.less';

export default function EllipsisDemo() {
    const text =
        `This wasn't the first time ''natural'' sounds had been used in <a class="demo-link-line">musical compositions</a>; that sort of thing had been going on at least as far back as the 19th century, and the surrealists and futurists of the 1920s and 1930s were way into this kind of thing.`;
    return <Ellipsis text={text} dangerouslyUseInnerHTML={true} maxLine={2} />;
}
```

```less
.demo-link-line {
    .use-var(color, primary-color);
}
.demo-link-line {
    text-decoration: underline;
}
```
