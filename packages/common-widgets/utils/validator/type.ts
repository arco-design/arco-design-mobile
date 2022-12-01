import { ILocale } from '../locale';

export type IFieldValue = any;

export type IValidateLevel = 'error' | 'warning';
export enum ValidatorType {
    Number = 'number',
    String = 'string',
    Array = 'array',
    Boolean = 'boolean',
    Object = 'object',
    Custom = 'custom',
}

export interface IBaseRules {
    // 触发校验的时机
    validateTrigger?: string | string[];
    // 校验失败时候以 `error` 或 `warning` 形式展示错误信息。当设置为 `warning` 时不会阻塞表单提交
    validateLevel?: IValidateLevel;
    required?: boolean;
    length?: number;
    message?: string;
}
export interface INumberValidator extends IBaseRules {
    min?: number;
    max?: number;
    equal?: number;
    positive?: boolean;
    negative?: boolean;
}

export interface IArrayValidator extends IBaseRules {
    min?: number;
    max?: number;
    deepEqual?: Record<string, unknown>;
    includes?: boolean;
}

export interface IObjectValidator extends IBaseRules {
    deepEqual?: Record<string, unknown>;
    hasKeys?: string[];
}

export interface IStringValidator extends IBaseRules {
    min?: number;
    max?: number;
    len?: number;
    match?: RegExp;
    uppercase?: boolean;
    lowercase?: boolean;
    whitespace?: boolean;
}

export type ICustomValidatorFunc = (
    value: IFieldValue,
    callback: (message?: string) => void,
) => Promise<void> | void;
export interface ICustomValidator extends IBaseRules {
    validator?: ICustomValidatorFunc;
}

export type ValidatorTypeMap = {
    [ValidatorType.Number]: INumberValidator;
    [ValidatorType.String]: IArrayValidator;
    [ValidatorType.Array]: IArrayValidator;
    [ValidatorType.Boolean]: IArrayValidator;
    [ValidatorType.Object]: IObjectValidator;
    [ValidatorType.Custom]: ICustomValidator;
};
export type ITypeRules<T extends ValidatorType> = ValidatorTypeMap[T] & { type: T };
export type IRules = {
    [P in ValidatorType]: ITypeRules<P>;
}[ValidatorType];

export type InnerRules = IRules & { field: string };

export interface ValidatorError {
    value: IFieldValue;
    message?: string[];
    errorTypes: string[];
    validateLevel?: IValidateLevel;
}

export type IValidateMsgTemplate = Omit<ILocale['Form'], ''>;
export interface IValidateOption {
    validateMessage?: IValidateMsgTemplate;
    field: string;
}
