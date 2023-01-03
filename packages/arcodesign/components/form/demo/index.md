## 基础用法

#### 1

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
    Slider
} from '@arco-design/mobile-react';

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

export default function FormDemo() {
    const [form] = Form.useForm();
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
                <Form.FormItem field="name" label="UserName" trigger="onBlur" rules={rules.name} required>
                    <Input placeholder="Please input username" clearable border="none" />
                </Form.FormItem>
                <Form.FormItem field="age" label="Age" trigger="onInput" rules={[{type: 'number', min: 12, validateLevel: 'warning'}]}>
                    <Input type="number" placeholder="Please input age"  clearable border="none" />
                </Form.FormItem>
                <Form.FormItem field="gender" label="Gender">
                    <Radio.Group options={genderOptions} />
                </Form.FormItem>
                <Form.FormItem
                    field="checkbox"
                    label="Checkbox"
                    required
                >
                    <Checkbox.Group
                        layout='block'
                    >
                        <Checkbox value={1} style={{height: 42}}>Option content 1</Checkbox>
                        <Checkbox value={2} style={{height: 42}}>Option content 2</Checkbox>
                        <Checkbox value={3} style={{height: 42}}>Option content 3</Checkbox>
                    </Checkbox.Group>
                </Form.FormItem>
                 <Form.FormItem field="score" label="Score">
                    <Rate />
                </Form.FormItem>
                <Form.FormItem field="pictures" label="Pictures" initialValue={[
                    { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' }
                ]}>
                    <ImagePicker />
                </Form.FormItem>
                <Form.FormItem field="progress" label="Progress">
                    <Slider />
                </Form.FormItem>
                <Button needActive onClick={toSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
```
