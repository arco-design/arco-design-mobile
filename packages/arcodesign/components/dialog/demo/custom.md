## 自定义 @en{Custom}

#### 3

```js
import { Dialog, Cell, Loading } from '@arco-design/mobile-react';

export default function DialogDemo() {
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    return (<div>
        <Cell.Group bordered={false}>
            <Cell label="Scrollable Content" showArrow onClick={() => {
                window.modalInstance = Dialog.alert({
                    platform: 'ios',
                    contentAlign: 'center',
                    getScrollContainer: () => document.querySelector('.demo-dialog-long-content'),
                    children: (
                        <div className="demo-dialog-long-content" style={{ height: 100, overflowY: 'auto', textAlign: 'left' }}>
                            The dialog will do scrolling penetration processing by default. At this time, getScrollContainer passes in the container DOM with overflow as auto (that is, the container DOM containing this text). After passing in, the scroll event of this DOM will be monitored. it is preventDefault only when scrolling to the top or bottom, otherwise it will not preventDefault.
                        </div>
                    ),
                });
            }} />
            <Cell label="Custom dialog content" showArrow onClick={() => {
                window.modalInstance = Dialog.confirm({
                    platform: 'ios',
                    className: 'dialog-input-demo',
                    title: 'New Label',
                    contentAlign: 'left',
                    children: (<>
                        <input className="dialog-input-demo-input" placeholder="Please input label name" />
                        <div className="dialog-input-demo-hint">Here is the prompt text entered</div>
                    </>),
                });
            }} />
            <Cell label="Asynchronous Shutdown" showArrow onClick={() => setVisible(true)} />
            <Cell label="Single Button Prompt Action" showArrow onClick={() => {
                window.modalInstance = Dialog.alert({
                    platform: 'ios',
                    title: 'Dialog Title',
                    contentAlign: 'left',
                    children: 'I have the multi-line content of the text aligned to the left I have the multi-line content of the text aligned to the left',
                    footerType: 'button',
                });
            }} />
            <Cell label="Double Button Prompt Action" showArrow onClick={() => {
                window.modalInstance = Dialog.confirm({
                    platform: 'ios',
                    title: 'Dialog Title',
                    contentAlign: 'center',
                    children: 'I am the text which is centered multi-line content.I am the text which is centered multi-line content',
                    footerType: 'button',
                    okText: 'Auxiliary operation',
                    cancelText: 'Primary operation',
                });
            }} />
        </Cell.Group>
        <Dialog
            visible={visible}
            close={() => setVisible(false)}
            platform="ios"
            title="Dialog Title"
            footer={[
                { content: 'Auxiliary' },
                {
                    content: loading ? <Loading type="circle" stroke={3} radius={8.5} /> : 'Primary',
                    onClick: () => new Promise((res) => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            res();
                        }, 1000);
                    }),
                },
            ]}
        >I am the text which is centered single-line content.</Dialog>
    </div>);
}
```
