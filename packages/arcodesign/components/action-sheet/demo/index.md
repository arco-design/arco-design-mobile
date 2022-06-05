## 基础用法 @en{Basic Usage}

#### 1

```js
import { ActionSheet, Cell, Loading, Badge } from '@arco-design/mobile-react';

export default function ActionSheetDemo() {
    const [visible, setVisible] = React.useState(false);
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="No Title" showArrow onClick={() => {
                window.modalInstance = ActionSheet.open({
                    items: [
                        { content: 'Option 1' },
                        { content: 'Option 2' },
                        { content: 'Option 3' },
                        { content: 'Option 4' },
                    ],
                });
            }} />
            <Cell label="Cancel/Delete Button" showArrow onClick={() => {
                window.modalInstance = ActionSheet.open({
                    items: [
                        { content: 'Option 1' },
                        { content: 'Option 2' },
                        { content: 'Option 3' },
                        { content: 'Delete', status: 'danger' },
                    ],
                    cancelText: 'Cancel',
                });
            }} />
            <Cell label="Select Status" showArrow onClick={() => {
                window.modalInstance = ActionSheet.open({
                    items: [
                        { content: 'Normal' },
                        { content: 'Disabled', status: 'disabled' },
                        {
                            content: (
                                <>Loading <Loading type="arc" radius={9} style={{ marginLeft: 8 }} /></>
                            ),
                            onClick: () => true,
                        },
                        { content: 'Delete', status: 'danger' },
                    ],
                    cancelText: 'Cancel',
                });
            }} />
            <Cell label="Description" showArrow onClick={() => {
                window.modalInstance = ActionSheet.open({
                    className: 'demo-action-sheet',
                    items: [{ content: 'Confirm', className: 'primary-item' }],
                    cancelText: 'Cancel',
                    title: 'This is a line of header text',
                    subTitle: 'This is one or two lines of descriptive information. This is one or two lines of description.',
                });
            }} />
            <Cell label="Badge Number" showArrow onClick={() => setVisible(true)} />
        </Cell.Group>
        <ActionSheet
            visible={visible}
            close={() => setVisible(false)}
            items={[
                { content: (
                    <div style={{ position: 'relative' }}>
                        Option 1 <Badge absolute dot style={{ marginLeft: 0 }} />
                    </div>
                ) },
                { content: (
                    <div style={{ position: 'relative' }}>
                        Option 2 <Badge absolute text="2" style={{ marginLeft: 0 }} />
                    </div>
                ) },
                { content: (
                    <div style={{ position: 'relative' }}>
                        Option 3 <Badge absolute text="100" style={{ marginLeft: 0 }} />
                    </div>
                ) },
            ]}
            cancelText="Cancel"
        />
    </>);
}
```
