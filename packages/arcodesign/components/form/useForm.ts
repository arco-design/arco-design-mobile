/* eslint-disable no-console */
import { ReactNode, useRef } from 'react';
import { Promise } from 'es6-promise';
import {
    Callbacks,
    IFieldError,
    FieldItem,
    IFormInstance,
    FieldValue,
    InternalFormInstance,
    ValueChangeType,
} from './type';
import { deepClone } from './utils';

const defaultFunc: any = () => {};

export const defaultFormDataMethods: InternalFormInstance = {
    getFieldValue: name => name,
    getFieldsValue: _names => {
        return {};
    },
    getFieldError: _name => [],
    setFieldValue: (_name, _value) => {
        return true;
    },
    setFieldsValue: _values => {
        return true;
    },
    registerField: (_name, _self) => {
        return () => {};
    },
    resetFields: defaultFunc,
    validateFields: defaultFunc,
    submit: defaultFunc,

    getInternalHooks: () => {
        return {
            registerField: defaultFunc,
            setInitialValues: defaultFunc,
            setCallbacks: defaultFunc,
            getInitialValue: defaultFunc,
            setInitialValue: defaultFunc,
            innerSetFieldsValue: defaultFunc,
            innerSetFieldValue: defaultFunc,
        };
    },
};

// 在field的静态的状态下设置
class FormData {
    private _formData: FieldItem = {}; // 数据源

    private _fieldsList = {}; // 字段列表

    private _initialValues: Record<string, unknown> = {}; // 初始值

    private _callbacks: Callbacks = {};

    private commonSetFieldsValue = (values: FieldItem, changeType?: ValueChangeType) => {
        const oldValues: FieldItem = Object.keys(values).reduce(
            (acc, key) => ({
                ...acc,
                [key]: this.getFieldValue(key),
            }),
            {},
        );
        this._formData = { ...this._formData, ...values };
        this.notifyField(values, oldValues, changeType);
    };

    setFieldsValue = (values: FieldItem): boolean => {
        this.commonSetFieldsValue(values);
        const { onValuesChange } = this._callbacks;
        onValuesChange?.(values, this._formData);
        return true;
    };

    innerSetFieldsValue = (values: FieldItem, changeType?: ValueChangeType): boolean => {
        this.commonSetFieldsValue(values, changeType);
        const { onValuesChange, onChange } = this._callbacks;
        onValuesChange?.(values, this._formData);
        onChange?.(values, this._formData);
        return true;
    };

    commonSetFieldValue = (name: string, value: unknown, changeType?: ValueChangeType) => {
        const oldValues = { [name]: this.getFieldValue(name) };
        this._formData = { ...this._formData, [name]: value };
        this.notifyField({ [name]: value }, oldValues, changeType);
    };

    setFieldValue = (name: string, value: FieldValue): boolean => {
        this.commonSetFieldValue(name, value);
        const { onValuesChange } = this._callbacks;
        onValuesChange &&
            onValuesChange(
                {
                    [name]: value,
                },
                this.getFieldsValue(),
            );
        return true;
    };

    innerSetFieldValue = (
        name: string,
        value: FieldValue,
        changeType?: ValueChangeType,
    ): boolean => {
        this.commonSetFieldValue(name, value, changeType);
        const { onValuesChange, onChange } = this._callbacks;
        onValuesChange &&
            onValuesChange(
                {
                    [name]: value,
                },
                this._formData,
            );
        onChange &&
            onChange(
                {
                    [name]: value,
                },
                this._formData,
            );
        return true;
    };

    notifyField = (
        values: FieldItem,
        oldValues: FieldItem,
        changeType: ValueChangeType = ValueChangeType.Update,
    ): void => {
        Object.keys(values).map((fieldName: string) => {
            const fieldObj = this._fieldsList?.[fieldName] || null;
            if (fieldObj) {
                fieldObj.onValueChange(values[fieldName], oldValues[fieldName], {
                    changeType,
                });
            }
        });
    };

    getFieldsValue = (names?: string[]) => {
        if (names) {
            return names.map(name => this.getFieldValue(name));
        }
        return deepClone(this._formData);
    };

    getFieldValue = (name: string) => {
        return deepClone(this._formData?.[name]);
    };

    getFieldError = (name: string): ReactNode[] => {
        const field = this._fieldsList?.[name] || null;
        if (field) {
            return field.getFieldError();
        }
        return [];
    };

    getFieldsError = (names?: string[]): Record<string, ReactNode[]> => {
        const fields = names || Object.keys(this._fieldsList);
        return fields.reduce((pre: Record<string, ReactNode[]>, name) => {
            const theField = this._fieldsList?.[name];
            if (theField) {
                pre[name] = theField?.getFieldError();
            }
            return pre;
        }, {});
    };

    isFieldTouched = (name: string): boolean => {
        const field = this._fieldsList?.[name] || null;
        if (field) {
            return field.isFieldTouched();
        }
        return false;
    };

    registerField = (name: string, self: any) => {
        this._fieldsList[name] = self;
        const { initialValue } = self.props;
        if (initialValue !== undefined && name) {
            this._initialValues = {
                ...this._initialValues,
                [name]: initialValue,
            };
            this.setFieldsValue({
                ...this._formData,
                [name]: initialValue,
            });
        }

        return () => {
            if (name in this._fieldsList) {
                delete this._fieldsList[name];
                delete this._formData[name];
            }
        };
    };

    setInitialValues = (initVal: FieldItem) => {
        this._initialValues = deepClone(initVal || {});
        this.setFieldsValue(initVal);
    };

    setInitialValue = (fieldName: string, value: unknown) => {
        if (!fieldName) {
            return;
        }
        this._initialValues[fieldName] = value;
        this.setFieldValue(fieldName, value);
    };

    getInitialValue = (fieldName: string) => {
        return this._initialValues[fieldName];
    };

    resetFields = () => {
        const oldValues = { ...this._formData };
        const initialValues = {};
        Object.keys(this._formData).forEach((fieldName: string) => {
            const fieldObj = this._fieldsList?.[fieldName] || null;
            if (fieldObj) {
                initialValues[fieldName] = fieldObj.getInitialValue();
            }
        });
        const { onValuesChange } = this._callbacks;
        onValuesChange && onValuesChange(initialValues, this._formData);
        this._formData = initialValues;
        this.notifyField(initialValues, oldValues, ValueChangeType.Reset);
    };

    validateFields = () => {
        const promiseList: Promise<IFieldError>[] = [];
        Object.values(this._fieldsList).forEach((entity: any) => {
            const promise = entity.validateField();
            promiseList.push(promise.then(errors => errors));
        });
        const summaryPromise: Promise<IFieldError[]> = new Promise((resolve, reject) => {
            Promise.all(promiseList).then(res => {
                const errorResults = res.filter(item => item?.errors?.length);

                if (errorResults.length) {
                    reject(errorResults);
                } else {
                    resolve(res);
                }
            });
        });
        return summaryPromise;
    };

    submit = () => {
        this.validateFields()
            .then(result => {
                const { onSubmit } = this._callbacks;
                onSubmit?.(this.getFieldsValue(), result);
            })
            .catch(e => {
                const { onSubmitFailed } = this._callbacks;
                if (!onSubmitFailed) {
                    return;
                }
                onSubmitFailed(this.getFieldsValue(), e);
            });
    };

    setCallbacks = (callbacks: Callbacks) => {
        this._callbacks = callbacks;
    };

    getMethods = () => {
        return {
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            getFieldError: this.getFieldError,
            getFieldsError: this.getFieldsError,
            isFieldTouched: this.isFieldTouched,
            registerField: this.registerField,
            resetFields: this.resetFields,
            submit: this.submit,
            getInternalHooks: this.getInternalHooks,
            validateFields: this.validateFields,
        };
    };

    getInternalHooks = () => {
        return {
            registerField: this.registerField,
            setInitialValues: this.setInitialValues,
            setCallbacks: this.setCallbacks,
            getInitialValue: this.getInitialValue,
            setInitialValue: this.setInitialValue,
            innerSetFieldsValue: this.innerSetFieldsValue,
            innerSetFieldValue: this.innerSetFieldValue,
        };
    };
}

export default function useForm(form?: IFormInstance) {
    const formInstanceRef = useRef<IFormInstance>(defaultFormDataMethods);
    const isSingletonRef = useRef<boolean>(false);
    if (!isSingletonRef.current) {
        if (form) {
            formInstanceRef.current = form;
        } else {
            const formIns = new FormData();
            formInstanceRef.current = formIns.getMethods();
        }
        isSingletonRef.current = true;
    }
    return [formInstanceRef.current];
}
