## 基础用法 @en{Basic Usage}

#### 1

```js
import {
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
                    callback('Please input name');
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
    const formRef = React.useRef();
    const [layout, setLayout] = React.useState('horizontal');
    const toSubmit = val => {
        formRef.current.form.submit();
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
            formRef.current.form.setFieldValue('age', value);
        } else {
            formRef.current.form.setFieldValue('age', 0);
        }
    }
    return (
        <div>
            <Radio.Group options={options} value={layout} onChange={setLayout} />
            <Form
                ref={formRef}
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
                <Form.Item
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
                </Form.Item>
                 <Form.Item field="score" label="Score">
                    <Rate />
                </Form.Item>
                <Form.Item field="pictures" label="Pictures" initialValue={[
                    { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' }
                ]}>
                    <ImagePicker />
                </Form.Item>
                <Form.Item field="progress" label="Progress">
                    <Slider />
                </Form.Item>
                <Button needActive onClick={toSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
```
