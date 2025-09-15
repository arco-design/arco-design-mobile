## 表单联动 @en{Dynamic Field}

#### 4

```js
import { Form, Input, Picker, Button, Switch, Toast } from '@arco-design/mobile-react';
import { useForm } from '@arco-design/mobile-react/esm/form';

const initialVisibility = {
    showField1: false,
    showField2: false,
    showField3: false,
};

export default function FormDemo() {
    const [visibility, setVisibility] = React.useState(initialVisibility);
    const [form] = useForm();

    const handleValuesChange = changedValues => {
        if ('type' in changedValues) {
            const selectedType = changedValues.type?.[0];
            const showField1 = selectedType === 'a';
            const showField2 = selectedType === 'b';
            setVisibility(prev => ({ ...prev, showField1, showField2, showField3: showField1 ? prev.showField3 : false }));
        }
        if ('subType' in changedValues) {
            setVisibility(prev => ({ ...prev, showField3: changedValues.subType?.[0] === 'a1' }));
        }
    };

    const toSubmit = val => {
        form.submit();
    };
    const toReset = () => {
        form.resetFields();
    };
    const onSubmit = (values, result) => {
        console.log('----submit Successfully', values, result);
        console.log(form.getFieldsValue());
        Toast.info({
            content: 'submit successfully',
        });
    };
    const onSubmitFailed = (values, errors = [], definedError = {}) => {
        const firstField = (errors || [])?.[0];
        if (firstField) {
            firstField?.dom?.scrollIntoView();
        }
        console.log('----submit failed value:', values);
        console.log('----submit error', errors);
    };

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
            onValuesChange={handleValuesChange}
        >
            <Form.Item field="type" label="Type" required>
                <Picker cascade={false} data={[['a', 'b']]} />
            </Form.Item>

            {visibility.showField1 && (
                <>
                    <Form.Item field="subType" label="Sub Type" required>
                        <Picker cascade={false} data={[['a1', 'a2', 'a3']]} />
                    </Form.Item>
                    {visibility.showField3 && (
                        <Form.Item field="remark" label="Remark" required>
                            <Input placeholder="Please input remark" clearable border="none" />
                        </Form.Item>
                    )}
                </>
            )}

            {visibility.showField2 && (
                <Form.Item field="note" label="Note" required>
                    <Input placeholder="Please input note" clearable border="none" />
                </Form.Item>
            )}

            <div>
                <Button needActive onClick={toSubmit}>
                    Submit
                </Button>
                <Button type="ghost" onClick={toReset} style={{ marginTop: '12px' }}>
                    Reset
                </Button>
            </div>
        </Form>
    );
}
```
