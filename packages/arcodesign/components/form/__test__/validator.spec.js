import { ArrayValidator, messageTemplate } from '@arco-design/mobile-utils';

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
