import {
    ArrayValidator,
    Validator,
    getMsgTemplate,
    messageTemplate,
} from '@arco-design/mobile-utils';

describe('Form validator rules', () => {
    it('formats the default array deepEqual error message', () => {
        const validator = new ArrayValidator(
            [1],
            { type: 'array', deepEqual: [2] },
            { field: 'items' },
        );

        const message = validator.deepEqual([2]);
        const expectedMessage = messageTemplate.array.deepEqual
            .replace('%s', 'items')
            .replace('%s', '[2]');

        expect(message).toBe(expectedMessage);
        expect(validator.getErrors()).toEqual({
            value: [1],
            message: [expectedMessage],
            errorTypes: ['array.deepEqual'],
        });
    });
});

describe('getMsgTemplate', () => {
    it('fills the placeholders of an existing template', () => {
        expect(getMsgTemplate(messageTemplate, 'number.min', ['age', '18'])).toBe(
            '`age` is not greater than `18`',
        );
    });

    it('falls back to the default template when the nested key does not exist', () => {
        expect(getMsgTemplate(messageTemplate, 'array.notExist', ['items', 'array'])).toBe(
            'items is not a array type',
        );
    });

    it('falls back to the default template when the resolved template is not a string', () => {
        expect(getMsgTemplate(messageTemplate, 'array', ['items', 'array'])).toBe(
            'items is not a array type',
        );
        expect(
            getMsgTemplate({ ...messageTemplate, required: undefined }, 'required', [
                'name',
                'string',
            ]),
        ).toBe('name is not a string type');
    });
});

describe('Validator', () => {
    const validate = (rules, value, options = {}) =>
        new Promise(resolve => {
            new Validator(rules, options).validate(value, resolve);
        });

    it('reports an error instead of hanging when a custom validator throws', async () => {
        const errors = await validate(
            {
                name: [
                    {
                        validator: () => {
                            throw new Error('boom');
                        },
                    },
                ],
            },
            { name: 'a' },
        );
        expect(errors.name).toHaveLength(1);
        expect(errors.name[0].message).toEqual(['boom']);
        expect(errors.name[0].validateLevel).toBe('error');
    });

    it('reports an error instead of hanging when an async custom validator rejects', async () => {
        const errors = await validate(
            { name: [{ validator: () => Promise.reject(new Error('rejected')) }] },
            { name: 'a' },
        );
        expect(errors.name[0].message).toEqual(['rejected']);
    });

    it('still passes validation for a custom validator that succeeds', async () => {
        const errors = await validate(
            { name: [{ validator: (value, callback) => callback() }] },
            { name: 'a' },
        );
        expect(errors.name).toEqual([{}]);
    });

    it('keeps the validateLevel of the rule when a custom validator throws or rejects', async () => {
        const errors = await validate(
            {
                a: [
                    {
                        validateLevel: 'warning',
                        validator: () => {
                            throw new Error('boom');
                        },
                    },
                ],
                b: [
                    {
                        validateLevel: 'warning',
                        validator: () => Promise.reject(new Error('boom')),
                    },
                ],
            },
            { a: 'a', b: 'b' },
        );
        expect(errors.a[0].validateLevel).toBe('warning');
        expect(errors.b[0].validateLevel).toBe('warning');
    });

    it('keeps the exception in the result when first is false', async () => {
        const errors = await validate(
            { name: [{ validator: () => Promise.reject(new Error('boom')) }] },
            { name: 'a' },
            { first: false },
        );
        expect(errors.name[0].message).toEqual(['boom']);
    });

    it('settles with a fallback message when the rejection reason cannot be stringified', async () => {
        const errors = await validate(
            { name: [{ validator: () => Promise.reject(Object.create(null)) }] },
            { name: 'a' },
        );
        expect(errors.name[0].message).toHaveLength(1);
        expect(errors.name[0].errorTypes).toEqual(['exception']);
    });
});
