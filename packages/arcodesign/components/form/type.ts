import { IRules } from '@arco-design/mobile-utils';
import { ReactNode } from 'react';

export type FieldValue = any;
export type FieldItem = Record<string, any>;
export type ILayout = 'horizontal' | 'vertical' | 'inline';
export interface IFormProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 表单项布局
     * @en Form item layout
     */
    layout?: ILayout;
    /**
     * 表单实例
     * @en Form instance
     */
    form?: IFormInstance;
    /**
     * 表单初始数据
     * @en Form initial value
     */
    initialValues?: FieldItem;
    children: React.ReactNodeArray | ReactNode;
    /**
     * 表单项数据变化时的回调
     * @en Callback when the form item value changes
     */
    onValuesChange?: Callbacks['onValuesChange'];
    /**
     * 表单项数据变化时的回调
     * @en Callback when the form is submitted
     */
    onSubmit?: Callbacks['onSubmit'];
    /**
     * 表单项数据变化时的回调
     * @en Callback when the form is submitted failed
     */
    onSubmitFailed?: Callbacks['onSubmitFailed'];
    /**
     * 表单禁止输入
     * @en disable all form items
     */
    disabled?: boolean;
}

export interface IFieldError {
    value?: FieldValue;
    errors?: ReactNode[];
    warnings?: ReactNode[];
    field?: string;
    dom?: HTMLDivElement | null;
}
export interface IFormDataMethods {
    setFieldsValue: (values: FieldItem) => boolean;
    setFieldValue: (name: string, value: FieldValue) => boolean;
    getFieldsValue: (names?: string[]) => FieldItem;
    getFieldValue: (name: string) => FieldValue;
    registerField: (name: string, self: ReactNode) => () => void;
}

export enum ValidateStatus {
    Init = 'init',
    Error = 'error',
    Warning = 'warning',
    Validating = 'validating',
    Success = 'success',
}

export interface Callbacks {
    onValuesChange?: (changedValues: FieldValue, values: FieldValue) => void;
    onSubmit?: (values: FieldValue, otherInfo?: IFieldError[]) => void;
    onSubmitFailed?: (values: FieldValue, errorInfo: IFieldError[] | Error) => void;
}

export interface InternalHooks {
    registerField: (name: string, self: ReactNode) => () => void;
    setInitialValues: (values: FieldItem) => void;
    setCallbacks: (callbacks: Callbacks) => void;
}

export interface IFormInstance {
    getFieldValue: (name: string) => FieldValue;
    getFieldsValue(name?: string[]): FieldItem;
    resetFields: () => void;
    setFieldsValue: (value: FieldItem) => void;
    validateFields: () => Promise<FieldItem>;
    submit: () => void;
}

export type InternalFormInstance = Omit<IFormInstance, 'validateFields'> & {
    validateFields: () => Promise<FieldItem>;
    getInternalHooks: () => InternalHooks;
};

export interface IFormItemContext {
    form: InternalFormInstance;
    layout: ILayout;
    disabled?: boolean;
    validateMessages?: Record<string, unknown>;
}

export type IShouldUpdateFunc = (data: { preStore: FieldItem; curStore: FieldItem }) => boolean;
export interface IFormItemProps {
    label: ReactNode;
    style?: React.CSSProperties;
    field: string;
    required?: boolean;
    disabled?: boolean;
    layout?: ILayout;
    children: JSX.Element;
    shouldUpdate?: boolean | IShouldUpdateFunc;
    rules?: IRules[];
    extra: JSX.Element;
    trigger?: string;
    requiredIcon: ReactNode;
    initialValue?: FieldValue;
}
export interface IFormItemInnerProps {
    field: string;
    children: JSX.Element;
    shouldUpdate?: boolean | IShouldUpdateFunc;
    rules?: IRules[];
    trigger?: string;
    onValidateStatusChange: (data: { errors: any; warnings: any }) => void;
    getFormItemRef: () => HTMLDivElement | null;
    triggerPropsField?: string;
    disabled?: boolean;
    initialValue?: FieldValue;
}
