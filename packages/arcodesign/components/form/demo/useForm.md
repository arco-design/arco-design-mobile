## 使用useForm获取实例 @en{Use useForm to Get Form Instance}

#### 2

```js
import {
    Cell,
    Form,
    Input,
    Textarea,
    Switch,
    DatePicker,
    Radio,
    Button,
    Checkbox,
    Toast,
    ImagePicker,
    Rate,
    Slider,
} from '@arco-design/mobile-react';
import { useForm } from '@arco-design/mobile-react/Form';

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
                    callback('请输入姓名');
                } else if (val.length > 20) {
                    callback('最多输入20个字');
                } else {
                    callback();
                }
            },
        },
    ],
}

export default function FormDemo2() {
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


    const [send, setSend] = React.useState('发送验证码');
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
    const SendCode = () => (
        <button
            style={{ position: 'absolute', right: 0, top: 0, fontSize: 16 }}
            disabled={disable}
            onClick={handleClick}
        >
            {send}
        </button>
    );
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
