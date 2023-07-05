## 独立节点自由组合 @en{Custom}

#### 5

```js
import { Cell, Skeleton, Switch } from '@arco-design/mobile-react';

export default function SkeletonDemo() {
    const [loading, setLoading] = React.useState(true);
    return (
        <div>
            <Cell.Group>
                <Cell label="loading">
                    <Switch checked={loading} onChange={setLoading} />
                </Cell>
            </Cell.Group>
            {loading ? (
                <Skeleton title={false} paragraph={false} animation="gradient">
                    <Skeleton.Grid style={{ marginBottom: 20 }} columns={3} />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 20,
                        }}
                    >
                        <Skeleton.Avatar shape="square" />
                        <Skeleton.Node style={{ borderRadius: 10 }}>
                            <div style={{ width: 250, height: 50 }} />
                        </Skeleton.Node>
                    </div>
                    <Skeleton.Title style={{ marginBottom: 20 }} />
                    <Skeleton.Paragraph
                        style={{ marginBottom: 20 }}
                        rows={5}
                        width={['100%', '100%', '100%', '80%', '60%']}
                    />
                </Skeleton>
            ) : (
                <div style={{ fontSize: '0.28rem' }}>actual content</div>
            )}
        </div>
    );
}
```
