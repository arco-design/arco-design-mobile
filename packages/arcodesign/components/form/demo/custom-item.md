## 自定义表单项 @en{Custom Form Item}

#### 3

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
    names: [{
       type: ValidatorType.Custom,
            validator: (val, callback) => {
                if (!val?.firstName) {
                    callback('Please input your first name');
                } else if (!val?.familyName) {
                    callback('Please input your family name');
                } else {
                    callback();
                }
            },
    }]
}


function CustomInput(props) {
  const value = props.value || {};

  const handleChange = (newValue) => {
    props.onChange && props.onChange(newValue);
  };

  console.log(value);

  return (
   <div className='form-custom-item-name-group'><Input
            placeholder="First Name"
            clearable
            border="none"
            value={value.firstName}
            onChange={(_, v) => {
                handleChange({ ...value, firstName: v });
            }}
            style={{marginRight: '12px'}}
        /><Input
            placeholder="Family Name"
            clearable
            border="none"
            value={value.familyName}
            onChange={(_, v) => {
                handleChange({ ...value, familyName: v });
            }}
        /></div>
  );
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
                initialValues={{ birthday: 1449730183515 }}
            >
                <Form.Item field="names" label="Names" rules={rules.names} required>
                    <CustomInput />
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
                    { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' }
                ]}>
                    <ImagePicker />
                </Form.Item>

                <Button needActive onClick={toSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
```
