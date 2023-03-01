## 使用useForm获取实例 @en{Use useForm to Get Form Instance}

#### 2

```js
import {
    Form,
    Input,
    Radio,
    Button,
} from '@arco-design/mobile-react';
import { useForm } from '@arco-design/mobile-react/esm/form';

const options = [
    { label: 'horizontal', value: 'horizontal' },
    { label: 'vertical', value: 'vertical' },
];

const genderOptions = [
    { label: 'male', value: '1' },
    { label: 'female', value: '2' },
    { label: 'others', value: '3' },

]


const rules = {
    name: [
        {
            validator: (val, callback) => {
                if (!val) {
                    callback('Please input user name');
                } else if (val.length > 20) {
                    callback('The maximum number of characters is 20');
                } else {
                    callback();
                }
            },
        },
    ],
}

export default function FormDemo() {
    const [form] = useForm();
    const [layout, setLayout] = React.useState('horizontal');
    const toSubmit = val => {
        form.submit();
    };
    const onSubmit = (values, result) => {
        console.log('----submit Successfully', values, result);
    };

    const onSubmitFailed = (values, errors = [], definedError = {}) => {
        const firstField = (errors || [])?.[0];
        if(firstField) {
            firstField?.dom?.scrollIntoView();
        }
        console.log('----submit failed value:', values);
        console.log('----submit error', errors);
    };
    const [disable, setDisable] = React.useState(true);
    const handleClick = e => {
        e.preventDefault();
    };
    const handleInput = (e, value) => {
        if(/^[0-9]*$/.test(value)) {
            form.setFieldValue('age', value);
        } else {
            form.setFieldValue('age', 0);
        }
    }

    return (
        <div>
            <Radio.Group options={options} value={layout} onChange={setLayout} />
            <Form
                form={form}
                onSubmit={onSubmit}
                onSubmitFailed={onSubmitFailed}
                layout={layout}
            >
                <Form.Item field="name" label="UserName" trigger="onBlur" rules={rules.name} required>
                    <Input  placeholder="Please input username" clearable border="none" />
                </Form.Item>
                <Form.Item field="age" label="Age" trigger="onInput" rules={[{type: 'number', min: 12, validateLevel: 'warning'}]}>
                    <Input placeholder="Please input age"  clearable border="none" onInput={handleInput}/>
                </Form.Item>
                <Form.Item field="gender" label="Gender">
                    <Radio.Group options={genderOptions} />
                </Form.Item>
                <Button needActive onClick={toSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
```
