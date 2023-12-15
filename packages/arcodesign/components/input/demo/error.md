## 错误提示 @en{Error Message}

#### 4

```js
import { Input } from '@arco-design/mobile-react';

export default function InputDemo() {
    const [error1, setError1] = React.useState(true);
    const [error2, setError2] = React.useState('Email format error');
    return (<>
        <Input
            label="Nickname"
            required
            placeholder="Please enter nickname"
            border="none"
            onInput={e => {
                setError1(!e.target.value);
            }}
            inputClass={error1 ? 'demo-input-red-placeholder' : ''}
        />
        <Input
            label="Email"
            required
            placeholder="Please input your email"
            border="none"
            onInput={e => {
                setError2(e.target.value && e.target.value.indexOf('@') < 0 ? 'Email format error' : '');
            }}
            defaultValue="xxx"
            append={error2 ? (
                <div className="demo-input-error-hint">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="6" fill="#F53F3F"/>
                        <path d="M2.5 6C2.5 5.58579 2.83579 5.25 3.25 5.25H8.75C9.16421 5.25 9.5 5.58579 9.5 6C9.5 6.41421 9.16421 6.75 8.75 6.75H3.25C2.83579 6.75 2.5 6.41421 2.5 6Z" fill="white"/>
                    </svg>
                    <span>{error2}</span>
                </div>
            ) : null}
        />
    </>);
}
```

```less
.demo-input-error-hint {
    .rem(font-size, 12);
    .use-var(color, danger-color);
    .rem(padding, 0, 0, 16, 104);
    .rem(margin-top, -8);

    svg,
    span {
        vertical-align: middle;
    }

    svg {
        .rem(margin-right, 4);
    }
}
.demo-input-red-placeholder {
    .use-var(caret-color, danger-color);

    &::placeholder {
       .use-var(color, danger-color);
    }
}
```
