import { IRules } from '@arco-design/mobile-utils';
import { ReactNode } from 'react';

export type FieldValue = any;
export type FieldItem = Record<string, any>;
export type ILayout = 'horizontal' | 'vertical' | 'inline';

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
     * 重置表单项
     * @en Reset fields
     */
    resetFields: () => void;
    /**
     * 设置多个表单项值
     * @en Set multiple field value
     */
    setFieldsValue: (value: FieldItem) => void;
    /**
     * 校验所有表单项
     * @en Validate all fields
     */
    validateFields: () => Promise<FieldItem>;
    /**
     * 提交表单
     * @en Submit all fields
     */
    submit: () => void;
}

export type InternalFormInstance = Omit<IFormInstance, 'validateFields'> & {
    /**
     * 校验所有表单项
     * @en Validate all fields
     */
    validateFields: () => Promise<FieldItem>;
    /**
     * 获取内部方法
     * @en Get internal methods
     */
    getInternalHooks: () => InternalHooks;
};

export interface IFormRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLFormElement | null;
}

export interface IFormItemContext {
    form: InternalFormInstance;
    layout: ILayout;
    disabled?: boolean;
    validateMessages?: Record<string, unknown>;
}

export type IShouldUpdateFunc = (data: { preStore: FieldItem; curStore: FieldItem }) => boolean;
export interface IFormItemProps {
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
     */
    layout?: ILayout;
    /**
     * 表单项子节点
     * @en Form item children
     */
    children: JSX.Element;
    /**
     * 表单项是否刷新
     * @en Form item is updated
     */
    shouldUpdate?: boolean | IShouldUpdateFunc;
    /**
     * 表单项规则
     * @en Form item rules
     */
    rules?: IRules[];
    /**
     * 表单项下方节点
     * @en Form item extra node
     */
    extra?: JSX.Element;
    /**
     * 触发事件更新事件名称
     * @en The function name when updating data
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

export interface IFormItemRef {
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
    children: JSX.Element;
    /**
     * 表单项是否刷新
     * @en Form item is updated
     */
    shouldUpdate?: boolean | IShouldUpdateFunc;
    /**
     * 表单项下方节点
     * @en Form item extra node
     */
    rules?: IRules[];
    /**
     * 触发事件更新事件名称
     * @en The function name when updating data
     */
    trigger?: string;
    /**
     * 校验状态变化回调
     * @en The callback when validating status changes
     */
    onValidateStatusChange: (data: { errors: any; warnings: any }) => void;
    getFormItemRef: () => HTMLDivElement | null;
    triggerPropsField?: string;
    disabled?: boolean;
    /**
     * 表单项初始数据
     * @en The initial value of form item
     */
    initialValue?: FieldValue;
    displayType?: FormInternalComponentType;
}
