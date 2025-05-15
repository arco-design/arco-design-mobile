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
import { Promise } from 'es6-promise';
import { FormItemContext } from './form-item-context';
import { GlobalContext } from '../context-provider';
import {
    IFieldError,
    FieldValue,
    IFormItemInnerProps,
    FormItemProps,
    ValidateStatus,
    FormItemRef,
    FormInternalComponentType,
    ValueChangeType,
    IFormItemContext,
} from './type';
import { getDefaultValueForInterComponent, getErrorAndWarnings, isFieldRequired } from './utils';
import { DefaultDatePickerLinkedContainer, DefaultPickerLinkedContainer } from './linked-container';
interface IFormItemInnerState {
    validateStatus: ValidateStatus;
    errors?: ReactNode[];
    _touched: boolean;
}

class FormItemInner extends PureComponent<IFormItemInnerProps, IFormItemInnerState> {
    // eslint-disable-next-line react/static-property-placement
    context!: React.ContextType<typeof FormItemContext>;

    destroyField: () => void;

    private _errors: ReactNode[] = [];

    private _touched = false;

    constructor(props: IFormItemInnerProps, context: IFormItemContext) {
        super(props);
        this.destroyField = () => {};
        if (props?.initialValue && props.field) {
            const { setInitialValue } = context.form.getInternalHooks();
            setInitialValue(props.field, props.initialValue);
        }
    }

    componentDidMount() {
        const { registerField } = this.context.form.getInternalHooks();
        this.destroyField = registerField(this.props.field, this);
    }

    componentWillUnmount() {
        this.destroyField();
    }

    onValueChange = (
        curValue: FieldValue,
        preValue: any,
        info?: { changeType: ValueChangeType },
    ) => {
        this._touched = true;
        const { shouldUpdate } = this.props;
        if (typeof shouldUpdate === 'function') {
            shouldUpdate({ preValue, curValue }) && this.forceUpdate();
            return;
        }

        if (info?.changeType === ValueChangeType.Reset) {
            this.props.onValidateStatusChange({
                errors: [],
                warnings: [],
                errorTypes: [],
            });
            this._errors = [];
        }
        this.forceUpdate();
    };

    getInitialValue = () => {
        const { children, displayType } = this.props;
        const { getInitialValue } = this.context.form.getInternalHooks();
        const childrenType = displayType || children.type?.displayName;
        // get user-defined initialValue or if not defined
        return getInitialValue(this.props.field) ?? getDefaultValueForInterComponent(childrenType);
    };

    getFieldError = () => {
        return this._errors;
    };

    isFieldTouched = () => {
        return this._touched;
    };

    getAllRuleValidateTriggers = (): string[] => {
        return (
            (this.props.rules
                ?.map(rule => rule.validateTrigger)
                .flat()
                .filter(v => !!v) as string[]) || []
        );
    };

    validateField = (validateTrigger?: string): Promise<IFieldError> => {
        const { validateMessages } = this.context;
        const { getFieldValue } = this.context.form;
        const { field, rules, onValidateStatusChange } = this.props;
        const value = getFieldValue(field);

        const curRules = validateTrigger
            ? rules?.filter(rule => {
                  const triggerList: string[] = ([] as string[]).concat(rule.validateTrigger || '');
                  return triggerList.includes(validateTrigger);
              })
            : rules;
        if (curRules?.length && field) {
            const fieldDom = this.props.getFormItemRef();
            const fieldValidator = new Validator({ [field]: curRules }, { validateMessages });
            return new Promise(resolve => {
                fieldValidator.validate(
                    { [field]: value },
                    (errorsMap: Record<string, ValidatorError[]>) => {
                        const { errors, warnings, errorTypes } = getErrorAndWarnings(
                            errorsMap?.[field] || [],
                        );
                        this._errors = errors;
                        onValidateStatusChange({
                            errors: this._errors,
                            warnings,
                            errorTypes,
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
    };

    setFieldData = (value: FieldValue) => {
        const { field } = this.props;
        const { innerSetFieldValue } = this.context.form.getInternalHooks();
        innerSetFieldValue(field, value);
        this.validateField();
    };

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

    innerOnInputFunction = (_, value, ...args) => {
        this.setFieldData(value);
        const { children } = this.props;
        children.props?.onInput?.(_, value, ...args);
    };

    innerClearFunction = (...args) => {
        const { children } = this.props;
        this.setFieldData('');
        if (children.props?.onClear) {
            children.props?.onClear(...args);
        }
    };

    renderChildren() {
        const {
            children,
            field,
            trigger = 'onChange',
            triggerPropsField = 'value',
            displayType,
            disabled,
        } = this.props;
        const { getFieldValue } = this.context.form;
        const childrenProps: {
            disabled?: boolean;
            value?: FieldValue;
            onInput?: (...args: any) => void;
            onClear?: () => void;
            currentTs?: number;
            onChange?: (value: FieldValue, ...args: any) => void;
            renderLinkedContainer?: (value: FieldValue) => ReactNode;
            images?: FieldValue;
            checked?: boolean;
            error?: ReactNode[];
        } = {
            disabled,
        };
        // inject validate trigger events of rules
        // this.getAllRuleValidateTriggers().forEach(triggerName => {
        //     childrenProps[triggerName] = e => {
        //         this.validateField(triggerName);
        //         children?.props?.[triggerName]?.(e);
        //     };
        // });
        const childrenType = displayType || children.type?.displayName;
        switch (childrenType) {
            case FormInternalComponentType.Input:
            case FormInternalComponentType.Textarea:
                childrenProps.value = getFieldValue(field) || '';
                childrenProps.onInput = this.innerOnInputFunction;
                childrenProps.onClear = this.innerClearFunction;
                break;
            case FormInternalComponentType.Checkbox:
            case FormInternalComponentType.Radio:
            case FormInternalComponentType.Slider:
            case FormInternalComponentType.RadioGroup:
            case FormInternalComponentType.CheckboxGroup:
                childrenProps.value = getFieldValue(field);
                childrenProps.onChange = this.innerTriggerFunctionWithValueFirst;
                break;
            case FormInternalComponentType.DatePicker:
                childrenProps.currentTs = getFieldValue(field);
                childrenProps.onChange = this.innerTriggerFunctionWithValueFirst;
                childrenProps.renderLinkedContainer =
                    children.props?.renderLinkedContainer ||
                    ((ts, types) => <DefaultDatePickerLinkedContainer ts={ts} types={types} />);
                break;
            case FormInternalComponentType.Picker:
                childrenProps.value = getFieldValue(field) || '';
                childrenProps.onChange = this.innerTriggerFunctionWithValueFirst;
                childrenProps.renderLinkedContainer =
                    children.props?.renderLinkedContainer ||
                    (val => <DefaultPickerLinkedContainer value={val} />);
                break;

            case FormInternalComponentType.Switch:
                childrenProps.checked = Boolean(getFieldValue(field));
                childrenProps.onChange = this.innerTriggerFunctionWithValueFirst;
                break;
            case FormInternalComponentType.ImagePicker:
                childrenProps.images = getFieldValue(field);
                childrenProps.onChange = this.innerTriggerFunctionWithValueFirst;
                break;
            default:
                const originTrigger = children.props[trigger];
                if (triggerPropsField) {
                    childrenProps[triggerPropsField] = getFieldValue(field);
                }
                // inject the validated result
                childrenProps.error = this._errors;
                childrenProps[trigger] = (newValue, ...args: any) => {
                    this.setFieldData(newValue);
                    originTrigger && originTrigger(newValue, ...args);
                };
        }

        return React.cloneElement(children, childrenProps);
    }

    render() {
        return this.renderChildren();
    }
}
FormItemInner.contextType = FormItemContext;

export { FormItemInner };

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
    const [errorTypes, setErrorTypes] = useState<string | null>(null);
    const [warnings, setWarnings] = useState<ReactNode[]>([]);
    const formItemRef = useRef<HTMLDivElement | null>(null);

    const onValidateStatusChange = (validateResult: {
        errors: ReactNode[];
        warnings: ReactNode[];
        errorTypes: string[];
    }) => {
        const { errors: _errors, warnings: _warnings, errorTypes: _errorTypes } = validateResult;
        setErrors(_errors.length ? _errors[0] : null);
        setErrorTypes(_errorTypes.length ? _errorTypes[0] : null);
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
                    [`${prefixCls}-form-item-error-${errorTypes}`]: errorTypes,
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
