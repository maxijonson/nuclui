import React from "react";

interface UseControllableConfig<T, E> {
    value?: T;
    onChange?: ((v: T, e: E) => void) | ((v: T, e?: E) => void);
    readOnly?: boolean;
}

const isInputControlled = <
    V extends any | undefined,
    C = ((v: Required<V>) => void) | undefined
>(
    value: V,
    onChange: C
) =>
    value !== undefined &&
    value !== null &&
    onChange !== null &&
    onChange !== undefined;

const isInputReadonly = <
    V extends any | undefined,
    C = ((v: Required<V>) => void) | undefined
>(
    value: V,
    onChange: C,
    readOnly?: boolean
) => {
    if (value !== undefined && value !== null && !onChange) {
        return true;
    }
    return readOnly ?? false;
};

const useControllable = <T, E>(
    defaultValue: T,
    { value, onChange, readOnly }: UseControllableConfig<T, E>
) => {
    const isControlled = isInputControlled(value, onChange);
    const isReadonly = isInputReadonly(value, onChange, readOnly);

    const [uncontrolledValue, setUncontrolledValue] = React.useState<T>(
        value ?? defaultValue
    );

    const controlledOnChange = React.useCallback(
        (v: T, e: E) => {
            if (isReadonly) return;

            if (onChange) {
                onChange(v, e);
            }
        },
        [isReadonly, onChange]
    );

    const uncontrolledOnChange = React.useCallback(
        (v: T, e: E) => {
            if (isReadonly) return;

            setUncontrolledValue(v);
            controlledOnChange(v, e);
        },
        [controlledOnChange, isReadonly]
    );

    return (
        isControlled
            ? [value, controlledOnChange, isReadonly, isControlled]
            : [
                  uncontrolledValue,
                  uncontrolledOnChange,
                  isReadonly,
                  isControlled,
              ]
    ) as [T, (v: T, e?: E) => void, boolean, boolean];
};

export default useControllable;
