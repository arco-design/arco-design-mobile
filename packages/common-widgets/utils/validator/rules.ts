// eslint-disable-next-line max-classes-per-file
import { isDeepEqual, isEmptyArray, isEmptyValue } from '../is';
import { getMsgTemplate, mergeMsgTemplate, messageTemplate } from './message';
import {
    ICustomValidatorFunc,
    InnerRules,
    IRules,
    IValidateMsgTemplate,
    IValidateOption,
    ValidatorError,
    ValidatorType,
} from './type';

export class BaseValidator {
    value: any;

    message: string;

    type: ValidatorType;

    error: ValidatorError;

    field: string;

    rule: IRules;

    validateRules: string[];

    curValidMsgTemplate: IValidateMsgTemplate;

    constructor(value: any, rule: InnerRules, options: IValidateOption) {
        this.value = value;
        const { message = '', ...rest } = rule;
        this.message = message || '';
        this.type = rule.type || ValidatorType.String;
        this.error = { value, message: [], errorTypes: [] };
        this.field = options.field || '';
        this.rule = rest;
        this.validateRules = [];
        this.curValidMsgTemplate = mergeMsgTemplate(messageTemplate, options.validateMessage);
    }

    isRequired() {
        // 优先级最高
        if (isEmptyValue(this.value) || isEmptyArray(this.value)) {
            this.error.message = [
                this.message || getMsgTemplate(this.curValidMsgTemplate, 'required', [this.field]),
            ];
            this.error.errorTypes = ['required'];
            return false;
        }
        return true;
    }

    addError(errorType: string, message: string) {
        if (message) {
            this.error.errorTypes.push(errorType);
            this.error.message?.push(message);
        }
    }

    dealError(
        isError: boolean,
        { errTemplate, values }: { errTemplate: string; values: string[] },
    ) {
        if (isError) {
            const theMessage =
                this.message || getMsgTemplate(this.curValidMsgTemplate, errTemplate, values);
            this.error.errorTypes.push(errTemplate);
            this.error.message?.push(theMessage);
            return theMessage;
        }
        return '';
    }

    getErrors() {
        return this.error;
    }
}

export class NumberValidator extends BaseValidator {
    constructor(value, rules, options) {
        super(value, rules, options);
        this.validateRules = ['min', 'max', 'equal', 'positive', 'negative'];
    }

    min(num: number) {
        this.dealError(!isEmptyValue(this.value) && this.value < num, {
            errTemplate: 'number.min',
            values: [this.field, `${num}`],
        });
    }

    max(num: number) {
        this.dealError(!isEmptyValue(this.value) && this.value > num, {
            errTemplate: 'number.max',
            values: [this.field, `${num}`],
        });
    }

    equal(num: number) {
        return this.dealError(!isEmptyValue(this.value) && this.value !== num, {
            errTemplate: 'number.equal',
            values: [this.field, `${num}`],
        });
    }

    positive() {
        return this.dealError(!isEmptyValue(this.value) && this.value < 0, {
            errTemplate: 'number.positive',
            values: [this.field],
        });
    }

    negative() {
        return this.dealError(!isEmptyValue(this.value) && this.value > 0, {
            errTemplate: 'number.negative',
            values: [this.field],
        });
    }
}

export class StringValidator extends BaseValidator {
    constructor(value, rules, options) {
        super(value, rules, options);
        this.validateRules = ['min', 'max', 'len', 'match', 'uppercase', 'lowercase', 'whitespace'];
    }

    min(num: number) {
        return this.dealError(!isEmptyValue(this.value) && this.value.length < num, {
            errTemplate: 'string.min',
            values: [this.field, `${num}`],
        });
    }

    max(num: number) {
        return this.dealError(!isEmptyValue(this.value) && this.value.length > num, {
            errTemplate: 'string.max',
            values: [this.field, `${num}`],
        });
    }

    len(num: number) {
        return this.dealError(!isEmptyValue(this.value) && this.value !== num, {
            errTemplate: 'string.equal',
            values: [this.field, `${num}`],
        });
    }

    match(regStr: string) {
        const reg = new RegExp(regStr);
        return this.dealError(!isEmptyValue(this.value) && !reg.test(this.value), {
            errTemplate: 'string.match',
            values: [this.field, regStr],
        });
    }

    uppercase(isValue: boolean) {
        const isUppercase = (this.value || '').toLocaleUpperCase() === this.value;
        return this.dealError(!isEmptyValue(this.value) && isUppercase !== isValue, {
            errTemplate: 'string.uppercase',
            values: [this.field],
        });
    }

    lowercase(isValue: boolean) {
        const isLowercase = (this.value || '').toLocaleLowerCase() === this.value;

        return this.dealError(!isEmptyValue(this.value) && isLowercase !== isValue, {
            errTemplate: 'string.lowercase',
            values: [this.field],
        });
    }

    whitespace() {
        return this.dealError(!isEmptyValue(this.value) && isEmptyValue(this.value.trim()), {
            errTemplate: 'string.whitespace',
            values: [this.field],
        });
    }
}

export class ArrayValidator extends BaseValidator {
    constructor(value, rules, options) {
        super(value, rules, options);
        this.validateRules = ['min', 'max', 'deepEqual', 'includes'];
    }

    min(num: number) {
        return this.dealError(!isEmptyValue(this.value) && this.value.length < num, {
            errTemplate: 'array.min',
            values: [this.field, `${num}`],
        });
    }

    max(num: number) {
        return this.dealError(!isEmptyValue(this.value) && this.value.length > num, {
            errTemplate: 'array.max',
            values: [this.field, `${num}`],
        });
    }

    deepEqual(sub: Array<any>) {
        return this.dealError(!isDeepEqual(this.value, sub), {
            errTemplate: 'array.equal',
            values: [this.field, `${JSON.stringify(sub)}`],
        });
    }

    includes(sub: Array<any>) {
        return this.dealError(
            sub.some(el => !this.value.includes(el)),
            {
                errTemplate: 'array.includes',
                values: [this.field, `${JSON.stringify(sub)}`],
            },
        );
    }
}
export class ObjectValidator extends BaseValidator {
    constructor(value, rules, options) {
        super(value, rules, options);
        this.validateRules = ['deepEqual', 'hasKeys'];
    }

    deepEqual(sub: Object) {
        return this.dealError(!isDeepEqual(this.value, sub), {
            errTemplate: 'object.deepEqual',
            values: [this.field, `${JSON.stringify(sub)}`],
        });
    }

    hasKeys(keys: string[]) {
        const allKeys = isEmptyValue(this.value) ? [] : Object.keys(this.value);
        return this.dealError(
            !isEmptyValue(this.value) && keys.some(theKey => !allKeys.includes(theKey)),
            {
                errTemplate: 'object.hasKeys',
                values: [this.field, `${JSON.stringify(keys)}`],
            },
        );
    }
}

export class CustomValidator extends BaseValidator {
    constructor(value, rules, options) {
        super(value, rules, options);
    }

    validator(validatorTool: ICustomValidatorFunc | null) {
        if (validatorTool) {
            return new Promise(resolve => {
                const ret = validatorTool(this.value, (message: string = '') =>
                    this.addError('custom', message || ''),
                );
                if (ret && ret?.then) {
                    ret.then(() => resolve(this.getErrors()));
                } else {
                    resolve(this.getErrors());
                }
            });
        }
        return null;
    }
}
