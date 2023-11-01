import { IRules, ValidatorError } from '@arco-design/mobile-utils';

export const isFieldRequired = (rules: IRules[] = []) => {
    return (rules || []).some(rule => rule?.required);
};

export const getErrorAndWarnings = (result: ValidatorError[]) => {
    let errors: string[] = [];
    let warnings: string[] = [];
    let errorTypes: string[] = [];
    result.map(({ message = [], validateLevel = 'error', errorTypes: resultErrorTypes }) => {
        if (!message?.length) {
            return;
        }
        if (validateLevel === 'warning') {
            warnings = [...warnings, ...message];
        } else {
            errors = [...errors, ...message];
            errorTypes = resultErrorTypes;
        }
    });
    return { warnings, errors, errorTypes };
};
