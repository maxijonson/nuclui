/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import produce from "immer";
import _ from "lodash";
import { createComponentName } from "@utils";
import { NuiForm } from "./types";
import { RegisterFunc } from "./FormContext/types";
import { FormContext } from "./FormContext";

/**
 * FORM GOALS:
 * - Typings at all times
 * - Nest objects (other forms) inside a form
 * - Possibility to dynamically add/remove fields of a same type (array)
 * - Possibility for one field to depend on another field
 * - Make it extensible for others to make their own inputs
 */

interface UseFormOptions<T extends {}> {
    fields: {
        [name in keyof T]: {
            /** Initial value */
            initial: T[name];
            /** Validation function. Errors are returned in a string[] */
            validate?: (value: T[name], values: T) => void | null | string[];
            /** Bind the field to other fields. When the binded field value updates, this field is re-evaluated. This is useful when some fields' validation depends on another fields' value */
            bind?: (keyof T)[];
        };
    };
}

type FieldProps<T extends {}> = {
    [name in keyof T]: {
        name: name;
        value: T[name];
        errors: string[];
        onChange: (v: T[name] | ((current: T[name]) => T[name])) => void;
    };
};

type FormErrors<T extends {}> = {
    [name in keyof T]: string[];
};

export const useForm = <T extends {}>(options: UseFormOptions<T>) => {
    // Shortcut for keyof T, since some places (lodash) require it to be typed every time (annoying)
    type N = keyof T;

    // The final form value
    const [formData, setFormData] = React.useState(
        _.reduce(
            options.fields,
            (data, field, name) => {
                data[name as N] = field.initial;
                return data;
            },
            {} as T
        )
    );
    const formDataRef = React.useRef(formData);
    const formDataChanges = React.useRef<N[]>([]);

    const validate = React.useCallback(
        (
            validateFn:
                | ((value: T[N], values: T) => void | null | string[])
                | undefined,
            v: T[N],
            currentErrors: string[]
        ) => {
            // No validation
            if (!validateFn) return currentErrors;

            const errors = validateFn(v, formDataRef.current) || [];

            // No errors between validations, return the current ones (keep the reference)
            if (!errors.length && !currentErrors.length) return currentErrors;
            // No more errors, whatever the previous amount was, return the new ones (empty)
            if (!errors.length) return errors;
            // Last check (and most expensive). Errors are the same, return the current ones (keep the reference)
            if (_.isEqual(errors, currentErrors)) return currentErrors;
            // Errors don't match, return the new errors
            return errors;
        },
        []
    );

    // Errors accross all fields
    const [formErrors, setFormErrors] = React.useState(
        _.reduce(
            options.fields,
            (errors, field, name) => {
                errors[name as N] = validate(field.validate, field.initial, []);
                return errors;
            },
            {} as FormErrors<T>
        )
    );
    const formErrorsRef = React.useRef(formErrors);
    const formErrorsChanges = React.useRef<N[]>([]);

    const fieldProps = React.useRef(
        _.reduce(
            options.fields,
            (fields, field, name) => {
                fields[name as N] = {
                    name: name as N,
                    value: formData[name as N],
                    errors: formErrors[name as N],
                    onChange: (v) => {
                        const next = _.isFunction(v)
                            ? v(formDataRef.current[name as N])
                            : v;

                        // Validate the next value
                        const currentErrors = formErrorsRef.current[name as N];
                        const errors = validate(
                            field.validate,
                            next,
                            currentErrors
                        );
                        if (errors != currentErrors) {
                            setFormErrors(
                                produce((e) => {
                                    e[name] = errors;
                                    formErrorsRef.current[name as N] = errors;
                                    formErrorsChanges.current.push(name as N);
                                })
                            );
                        }

                        // Update the value if it changed
                        setFormData(
                            produce((data) => {
                                if (next != data[name]) {
                                    data[name] = next;
                                    formDataRef.current[name as N] = next;
                                    formDataChanges.current.push(name as N);
                                }
                            })
                        );
                    },
                };
                return fields;
            },
            {} as FieldProps<T>
        )
    );

    // Keep the bindings between each fields in a collection
    const bindings = React.useRef(
        _.reduce(
            options.fields,
            (binds, field, name) => {
                if (!binds[name as N]) binds[name as N] = [];
                _.forEach(field.bind, (b) => {
                    if (!binds[b as N]) binds[b as N] = [];
                    binds[b].push(name as N);
                });
                return binds;
            },
            {} as { [name in N]: N[] }
        )
    );

    // Update the fieldProps value individually to prevent re-renders of unchanged fields. Also update the binded fields of each changed fields.
    _.forEach(formDataChanges.current, (name) => {
        const data = formData[name];

        // Don't update unecessarily
        if (data != fieldProps.current[name].value) {
            // Update the fieldProp.value
            fieldProps.current[name].value = data;
            // Trigger an update of the binded fields
            _.forEach(bindings.current[name], (binding) => {
                fieldProps.current[binding].onChange(
                    fieldProps.current[binding].value
                );
            });
        }
    });
    formDataChanges.current = [];

    // Same as the above loop, but for errors.
    _.forEach(formErrorsChanges.current, (name) => {
        const errors = formErrors[name];

        if (!_.isEqual(errors, fieldProps.current[name].errors)) {
            fieldProps.current[name].errors = errors;
        }
    });
    formErrorsChanges.current = [];

    return [fieldProps.current, formData] as const;
};

const Form = React.memo(
    React.forwardRef((props, ref) => {
        const { children, className, onSubmit, ...restProps } = props;

        type T = Parameters<NonNullable<typeof onSubmit>>[0];

        const [formData, setFormData] = React.useState({} as T);
        const [formErrors, setFormErrors] = React.useState(
            {} as { [key in keyof T]: string[] }
        );
        const registry = React.useRef(
            {} as { [name in keyof T]: ReturnType<RegisterFunc<T[name]>> }
        );

        const register = React.useCallback<RegisterFunc<T[keyof T]>>(
            (name, initialValue) => {
                type R = ReturnType<RegisterFunc<T[keyof T]>>;

                if (registry.current[name]) {
                    if (registry.current[name].value != formData[name]) {
                        registry.current[name].value = formData[name];
                    }
                    if (registry.current[name].errors != formErrors[name]) {
                        registry.current[name].errors = formErrors[name];
                    }
                    return registry.current[name];
                }

                const init: R["init"] = () => {
                    setFormData((state) =>
                        produce(state, (draft) => {
                            draft[name] = initialValue;
                        })
                    );
                    setFormErrors((state) =>
                        produce(state, (draft) => {
                            draft[name] = [];
                        })
                    );
                };

                const setValue: R["setValue"] = (v) => {
                    setFormData((state) =>
                        produce(state, (draft) => {
                            draft[name] = _.isFunction(v) ? v(draft[name]) : v;
                        })
                    );
                };

                const setErrors: R["setErrors"] = (e) => {
                    setFormErrors((state) =>
                        produce(state, (draft) => {
                            const next = _.isFunction(e) ? e(draft[name]) : e;
                            const compacted = _.compact(
                                _.isArray(next) ? next : [next]
                            );
                            if (!_.isEqual(draft[name], compacted)) {
                                draft[name] = compacted;
                            }
                        })
                    );
                };

                const unregister: R["unregister"] = () => {
                    setFormData((state) =>
                        produce(state, (draft) => {
                            delete draft[name];
                        })
                    );
                    setFormErrors((state) =>
                        produce(state, (draft) => {
                            delete draft[name];
                        })
                    );
                    delete registry.current[name];
                };

                registry.current[name] = {
                    setValue,
                    value: initialValue,
                    errors: [],
                    setErrors,
                    init,
                    unregister,
                };
                return registry.current[name];
            },
            [formData, formErrors]
        );

        const handleOnSubmit = React.useCallback(
            (evt: React.FormEvent<HTMLFormElement>) => {
                const hasErrors = _.some(
                    formErrors,
                    (error) => error.length > 0
                );
                if (hasErrors) {
                    evt.preventDefault();
                }
                if (onSubmit && !hasErrors) {
                    onSubmit(formData, evt);
                }
            },
            [formData, formErrors, onSubmit]
        );

        return (
            <form
                {...restProps}
                onSubmit={handleOnSubmit}
                ref={ref}
                className={`NuiForm ${className}`}
            >
                <FormContext.Provider value={{ register }}>
                    {children}
                </FormContext.Provider>
            </form>
        );
    })
) as NuiForm;

Form.displayName = createComponentName("Form");

export default Form;
