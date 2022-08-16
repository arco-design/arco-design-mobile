## 二次确认

#### 3

```js
import { SwipeAction, Cell, Dialog, ActionSheet, Toast } from '@arco-design/mobile-react';
import { useState } from 'react';

export default function SwipeActionDemo() {
    
    const [actionSheetVisible, setActionSheetVisible] = useState(false);

    return (
        <Cell.Group bordered={false}>
            <SwipeAction
                rightActions={[
                    {
                        text: '取消置顶',
                        style: {
                            background: '#C9CDD4',
                        },
                    },
                    {
                        text: '删除',
                        style: {
                            background: '#F53F3F',
                        },
                        onClick: () => {
                            setActionSheetVisible(true);

                            return false;
                        },
                    },
                ]}
            >
                <Cell label="二次确认" />
            </SwipeAction>
            <ActionSheet
                visible={actionSheetVisible}
                close={() => {
                    setActionSheetVisible(false);
                }}
                items={[
                    {
                        content: (
                            <div
                                onClick={() => {
                                    setActionSheetVisible(false);
                                    window.modalInstanceModal = Dialog.confirm({
                                        title: '确定删除此内容么？',
                                        okText: (
                                            <div
                                                onClick={() => {
                                                    if (window.modalInstanceModal) {
                                                        window.modalInstanceModal.close();
                                                    }

                                                    Toast.toast('已删除');
                                                }}
                                            >
                                                确定
                                            </div>
                                        ),
                                        cancelText: (
                                            <div
                                                onClick={() => {
                                                    if (window.modalInstance) {
                                                        window.modalInstance.close();
                                                    }
                                                }}
                                            >
                                                取消
                                            </div>
                                        ),
                                    });
                                }}
                            >
                                删除
                            </div>
                        ),
                        status: 'danger',
                    },
                ]}
                cancelText="取消"
                subTitle="删除此内容么？"
            />
        </Cell.Group>
    );
}
```
