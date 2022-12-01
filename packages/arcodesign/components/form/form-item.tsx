/* eslint-disable react/no-unused-class-component-methods */
import React, { PureComponent, ReactNode, useContext, useRef, useState } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { Validator } from '@arco-design/mobile-utils/utils/validator/validator';
import { ValidatorError, ValidatorType } from '@arco-design/mobile-utils/utils/validator/type';
import { FormItemContext } from './form-item-context';
import { GlobalContext } from '../context-provider';
import {
    IFieldError,
    FieldItem,
    FieldValue,
    IFormDataMethods,
    IFormItemContext,
    IFormItemInnerProps,
    IFormItemProps,
    ValidateStatus,
} from './type';
import { getErrorAndWarnings, isFieldRequired } from './utils';

enum InternalComponentType {
    Input = 'ADMInput',
    Textarea = 'ADMTextarea',
    Checkbox = 'ADMCheckbox',
    CheckboxGroup = 'ADMCheckboxGroup',
    DatePicker = 'ADMDatePicker',
    Picker = 'ADMPicker',
    Radio = 'ADMRadio',
    RadioGroup = 'ADMRadioGroup',
    Slider = 'ADMSlider',
    Switch = 'ADMSwitch',
    ImagePicker = 'ADMImagePicker',
}

interface IFromItemInnerState {
    validateStatus: ValidateStatus;
    errors?: ReactNode[];
    _touched: boolean;
}

class FormItemInner extends PureComponent<IFormItemInnerProps, IFromItemInnerState> {
    destroyField: () => void;

    private _errors: ReactNode[] = [];

    private _touched = false;

    constructor(props: IFormItemInnerProps, context: IFormItemContext) {
        super(props);
        this.destroyField = () => {};
        if (props?.initialValue && props.field) {
            const { setInitialValues } = context.form.getInternalHooks();
            setInitialValues({ [props.field]: props.initialValue });
        }
    }

    componentDidMount() {
        const { registerField } = this.context.form.getInternalHooks();
        this.destroyField = registerField(this.props.field, this);
    }

    componentWillUnmount() {
        this.destroyField();
    }

    onValueChange(preStore: FieldItem, curStore: FieldItem) {
        this._touched = true;
        const { shouldUpdate } = this.props;
        if (typeof shouldUpdate === 'function') {
            shouldUpdate({ preStore, curStore }) && this.forceUpdate();
            return;
        }
        this.forceUpdate();
    }

    getFieldError() {
        return this._errors;
    }

    isFieldTouched() {
        return this._touched;
    }

    validateField(): Promise<IFieldError> {
        const { validateMessages } = this.context;
        const { getFieldValue } = this.context.form;
        const { field, rules, onValidateStatusChange } = this.props;
        const value = getFieldValue(field);
        if (rules?.length && field) {
            const fieldDom = this.props.getFormItemRef();
            const fieldValidator = new Validator({ [field]: rules }, { validateMessages });
            return new Promise(resolve => {
                fieldValidator.validate(
                    { [field]: value },
                    (errorsMap: Record<string, ValidatorError[]>) => {
                        const { errors, warnings } = getErrorAndWarnings(errorsMap?.[field] || []);
                        this._errors = errors;
                        onValidateStatusChange({
                            errors: this._errors,
                            warnings,
                        });
                        return resolve({
                            errors: this._errors,
                            warnings,
                            value,
                            field,
                            dom: fieldDom,
                        });
                    },
                );
            });
        }
        return Promise.resolve({ errors: [], warnings: [], value, field, dom: null });
    }

    setFieldData(value: FieldValue) {
        const { field } = this.props;
        const { setFieldValue } = this.context.form as IFormDataMethods;
        setFieldValue(field, value);
        this.validateField();
    }

    renderChildren() {
        const { children, field, trigger = 'onChange', triggerPropsField = 'value' } = this.props;
        const { getFieldValue } = this.context.form as IFormDataMethods;
        let props = {
            [triggerPropsField]: getFieldValue(field),
            disabled: this.props.disabled,
        };
        switch (children.type.displayName) {
            case InternalComponentType.Input:
            case InternalComponentType.Textarea:
                props = {
                    value: getFieldValue(field) || '',
                    onInput: (_, newValue) => this.setFieldData(newValue),
                    onClear: () => this.setFieldData(''),
                    disabled: this.props.disabled,
                };
                break;
            case InternalComponentType.Checkbox:
            case InternalComponentType.Radio:
            case InternalComponentType.Slider:
            case InternalComponentType.RadioGroup:
            case InternalComponentType.CheckboxGroup:
                props = {
                    value: getFieldValue(field),
                    onChange: newValue => this.setFieldData(newValue),
                    disabled: this.props.disabled,
                };
                break;
            case InternalComponentType.DatePicker:
                props = {
                    currentTs: getFieldValue(field),
                    onChange: (_, newValue) => this.setFieldData(newValue),
                    disabled: this.props.disabled,
                };
                break;
            case InternalComponentType.Picker:
                props = {
                    data: getFieldValue(field),
                    onPickerChange: (_, newValue) => this.setFieldData(newValue),
                    disabled: this.props.disabled,
                };
                break;

            case InternalComponentType.Switch:
                props = {
                    checked: Boolean(getFieldValue(field)),
                    onChange: checked => this.setFieldData(checked),
                    disabled: this.props.disabled,
                };
                break;
            case InternalComponentType.ImagePicker:
                props = {
                    images: getFieldValue(field),
                    onChange: images => this.setFieldData(images),
                    disabled: this.props.disabled,
                };
                break;
            default:
                const originTrigger = props[trigger];
                props[trigger] = (newValue, ...args: any) => {
                    this.setFieldData(newValue);
                    originTrigger && originTrigger(newValue, ...args);
                };
        }

        return React.cloneElement(children, props);
    }

    render() {
        return this.renderChildren();
    }
}
FormItemInner.contextType = FormItemContext;

export default function FormItem(props: IFormItemProps) {
    const {
        label,
        field,
        disabled = false,
        layout: itemLayout,
        style,
        extra,
        requiredIcon,
        rules,
        ...rest
    } = props;
    const { prefixCls } = useContext(GlobalContext);
    const { layout, disabled: propsDisabled } = useContext(FormItemContext);
    const [errors, setErrors] = useState<ReactNode | null>(null);
    const [warnings, setWarnings] = useState<ReactNode[]>([]);
    const formItemRef = useRef<HTMLDivElement | null>(null);

    const onValidateStatusChange = (validateResult: {
        errors: ReactNode[];
        warnings: ReactNode[];
    }) => {
        const { errors: _errors, warnings: _warnings } = validateResult;
        setErrors(_errors.length ? _errors[0] : null);
        setWarnings(_warnings);
    };
    const getFormItemRef = () => {
        return formItemRef.current;
    };
    const fieldDisabled = disabled || propsDisabled;

    const fieldRules = rest?.required
        ? [{ type: ValidatorType.String, required: true }, ...(rules || [])]
        : rules;
    const isRequired = isFieldRequired(rules) || rest?.required;
    return (
        <div
            className={cls(
                `${prefixCls}-form-item`,
                `${prefixCls}-form-item-${itemLayout || layout}`,
                {
                    disabled: fieldDisabled,
                },
            )}
            style={style}
            ref={formItemRef}
        >
            <div className={cls(`${prefixCls}-form-label-item`)}>
                {isRequired
                    ? requiredIcon || (
                          <span className={cls(`${prefixCls}-form-label-item-required-asterisk`)}>
                              *
                          </span>
                      )
                    : null}
                {label}
            </div>
            <div className={cls(`${prefixCls}-form-item-control-wrapper`)}>
                <div className={cls(`${prefixCls}-form-item-control`)}>
                    <FormItemInner
                        {...rest}
                        rules={fieldRules}
                        disabled={fieldDisabled}
                        field={field}
                        onValidateStatusChange={onValidateStatusChange}
                        getFormItemRef={getFormItemRef}
                    />
                </div>
                {errors && (
                    <div
                        className={cls(
                            `${prefixCls}-form-item-message ${prefixCls}-form-item-error-message`,
                        )}
                    >
                        {errors}
                    </div>
                )}
                {(warnings || []).map((node, key) =>
                    typeof node === 'string' ? (
                        <div
                            className={cls(
                                `${prefixCls}-form-item-message ${prefixCls}-form-item-warning-message`,
                            )}
                            key={key}
                        >
                            {node}
                        </div>
                    ) : (
                        node
                    ),
                )}
            </div>
            {extra}
        </div>
    );
}
