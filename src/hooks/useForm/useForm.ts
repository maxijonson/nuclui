/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import produce from "immer";
import _ from "lodash";
import { UseFormOptions, FieldProps, FormErrors } from "./types";

/**
 * FORM GOALS:
 * - Typings at all times
 * - Nest objects (other forms) inside a form
 * - Possibility to dynamically add/remove fields of a same type (array)
 * - Possibility for one field to depend on another field
 * - Make it extensible for others to make their own inputs
 */

/**
 * For the given form options, useForm creates typed fields with input-ready props that you can spread in various inputs, including your own.
 * useForm manages the form state, validation and errors based on the options you give each field.
 * Every form component of Nuclui is designed to be compatible with useForm, so creating **simple** forms is quick and easy.
 * Note that the options passed to the hook is only used on the first render and never again, so changes to the parameter after the first render will have no effect.
 * @param options the form's configuration. Each key is the `fields` object becomes the `name` prop for the inputs as well as the form data keys.
 * @returns an array with 2 elements. The first is your form fields, which contains all necessary props to pass to inputs. The second is your form data keyed by their field name.
 */
const useForm = <T extends {}>(options: UseFormOptions<T>) => {
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
    const formDataRef = React.useRef({ ...formData });
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
    const formErrorsRef = React.useRef({ ...formErrors });
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

                        // Update field errors
                        if (errors != currentErrors) {
                            setFormErrors((state) =>
                                produce(state, (e: FormErrors<T>) => {
                                    e[name as N] = errors;
                                    formErrorsRef.current[name as N] = errors;
                                    formErrorsChanges.current.push(name as N);
                                })
                            );
                        }

                        // Update the value if it changed
                        setFormData((state) =>
                            produce(state, (data: T) => {
                                if (next != data[name as N]) {
                                    data[name as N] = next;
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

export default useForm;
