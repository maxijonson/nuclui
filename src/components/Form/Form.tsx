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
            initial: T[name];
            validate?: (value: T[name], values: T) => void | null | string[];
        };
    };
}

type FieldProps<T extends {}> = {
    [name in keyof T]: {
        name: name;
        value: T[name];
        errors: string[];
        onChange: (v: T[name]) => void;
    };
};

type FormErrors<T extends {}> = {
    [name in keyof T]: string[];
};

export const useForm = <T extends {}>(options: UseFormOptions<T>) => {
    type N = keyof T;

    const [formData, setFormData] = React.useState(
        _.reduce(
            options.fields,
            (data, field, name) => {
                data[name as keyof T] = field.initial;
                return data;
            },
            {} as T
        )
    );
    const formDataRef = React.useRef(formData);

    const [formErrors, setFormErrors] = React.useState(
        _.reduce(
            options.fields,
            (errors, _field, name) => {
                errors[name as keyof T] = [];
                return errors;
            },
            {} as FormErrors<T>
        )
    );
    const formErrorsRef = React.useRef(formErrors);

    const fieldProps = React.useRef(
        _.reduce(
            options.fields,
            (fields, field, name) => {
                fields[name as keyof T] = {
                    name: name as keyof T,
                    value: formDataRef.current[name as keyof T],
                    errors: formErrorsRef.current[name as keyof T],
                    onChange: (v) => {
                        if (field.validate) {
                            const errors = field.validate(
                                v,
                                formDataRef.current
                            );
                            const currentErrors =
                                formErrorsRef.current[name as keyof T];

                            if (
                                (!errors || errors.length == 0) &&
                                currentErrors.length > 0
                            ) {
                                setFormErrors(
                                    produce((e) => {
                                        e[name] = [];
                                        formErrorsRef.current[
                                            name as keyof T
                                        ] = [];
                                    })
                                );
                            } else if (
                                errors &&
                                !_.isEqual(errors, currentErrors)
                            ) {
                                setFormErrors(
                                    produce((e) => {
                                        e[name] = errors;
                                        formErrorsRef.current[
                                            name as keyof T
                                        ] = errors;
                                    })
                                );
                            }
                        }

                        setFormData(
                            produce((data) => {
                                data[name] = v;
                                formDataRef.current[name as keyof T] = v;
                            })
                        );
                    },
                };
                return fields;
            },
            {} as FieldProps<T>
        )
    );

    _.forEach(formData, (data, name) => {
        if (data != fieldProps.current[name as N].value) {
            fieldProps.current[name as N].value = data;
        }
    });

    _.forEach(formErrors, (error, name) => {
        if (!_.isEqual(error, fieldProps.current[name as N].errors)) {
            console.warn("update", name);
            fieldProps.current[name as N].errors = error;
        }
    });

    return [fieldProps.current] as const;
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
