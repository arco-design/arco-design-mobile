import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Form, { useForm } from '..';
import Input from '../../input';
import Switch from '../../switch';
import Picker from '../../picker';
import Textarea from '../../textarea';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import Slider from '../../slider';
import Rate from '../../rate';
import '@testing-library/jest-dom';

demoTest('form');

mountTest(Form, 'Form');

describe('Form input', () => {
    it('input correctly', async () => {
        const { container } = render(
            <Form>
                <Form.Item label="test" field="test">
                    <Input clearable clearShowType="always" />
                </Form.Item>
            </Form>,
        );
        const inputEl = screen.getByRole('textbox');
        userEvent.type(inputEl, 'foo');
        await waitFor(() => {
            expect(inputEl.value).toBe('foo');
        });
        const clearIcon = container.querySelector('.arco-input-clear');
        userEvent.click(clearIcon);
        await waitFor(() => {
            expect(inputEl.value).toBe('');
        });
    });
    it('required validate correctly', async () => {
        const formRef = React.createRef();
        render(
            <Form ref={formRef}>
                <Form.Item label="test" field="test" required>
                    <Input clearable clearShowType="always" />
                </Form.Item>
            </Form>,
        );
        act(() => {
            formRef.current.form.validateFields().catch(() => {});
        });
        await waitFor(() => {
            expect(screen.getByText('test 为必填项')).toBeInTheDocument();
        });
    });
    it('useForm', async () => {
        const onSubmit = jest.fn();
        const onSubmitFailed = jest.fn();
        const result = {};
        const changeValues = {};
        const innerChangeValues = {};
        // eslint-disable-next-line @typescript-eslint/no-shadow
        function App({ onSubmit, onSubmitFailed }) {
            const [form] = useForm();
            return (
                <div>
                    <Form
                        form={form}
                        initialValues={{ baz: 'baz' }}
                        onSubmit={onSubmit}
                        onSubmitFailed={onSubmitFailed}
                        onValuesChange={(changeVal, values) => {
                            Object.assign(changeValues, {
                                change: changeVal,
                                all: values,
                            });
                        }}
                        onChange={val => {
                            Object.assign(innerChangeValues, val);
                        }}
                    >
                        <Form.Item
                            field="foo"
                            label="foo"
                            rules={[{ required: true, message: 'required' }]}
                        >
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item field="bar" label="bar" required>
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item
                            field="baz"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    validateLevel: 'warning',
                                    match: /\d+/,
                                    validateTrigger: 'onBlur',
                                },
                            ]}
                        >
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item field="isOpen">
                            <Switch />
                        </Form.Item>
                        <Form.Item field="comment" label="comment" initialValue="1">
                            <Textarea
                                showStatistics={false}
                                placeholder="Please enter the description of no less than 10 characters"
                                border="none"
                                textareaStyle={{ height: 55 }}
                                autosize
                                autoHeight
                            />
                        </Form.Item>
                        <Form.Item field="gender" label="Gender">
                            <Radio.Group
                                options={[
                                    { label: 'male', value: '1' },
                                    { label: 'female', value: '2' },
                                    { label: 'others', value: '3' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item field="checkbox" label="Checkbox">
                            <Checkbox.Group layout="block">
                                <Checkbox value={1}>Option content 1</Checkbox>
                                <Checkbox value={2}>Option content 2</Checkbox>
                                <Checkbox value={3}>Option content 3</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item field="progress" label="Progress">
                            <Slider />
                        </Form.Item>
                        <Form.Item field="score" label="Score">
                            <Rate />
                        </Form.Item>
                        <Form.Item field="location" label="Location">
                            <Picker
                                cascade={false}
                                data={[['Beijing', 'Shanghai', 'Shenzhen']]}
                                maskClosable
                            />
                        </Form.Item>
                        <button
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            submit
                        </button>
                        <button
                            onClick={() => {
                                Object.assign(result, {
                                    foo: form.getFieldsError(['foo']).foo,
                                    bar: form.getFieldError('bar'),
                                    all: form.getFieldsError(),
                                });
                            }}
                        >
                            getError
                        </button>
                        <button
                            onClick={() => {
                                form.setFieldsValue({
                                    foo: 'foo',
                                    bar: 'bar',
                                    score: 3,
                                    progress: 50,
                                    gender: '1',
                                    checkbox: [1],
                                    location: ['Beijing'],
                                });
                            }}
                        >
                            setValue
                        </button>
                        <button
                            onClick={() => {
                                Object.assign(result, {
                                    foo: form.getFieldsValue(['foo'])[0],
                                    bar: form.getFieldValue('bar'),
                                    all: form.getFieldsValue(),
                                });
                            }}
                        >
                            getValue
                        </button>
                        <button
                            onClick={() => {
                                form.resetFields();
                                Object.assign(result, form.getFieldsValue());
                            }}
                        >
                            reset
                        </button>
                    </Form>
                </div>
            );
        }
        const { container } = render(
            <App onSubmit={onSubmit} onSubmitFailed={onSubmitFailed} result={result} />,
        );
        const submitBtn = screen.getByRole('button', { name: 'submit' });
        await userEvent.click(submitBtn);
        const error = await screen.findByText('required');
        await waitFor(() => {
            expect(error).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(onSubmitFailed).toBeCalled();
        });
        const btn1 = screen.getByRole('button', { name: 'getError' });
        await userEvent.click(btn1);
        await waitFor(() => {
            expect(result).toMatchObject({
                foo: ['required'],
                bar: ['bar 为必填项'],
                all: { foo: ['required'], bar: ['bar 为必填项'] },
            });
        });
        const btn2 = screen.getByRole('button', { name: 'setValue' });
        await userEvent.click(btn2);
        await userEvent.click(submitBtn);
        await waitFor(() => {
            expect(onSubmit).toBeCalled();
        });
        await waitFor(() => {
            expect(changeValues).toMatchObject({
                change: {
                    foo: 'foo',
                    bar: 'bar',
                },
                all: {
                    foo: 'foo',
                    bar: 'bar',
                },
            });
        });
        const btn3 = screen.getByRole('button', { name: 'getValue' });
        await userEvent.click(btn3);
        await waitFor(() => {
            expect(result).toMatchObject({
                foo: 'foo',
                bar: 'bar',
                all: { foo: 'foo', bar: 'bar' },
            });
        });

        const textArea = container.querySelector('textarea');
        userEvent.type(textArea, '1');
        await waitFor(() => {
            expect(innerChangeValues).toMatchObject({
                comment: '11',
            });
        });
        const btn4 = screen.getByRole('button', { name: 'reset' });
        await userEvent.click(btn4);
        await waitFor(() => {
            expect(result).toMatchObject({ baz: 'baz' });
        });
    });
});


describe('Form validate label', () => {
    // Scenario 1: Default Scenario (labelName only)
    it('should use labelName for display and validation when label is missing', async () => {
        const formRef = React.createRef();
        render(
            <Form ref={formRef}>
                <Form.Item labelName="Label Name Only" field="label_name_only" required>
                    <Input />
                </Form.Item>
            </Form>,
        );
        // Check display
        expect(screen.getByText('Label Name Only')).toBeInTheDocument();
        
        // Check validation
        act(() => {
            formRef.current.form.validateFields().catch(() => {});
        });
        await waitFor(() => {
            expect(screen.getByText('Label Name Only 为必填项')).toBeInTheDocument();
        });
    });

    // Scenario 2: ReactNode Customization (label + labelName)
    it('should use label for display and labelName for validation when both provided (label is Node)', async () => {
        const formRef = React.createRef();
        render(
            <Form ref={formRef}>
                <Form.Item 
                    label={<span>Complex Label</span>} 
                    labelName="Label Name Validation" 
                    field="complex_custom" 
                    required
                >
                    <Input />
                </Form.Item>
            </Form>,
        );
        // Check display (should render ReactNode)
        expect(screen.getByText('Complex Label')).toBeInTheDocument();
        
        // Check validation (should use labelName)
        act(() => {
            formRef.current.form.validateFields().catch(() => {});
        });
        await waitFor(() => {
            expect(screen.getByText('Label Name Validation 为必填项')).toBeInTheDocument();
        });
    });

    // Scenario 3a: String Label Only
    it('should use string label for display and validation', async () => {
        const formRef = React.createRef();
        render(
            <Form ref={formRef}>
                <Form.Item label="String Label" field="string_label" required>
                    <Input />
                </Form.Item>
            </Form>,
        );
        // Check display
        expect(screen.getByText('String Label')).toBeInTheDocument();
        
        // Check validation
        act(() => {
            formRef.current.form.validateFields().catch(() => {});
        });
        await waitFor(() => {
            expect(screen.getByText('String Label 为必填项')).toBeInTheDocument();
        });
    });

    // Scenario 3b: ReactNode Label Only
    it('should use ReactNode for display and field for validation when labelName missing', async () => {
        const formRef = React.createRef();
        render(
            <Form ref={formRef}>
                <Form.Item label={<span>Node Label</span>} field="node_field" required>
                    <Input />
                </Form.Item>
            </Form>,
        );
        // Check display
        expect(screen.getByText('Node Label')).toBeInTheDocument();
        
        // Check validation (fallback to field)
        act(() => {
            formRef.current.form.validateFields().catch(() => {});
        });
        await waitFor(() => {
            expect(screen.getByText('node_field 为必填项')).toBeInTheDocument();
        });
    });

    // Edge Case: String Label + Label Name
    // Rule says: "Default scenario... prioritize labelName... used for Display"
    // BUT "ReactNode Customization... Must provide both... label used for rendering"
    // Since we treat provided label as "Customization/Override", label (string) should override display, but labelName should override validation?
    // Let's verify behavior matches implementation:
    // Display: label ?? labelName -> label
    // Validation: labelName || label -> labelName
    it('should use label for display and labelName for validation if both strings are provided', async () => {
        const formRef = React.createRef();
        render(
            <Form ref={formRef}>
                <Form.Item 
                    label="Display String" 
                    labelName="Validation String" 
                    field="mixed_string" 
                    required
                >
                    <Input />
                </Form.Item>
            </Form>,
        );
        // Check display
        expect(screen.getByText('Display String')).toBeInTheDocument();
        // Check validation
        act(() => {
            formRef.current.form.validateFields().catch(() => {});
        });
        await waitFor(() => {
            expect(screen.getByText('Validation String 为必填项')).toBeInTheDocument();
        });
    });
});