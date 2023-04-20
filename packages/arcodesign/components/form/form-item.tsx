/* eslint-disable react/no-unused-class-component-methods */
import React, {
    forwardRef,
    PureComponent,
    ReactNode,
    Ref,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { cls, Validator, ValidatorType, ValidatorError } from '@arco-design/mobile-utils';
import { FormItemContext } from './form-item-context';
import { GlobalContext } from '../context-provider';
import {
    IFieldError,
    FieldItem,
    FieldValue,
    IFormItemContext,
    IFormItemInnerProps,
    FormItemProps,
    ValidateStatus,
    FormItemRef,
    FormInternalComponentType,
} from './type';
import { getErrorAndWarnings, isFieldRequired } from './utils';

interface IFromItemInnerState {
    validateStatus: ValidateStatus;
    errors?: ReactNode[];
    _touched: boolean;
}

class FormItemInner extends PureComponent<IFormItemInnerProps, IFromItemInnerState> {
    // eslint-disable-next-line react/static-property-placement
    context!: React.ContextType<typeof FormItemContext>;

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
        const { setFieldValue } = this.context.form;
        setFieldValue(field, value);
        this.validateField();
    }

    innerTriggerFunction = (_, value, ...args) => {
        this.setFieldData(value);
        const { children, trigger = 'onChange' } = this.props;
        if (trigger && children.props?.[trigger]) {
            children.props?.[trigger](_, value, ...args);
        }
    };

    innerTriggerFunctionWithValueFirst = (value, ...args) => {
        this.setFieldData(value);
        const { children, trigger = 'onChange' } = this.props;
        if (trigger && children.props?.[trigger]) {
            children.props?.[trigger](value, ...args);
        }
    };

    innerClearFunction(...args) {
        const { children } = this.props;
        this.setFieldData('');
        if (children.props?.onClear) {
            children.props?.onClear(...args);
        }
    }

    renderChildren() {
        const {
            children,
            field,
            trigger = 'onChange',
            triggerPropsField = 'value',
            displayType,
        } = this.props;
        const { getFieldValue } = this.context.form;
        let props = {
            [triggerPropsField]: getFieldValue(field),
            disabled: this.props.disabled,
        };
        const childrenType = displayType || children.type?.displayName;
        switch (childrenType) {
            case FormInternalComponentType.Input:
            case FormInternalComponentType.Textarea:
                props = {
                    value: getFieldValue(field) || '',
                    onInput: this.innerTriggerFunction,
                    onClear: this.innerClearFunction,
                    disabled: this.props.disabled,
                };
                break;
            case FormInternalComponentType.Checkbox:
            case FormInternalComponentType.Radio:
            case FormInternalComponentType.Slider:
            case FormInternalComponentType.RadioGroup:
            case FormInternalComponentType.CheckboxGroup:
                props = {
                    value: getFieldValue(field),
                    onChange: this.innerTriggerFunctionWithValueFirst,
                    disabled: this.props.disabled,
                };
                break;
            case FormInternalComponentType.DatePicker:
                props = {
                    currentTs: getFieldValue(field),
                    onChange: this.innerTriggerFunction,
                    disabled: this.props.disabled,
                };
                break;
            case FormInternalComponentType.Picker:
                props = {
                    data: getFieldValue(field),
                    onPickerChange: this.innerTriggerFunction,
                    disabled: this.props.disabled,
                };
                break;

            case FormInternalComponentType.Switch:
                props = {
                    checked: Boolean(getFieldValue(field)),
                    onChange: this.innerTriggerFunctionWithValueFirst,
                    disabled: this.props.disabled,
                };
                break;
            case FormInternalComponentType.ImagePicker:
                props = {
                    images: getFieldValue(field),
                    onChange: this.innerTriggerFunctionWithValueFirst,
                    disabled: this.props.disabled,
                };
                break;
            default:
                const originTrigger = children.props[trigger];
                // inject the validated result
                props.error = this._errors;
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

export default forwardRef((props: FormItemProps, ref: Ref<FormItemRef>) => {
    const {
        label,
        field,
        disabled = false,
        layout: itemLayout,
        style,
        extra,
        requiredIcon,
        rules,
        className = '',
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

    useImperativeHandle(ref, () => ({
        dom: formItemRef.current,
    }));

    return (
        <div
            className={cls(
                `${prefixCls}-form-item`,
                `${prefixCls}-form-item-${itemLayout || layout}`,
                className,
                {
                    disabled: fieldDisabled,
                    [`${prefixCls}-form-item-error`]: !!errors,
                    [`${prefixCls}-form-item-warning`]: Boolean(!errors && warnings),
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
});
