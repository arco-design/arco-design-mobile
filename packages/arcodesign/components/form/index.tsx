import { componentWrapper, defaultLocale } from '@arco-design/mobile-utils';
import React, { useRef, forwardRef, Ref, useImperativeHandle, useEffect } from 'react';
import { ContextLayout } from '../context-provider';
import Item from './form-item';
import { FormItemContext } from './form-item-context';
import { FormProps, FormRef, InternalFormInstance } from './type';
import useForm from './useForm';

export { default as useForm } from './useForm';
export * from './type';

const Form = forwardRef((props: FormProps, ref: Ref<FormRef>) => {
    const {
        className = '',
        style,
        layout = 'horizontal',
        initialValues,
        form: formInstance,
        children,
        onValuesChange,
        onSubmit,
        onSubmitFailed,
        disabled,
    } = props;
    const domRef = useRef<HTMLFormElement | null>(null);
    const [form] = useForm(formInstance);
    const { setCallbacks, setInitialValues } = (form as InternalFormInstance).getInternalHooks();
    setCallbacks({
        onValuesChange,
        onSubmit,
        onSubmitFailed,
    });

    useEffect(() => {
        setInitialValues(initialValues || {});
    }, []);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        form,
    }));

    const contextValue = {
        form: form as InternalFormInstance,
        layout,
        disabled,
    };

    return (
        <ContextLayout>
            {({ prefixCls, locale = defaultLocale }) => (
                <form
                    className={`${prefixCls}-form ${className}`}
                    style={style}
                    ref={domRef}
                    onSubmit={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.submit();
                    }}
                >
                    <FormItemContext.Provider
                        value={{ ...contextValue, validateMessages: locale?.Form || {} }}
                    >
                        {children}
                    </FormItemContext.Provider>
                </form>
            )}
        </ContextLayout>
    );
});

/**
 * 表单组件用于集合数据录入
 * @en Form, Form for collecting data input
 * @type 数据录入
 * @type_en Data Entry
 * @name 表单
 * @name_en Form
 */
export default componentWrapper(Form, {
    Item,
});
