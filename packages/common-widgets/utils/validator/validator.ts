import { Promise } from 'es6-promise';
import { isArray } from '../is';
import {
    ArrayValidator,
    BaseValidator,
    CustomValidator,
    NumberValidator,
    ObjectValidator,
    StringValidator,
} from './rules';
import {
    IFieldValue,
    IRules,
    ITypeRules,
    IValidateMsgTemplate,
    ValidatorError,
    ValidatorType,
} from './type';

export class Validator {
    rules: Record<string, IRules[]>;

    options: { first: boolean; validateMessages?: Partial<IValidateMsgTemplate> };

    validatorGroup: {
        number: NumberValidator;
        array: ArrayValidator;
        string: StringValidator;
        object: ObjectValidator;
        custom: CustomValidator;
    } | null;

    constructor(
        rules: Record<string, IRules[]>,
        options: { first?: boolean; validateMessages?: Partial<IValidateMsgTemplate> },
    ) {
        this.rules = rules;
        this.options = { first: true, ...(options || {}) };
    }

    createValidatorGroup(value: any, rule: IRules, field: string) {
        const curOption = {
            field,
            validateMessage: this.options?.validateMessages,
        };
        return {
            number: new NumberValidator(value, rule, curOption),
            array: new ArrayValidator(value, rule, curOption),
            string: new StringValidator(value, rule, curOption),
            object: new ObjectValidator(value, rule, curOption),
            custom: new CustomValidator(value, rule, curOption),
        };
    }

    // 一条rule执行
    getSingleValidateGroup(value: IFieldValue, rule: IRules, field: string) {
        const vType = rule?.type || 'string';
        const validPromises: Promise<any>[] = [];
        const validatorGroup = this.createValidatorGroup(value, rule, field);
        const typeValidator: BaseValidator | null =
            vType in validatorGroup ? validatorGroup[vType] : null;
        if (rule.required) {
            validPromises.push(
                new Promise(resolve => {
                    validatorGroup.string.isRequired();
                    const curError = validatorGroup.string.getErrors();
                    resolve({
                        ...curError,
                        validateLevel: rule?.validateLevel || 'error',
                    });
                }),
            );
        }
        if (typeValidator) {
            Object.keys(rule).map(key => {
                if (key === 'validator') {
                    const resPromise = (rule as ITypeRules<ValidatorType.Custom>).validator
                        ? validatorGroup.custom.validator(
                              (rule as ITypeRules<ValidatorType.Custom>).validator || null,
                          )
                        : null;
                    resPromise && validPromises.push(resPromise);
                    return;
                }
                if (typeValidator.validateRules.includes(key)) {
                    validPromises.push(
                        new Promise(resolve => {
                            typeValidator.validateRules.includes(key) &&
                                typeValidator[key](rule[key]);
                            const curError = typeValidator.getErrors();
                            resolve({
                                ...curError,
                                validateLevel: rule?.validateLevel || 'error',
                            });
                        }),
                    );
                }
            });
        }
        return validPromises;
    }

    singleValidate(promises: Promise<any>[]) {
        let cur = 0;
        return new Promise(resolve => {
            const validate = promise => {
                const next = () => {
                    if (cur < promises.length - 1) {
                        return validate(promises[++cur]);
                    }

                    return resolve({});
                };
                promise.then((errors: ValidatorError) => {
                    if (this.options.first && (errors.message || [])?.length > 0) {
                        return resolve(errors);
                    }
                    next();
                });
            };
            validate(promises[cur]);
        });
    }

    validate(value: Record<string, any>, callback: (err) => void) {
        const promiseGroup: Promise<any>[] = [];
        const keys: string[] = [];
        if (this.rules) {
            Object.keys(this.rules).forEach(key => {
                let spPromiseGroup: Promise<any>[] = [];
                if (isArray(this.rules[key])) {
                    for (let i = 0; i < this.rules[key].length; i++) {
                        const rule = this.rules[key][i];
                        const curPromises = this.getSingleValidateGroup(value[key], rule, key);
                        spPromiseGroup = [...spPromiseGroup, ...curPromises];
                    }
                }
                if (spPromiseGroup.length) {
                    promiseGroup.push(this.singleValidate(spPromiseGroup));
                    keys.push(key);
                }
            });
        }
        if (promiseGroup.length > 0) {
            Promise.all(promiseGroup).then(data => {
                const lastErrors = data.reduce((pre, cur, index) => {
                    if (!(keys[index] in pre)) {
                        pre[keys[index]] = [];
                    }

                    pre[keys[index]].push(cur);
                    return pre;
                }, {});
                callback && callback(lastErrors);
            });
        } else {
            callback && callback({});
        }
    }
}
