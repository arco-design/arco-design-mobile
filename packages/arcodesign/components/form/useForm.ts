/* eslint-disable no-console */
import { ReactNode, useRef } from 'react';
import { Callbacks, IFieldError, FieldItem, IFormInstance } from './type';

const defaultFunc: any = () => {};

export const defaultFormDataMethods = {
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
        };
    },
};

// 在field的静态的状态下设置
class FormData {
    private _formData: FieldItem = {}; // 数据源

    private _fieldsList = {}; // 字段列表

    private _initialValues: Record<string, unknown> = {}; // 初始值

    private _callbacks: Callbacks = {};

    setFieldsValue = (values: FieldItem): boolean => {
        this._formData = { ...this._formData, ...values };
        this.notifyField(values);
        Object.keys(values).forEach(key => {
            if (key in this._fieldsList) {
                this._fieldsList[key]?.onValueChange();
            }
        });
        return true;
    };

    setFieldValue = (name: string, value: unknown): boolean => {
        this._formData = { ...this._formData, [name]: value };
        const { onValuesChange } = this._callbacks;
        onValuesChange &&
            onValuesChange(
                {
                    [name]: value,
                },
                this._formData,
            );
        this.notifyField({ [name]: value });
        return true;
    };

    notifyField = (values: FieldItem): void => {
        Object.keys(values).map((fieldName: string) => {
            const fieldObj = this._fieldsList?.[fieldName] || null;
            if (fieldObj) {
                fieldObj.onValueChange(values[fieldName]);
            }
        });
    };

    getFieldsValue = (names?: string[]) => {
        if (names) {
            return names.map(name => this.getFieldValue(name));
        }
        return this._formData;
    };

    getFieldValue = (name: string) => {
        return this._formData?.[name];
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

    registerField = (name: string, self: ReactNode) => {
        this._fieldsList[name] = self;
        const { initialValue } = (self as any).props;
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

    setInitialValues = (initVal: Record<string, unknown>) => {
        this._initialValues = { ...(initVal || {}) };
        this.setFieldsValue(initVal);
    };

    resetFields = () => {
        this.setFieldsValue(this._initialValues);
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

    submit = async () => {
        this.validateFields()
            .then(result => {
                const { onSubmit } = this._callbacks;
                onSubmit?.(this._formData, result);
            })
            .catch(e => {
                const { onSubmitFailed } = this._callbacks;
                if (!onSubmitFailed) {
                    return;
                }
                onSubmitFailed(this._formData, e);
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
