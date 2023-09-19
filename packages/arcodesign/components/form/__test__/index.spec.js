import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Form, { useForm } from '..';
import Input from '../../input';

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
            expect(screen.getByText('test 为必填项')).not.toBeUndefined();
        });
    });
    it('useForm', async () => {
        const onSubmit = jest.fn();
        const onSubmitFailed = jest.fn();
        const result = {};
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
                        <Form.Item field="baz" rules={[{ validateLevel: 'warning', match: /\d+/ }]}>
                            <Input type="text" />
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
                                form.setFieldsValue({ foo: 'foo', bar: 'bar' });
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
                    </Form>
                </div>
            );
        }
        render(<App onSubmit={onSubmit} onSubmitFailed={onSubmitFailed} result={result} />);
        const submitBtn = screen.getByRole('button', { name: 'submit' });
        await userEvent.click(submitBtn);
        const error = await screen.findByText('required');
        await waitFor(() => {
            expect(error).not.toBeUndefined();
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
        const btn3 = screen.getByRole('button', { name: 'getValue' });
        await userEvent.click(btn3);
        await waitFor(() => {
            expect(result).toMatchObject({
                foo: 'foo',
                bar: 'bar',
                all: { foo: 'foo', bar: 'bar' },
            });
        });
    });
});
