import { componentWrapper, defaultLocale } from '@arco-design/mobile-utils';
import React, { useRef, forwardRef, Ref, useImperativeHandle, useEffect } from 'react';
import { ContextLayout } from '../context-provider';
import FormItem from './form-item';
import { FormItemContext } from './form-item-context';
import { IFormProps, InternalFormInstance } from './type';
import useForm from './useForm';

export interface FormRef {
    /** 最外层元素 DOM */
    dom: HTMLFormElement | null;
}

/**
 * 表单组件用于集合数据录入
 * @en Form
 * @type 数据录入
 * @type_en Data Entry
 * @name 表单
 * @name_en Form
 */
const Form = forwardRef((props: IFormProps, ref: Ref<FormRef>) => {
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

    const mountRef = React.useRef<boolean>(true);
    useEffect(() => {
        // just initialize once
        mountRef.current && setInitialValues(initialValues || {});
        if (!mountRef.current) {
            mountRef.current = false;
        }
    }, [initialValues]);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
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

export { FormItem, useForm };
export default componentWrapper(Form, {
    FormItem,
    useForm,
});
