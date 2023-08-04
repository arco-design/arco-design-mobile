/**
 * @type hooks
 * @name_en General Hooks
 */
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom encapsulation of useState, uniformly handle the behavior of using setState after the component is unloaded
 * Tips: Use in scenarios where asynchronous processing is not completed after unmount. It is not recommended to replace useState without brains
 * @param initialState Initial State
 */
export function useMountedState<S>(initialState: S | (() => S)) {
    const [state, setState] = useState<S>(initialState);
    const leavingRef = useRef(false);
    const setValidState = useCallback<typeof setState>(value => {
        if (leavingRef.current) {
            return;
        }
        setState(value);
    }, []);
    useEffect(
        () => () => {
            leavingRef.current = true;
        },
        [],
    );
    const result: [S, typeof setState] = [state, setValidState];
    return result;
}
