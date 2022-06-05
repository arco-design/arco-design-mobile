import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import Checkbox, { CheckboxProps, CheckboxRef } from '../checkbox';
import { RadioGroupContext } from './group';
import { RadioProps, RadioRef, ValueType } from './type';
import { useMergeProps } from '../checkbox/hooks';

export function componentGenerator<
    T extends ValueType = ValueType,
    P extends CheckboxProps<T> = CheckboxProps<T>,
    R extends CheckboxRef = CheckboxRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: RadioProps<T>, ref: Ref<RadioRef | null>) => {
        const mergedProps = useMergeProps<T, P>(props as P, RadioGroupContext);
        const radioRef = useRef<R | null>(null);

        useImperativeHandle(ref, () => radioRef.current);

        return <Comp ref={radioRef} {...mergedProps} isRadio />;
    });
}

export const Radio = componentGenerator(Checkbox);
