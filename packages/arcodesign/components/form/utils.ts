import { IRules, ValidatorError } from '@arco-design/mobile-utils';
import { FormInternalComponentType } from './type';

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
            errorTypes = [...errorTypes, ...resultErrorTypes];
        }
    });
    return { warnings, errors, errorTypes };
};

export const getDefaultValueForInterComponent = (componentType: string) => {
    switch (componentType) {
        case FormInternalComponentType.Input:
        case FormInternalComponentType.Textarea:
            return undefined;
        case FormInternalComponentType.CheckboxGroup:
            return [];
        case FormInternalComponentType.RadioGroup:
            return null;
        case FormInternalComponentType.Slider:
        case FormInternalComponentType.Rate:
            return 0;
        default:
            return undefined;
    }
};
