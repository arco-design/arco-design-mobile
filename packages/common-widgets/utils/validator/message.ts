import { isObject } from '../is';
import { IValidateMsgTemplate } from './type';

const defaultMessageTemplate = '%s is not a %s type';

export const messageTemplate: IValidateMsgTemplate = {
    required: '%s is required',
    type: {
        email: defaultMessageTemplate,
        url: defaultMessageTemplate,
        string: defaultMessageTemplate,
        number: defaultMessageTemplate,
        array: defaultMessageTemplate,
        object: defaultMessageTemplate,
        boolean: defaultMessageTemplate,
    },
    number: {
        min: '`%s` is not greater than `%s`',
        max: '`%s` is not less than `%s`',
        equal: '`%s` is not equal to `%s`',
        range: '`%s` is not in range `%s ~ %s`',
        positive: '`%s` is not a positive number',
        negative: '`%s` is not a negative number',
    },
    string: {
        max: '%s cannot be longer than %s characters',
        min: '%s must be at least %s characters',
        len: '%s must be exactly %s characters',
        match: '`%s` does not match the pattern %s',
        uppercase: '%s must be all uppercased',
        lowercase: '%s must be all lowercased',
        whitespace: '%s cannot be string of whitespace',
    },
    array: {
        max: '%s cannot be greater than %s in length',
        min: '%s cannot be less than %s in length',
        len: '%s must be exactly %s in length',
        includes: '%s is not includes %s',
        deepEqual: '%s is not deep equal with%s',
    },
    object: {
        deepEqual: '%s is not deep equal with %s',
        hasKeys: '%s does not contain required fields %s',
    },
    boolean: {
        equal: '%s is not equal to `%s`',
    },
};

export const getMsgTemplate = (templates: IValidateMsgTemplate, temName, values: string[]) => {
    const temNameArr = temName.split('.');
    let theTemplate: string = defaultMessageTemplate;
    if (temNameArr[0] in templates) {
        const firstTemplate = templates[temNameArr[0]];
        if (
            Object.prototype.toString.call(firstTemplate).toLowerCase() === '[object object]' &&
            temNameArr.length > 1 &&
            temNameArr[1] in templates[temNameArr[0]]
        ) {
            theTemplate = firstTemplate[temNameArr[1]];
        } else {
            theTemplate = firstTemplate;
        }
    }
    let cur = 0;
    return theTemplate.replace(/%s/g, curVal => (cur < values.length ? values[cur++] : curVal));
};

export const mergeMsgTemplate = (originMT, newMT): IValidateMsgTemplate => {
    const targetMT = originMT;
    if (newMT) {
        Object.keys(originMT).forEach(key => {
            const originValue = originMT[key];
            const curValue = newMT?.[key];
            targetMT[key] = isObject(originValue)
                ? { ...originValue, ...curValue }
                : curValue || originValue;
        });
    }

    return targetMT;
};
