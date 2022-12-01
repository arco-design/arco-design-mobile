import React from 'react';
import { IFormItemContext } from './type';
import { defaultFormDataMethods } from './useForm';

export const FormItemContext = React.createContext<IFormItemContext>({
    form: defaultFormDataMethods,
    layout: 'horizontal',
});
