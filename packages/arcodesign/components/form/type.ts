import { IRules } from '@arco-design/mobile-utils';
import { ReactElement, ReactNode } from 'react';
import { Promise } from 'es6-promise';

export type FieldValue = any;
export type FieldItem = Record<string, FieldValue>;
export type ILayout = 'horizontal' | 'vertical' | 'inline';

// 注意：自动识别form关联组件的依据，请勿轻易改变代码结构
// Notice: Automatically identify the basis of the associated component of the form, DO NOT change the code structure.
export enum FormInternalComponentType {
    Input = 'Input',
    Textarea = 'Textarea',
    Checkbox = 'Checkbox',
    CheckboxGroup = 'CheckboxGroup',
    DatePicker = 'DatePicker',
    Picker = 'Picker',
    Radio = 'Radio',
    RadioGroup = 'RadioGroup',
    Slider = 'Slider',
    Switch = 'Switch',
    ImagePicker = 'ImagePicker',
    Rate = 'Rate',
    Stepper = 'Stepper',
}

export interface FormProps {
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
     * @default "horizontal"
     */
    layout?: 'horizontal' | 'vertical' | 'inline';
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
    children: ReactNode[] | ReactNode;
    /**
     * 表单项数据变化时的回调
     * @en Callback when the form item value changes
     */
    onValuesChange?: Callbacks['onValuesChange'];
    /**
     * 表单项数据变化时的回调（仅用户操作表单时触发）
     * @en Callback when the form item value changes (Only trigger when user operate form)
     */
    onChange?: Callbacks['onChange'];
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
    /**
     * 设置多个表单项值
     * @en Set multiple field value
     */
    setFieldsValue: (values: FieldItem) => boolean;
    /**
     * 设置单个表单项值
     * @en Set field value
     */
    setFieldValue: (name: string, value: FieldValue) => boolean;
    /**
     * 获取多个表单项值
     * @en Get multiple field value
     */
    getFieldsValue: (names?: string[]) => FieldItem;
    /**
     * 获取单个表单项值
     * @en Get field value
     */
    getFieldValue: (name: string) => FieldValue;
    /**
     * 注册表单项
     * @en Register field
     */
    registerField: (name: string, self: any) => () => void;
}

export enum ValidateStatus {
    Init = 'init',
    Error = 'error',
    Warning = 'warning',
    Validating = 'validating',
    Success = 'success',
}

export interface Callbacks {
    /**
     * 表单项数据变化时的回调
     * @en Callback when the form item value changes
     */
    onValuesChange?: (changedValues: FieldValue, values: FieldValue) => void;
    /**
     * 表单项数据变化时的回调（仅用户操作表单时触发）
     * @en Callback when the form item value changes (Only trigger when user operate form)
     */
    onChange?: (changedValues: FieldValue, values: FieldValue) => void;
    /**
     * 表单项数据变化时的回调
     * @en Callback when the form is submitted
     */
    onSubmit?: (values: FieldValue, otherInfo?: IFieldError[]) => void;
    /**
     * 表单项数据变化时的回调
     * @en Callback when the form is submitted failed
     */
    onSubmitFailed?: (values: FieldValue, errorInfo: IFieldError[] | Error) => void;
}

export interface InternalHooks {
    /**
     * 注册表单项
     * @en Register field
     */
    registerField: (name: string, self: any) => () => void;
    setInitialValues: (values: FieldItem) => void;
    setCallbacks: (callbacks: Callbacks) => void;
    getInitialValue: (fieldName: string) => FieldValue;
    setInitialValue: (fieldName: string, values: FieldItem) => void;
    innerSetFieldsValue: (values: FieldItem) => boolean;
    innerSetFieldValue: (name: string, value: FieldValue) => boolean;
}

export interface IFormInstance {
    /**
     * 获取单个表单项值
     * @en Get field value
     */
    getFieldValue: (name: string) => FieldValue;
    /**
     * 获取多个表单项值
     * @en Get multiple field value
     */
    getFieldsValue(name?: string[]): FieldItem;
    /**
     * 获取单个表单项的错误
     * @en Get field errors
     */
    getFieldError(name: string): ReactNode[];
    /**
     * 重置表单项
     * @en Reset fields
     */
    resetFields: () => void;
    /**
     * 设置单个表单项值
     * @en Set field value
     */
    setFieldValue: (name: string, value: FieldValue) => boolean;
    /**
     * 设置多个表单项值
     * @en Set multiple field value
     */
    setFieldsValue: (value: FieldItem) => void;
    /**
     * 校验所有表单项
     * @en Validate all fields
     */
    validateFields: () => Promise<IFieldError[]>;
    /**
     * 提交表单
     * @en Submit all fields
     */
    submit: () => void;
}

export type InternalFormInstance = IFormInstance & {
    /**
     * 获取内部方法
     * @en Get internal methods
     */
    getInternalHooks: () => InternalHooks;
    /**
     * 注册表单组件
     * @en Register Form Item component
     */
    registerField: (name: string, self: any) => () => void;
};

export interface FormRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLFormElement | null;
    /**
     * Form对象实例
     * @en Form object instance
     */
    form: IFormInstance;
}

export interface IFormItemContext {
    /**
     * Form对象实例
     * @en Form object instance
     */
    form: InternalFormInstance;
    /**
     * 表单布局方式
     * @en Form layout
     */
    layout: 'horizontal' | 'vertical' | 'inline';
    /**
     * 表单是否禁用
     * @en Whether form is disabled
     */
    disabled?: boolean;
    /**
     * 表单校验项定义
     * @en Validating message of form
     */
    validateMessages?: Record<string, unknown>;
}

export type IShouldUpdateFunc = (data: { preValue: any; curValue: any }) => boolean;
export interface FormItemProps {
    /**
     * 表单项名
     * @en The form item name
     */
    label: ReactNode;
    /**
     * 表单项Stylesheet
     * @en The form item stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 表单项样式
     * @en The form item class name
     */
    className?: string;
    /**
     * 表单项字段
     * @en Form item field
     */
    field: string;
    /**
     * 表单项是否必填
     * @en Whether Form item is required
     */
    required?: boolean;
    /**
     * 表单项是否禁用
     * @en Whether Form item is disabled
     */
    disabled?: boolean;
    /**
     * 表单项布局
     * @en Form item layout
     * @default "horizontal"
     */
    layout?: 'horizontal' | 'vertical' | 'inline';
    /**
     * 表单项子节点
     * @en Form item children
     */
    children: ReactElement;
    /**
     * 表单项是否刷新
     * @en Form item is updated
     */
    shouldUpdate?: IShouldUpdateFunc;
    /**
     * 表单项规则
     * @en Form item rules
     */
    rules?: IRules[];
    /**
     * 表单项下方节点
     * @en Form item extra node
     */
    extra?: ReactElement;
    /**
     * 触发事件更新事件名称
     * @en The function name when updating data
     * @default "onChange"
     */
    trigger?: string;
    /**
     * 自定义必填标识
     * @en The required icon node
     */
    requiredIcon?: ReactNode;
    /**
     * 表单项初始数据
     * @en The initial value of form item
     */
    initialValue?: FieldValue;
    /**
     * 手动指定为内置组件的类型
     * @en Manually specified as the type of internal component
     */
    displayType?: FormInternalComponentType;
}

export interface FormItemRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

export interface IFormItemInnerProps {
    /**
     * 表单项字段
     * @en Form item field
     */
    field: string;
    /**
     * 表单项子节点
     * @en Form item children
     */
    children: ReactElement<any, any>;
    /**
     * 表单项是否刷新
     * @en Form item is updated
     */
    shouldUpdate?: IShouldUpdateFunc;
    /**
     * 表单项下方节点
     * @en Form item extra node
     */
    rules?: IRules[];
    /**
     * 触发事件更新事件名称
     * @en The function name when updating data
     * @default "onChange"
     */
    trigger?: string;
    /**
     * 校验状态变化回调
     * @en The callback when validating status changes
     */
    onValidateStatusChange: (data: {
        errors: ReactNode[];
        warnings: ReactNode[];
        errorTypes: string[];
    }) => void;
    /**
     * 获取内部表单项的dom
     * @en The dom of inner form item
     */
    getFormItemRef: () => HTMLDivElement | null;
    /**
     * 自定义表单项存储值的字段名
     * @en The field name for custom form item
     * @default "value"
     */
    triggerPropsField?: string;
    /**
     * 表单项是否禁用
     * @en Whether Form item is disabled
     */
    disabled?: boolean;
    /**
     * 表单项初始数据
     * @en The initial value of form item
     */
    initialValue?: FieldValue;
    /**
     * 手动指定为内置组件的类型
     * @en Manually specified as the type of internal component
     */
    displayType?: FormInternalComponentType;
}

export enum ValueChangeType {
    /* form update */
    Update,
    /* form clear */
    Reset,
}
