## 基础用法 @en{Basic Usage}

#### 1

```js
import {
    Form,
    Input,
    Textarea,
    Switch,
    DatePicker,
    Picker,
    Radio,
    Button,
    Checkbox,
    Toast,
    ImagePicker,
    Rate,
    Slider
} from '@arco-design/mobile-react';
import { ValidatorType } from '@arco-design/mobile-utils';

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
            type: ValidatorType.Custom,
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

    const toReset = () => {
         formRef.current.form.resetFields();
    };
    const onSubmit = (values, result) => {
        console.log('----submit Successfully', values, result);
        values.pictures.push({ url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' });
        console.log(formRef.current.form.getFieldsValue());
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
                initialValues={{ birthday: 1449730183515, age: 12 }}
                onChange={values => {
                    console.log('----onChange', values);
                }}
                onValuesChange={values => {
                    console.log('----onValuesChange', values);
                }}
            >
                <Form.Item field="name" label="UserName" trigger="onBlur" rules={rules.name} required>
                    <Input  placeholder="Please input username" clearable border="none"/>
                </Form.Item>
                <Form.Item field="age" label="Age" rules={[{type: 'number', min: 12, validateLevel: 'warning'}]} initialValue={11}>
                    <Input placeholder="Please input age" clearable border="none"  onInput={handleInput}/>
                </Form.Item>
                <Form.Item field="birthplace" label="Place" rules={[{type: 'string',  min: 3, validateLevel: 'warning', validateTrigger: 'onBlur'}]} initialValue={"Beijing"}>
                    <Input placeholder="Please input your birthplace"  clearable border="none"/>
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
                <Form.Item field="birthday" label="Birthday">
                    <DatePicker maskClosable mode="date" />
                </Form.Item>
                <Form.Item field="location" label="Location">
                    <Picker
                        cascade={false}
                        data={[['Beijing', 'Shanghai', 'Shenzhen']]}
                        maskClosable={true}
                    />
                </Form.Item>
                <Form.Item field="score" label="Score">
                    <Rate />
                </Form.Item>
                <Form.Item field="pictures" label="Pictures" initialValue={[
                    { url: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' }
                ]}>
                    <ImagePicker />
                </Form.Item>
                <Form.Item field="progress" label="Progress">
                    <Slider />
                </Form.Item>
                  <Form.Item field="comment" label="comment">

                    <Textarea
                        showStatistics={false}
                        placeholder="Please enter the description of no less than 10 characters"
                        border="none"
                        textareaStyle={{ height: 55 }}
                        autosize
                        autoHeight
                    />
                </Form.Item>
                <div>
                    <Button needActive onClick={toSubmit}>
                        Submit
                    </Button>
                    <Button type="ghost" onClick={toReset} style={{marginTop: '12px'}}>
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
}
```

```less
#demo-form {
    .form-custom-item-name-group {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
}

```
