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

const Form = React.memo(
    React.forwardRef((props, ref) => {
        const { children, className, onSubmit, ...restProps } = props;

        type T = Parameters<NonNullable<typeof onSubmit>>[0];

        const [formData, setFormData] = React.useState({} as T);
        const registry = React.useRef(
            {} as { [name in keyof T]: ReturnType<RegisterFunc<T[name]>> }
        );

        console.info("Form RENDER");

        const register = React.useCallback<RegisterFunc<T[keyof T]>>(
            (name, initialValue) => {
                type R = ReturnType<RegisterFunc<T[keyof T]>>;

                if (registry.current[name]) {
                    if (registry.current[name].value != formData[name]) {
                        registry.current[name].value = formData[name];
                    }
                    return registry.current[name];
                }

                const init: R["init"] = () => {
                    setFormData((state) =>
                        produce(state, (draft) => {
                            console.info(`Form ${name} REGISTER`, initialValue);
                            draft[name] = initialValue;
                        })
                    );
                };

                const setValue: R["setValue"] = (v) => {
                    setFormData((state) =>
                        produce(state, (draft) => {
                            draft[name] = _.isFunction(v) ? v(draft[name]) : v;
                            console.info(
                                `Form ${name} SETVALUE`,
                                _.cloneDeep(draft)
                            );
                        })
                    );
                };

                const unregister: R["unregister"] = () => {
                    setFormData((state) =>
                        produce(state, (draft) => {
                            delete draft[name];
                            console.info(`Form ${name} UNREGISTER`, {
                                ...draft,
                            });
                        })
                    );
                    delete registry.current[name];
                };

                registry.current[name] = {
                    setValue,
                    value: initialValue,
                    init,
                    unregister,
                };
                return registry.current[name];
            },
            [formData]
        );

        const handleOnSubmit = React.useCallback(
            (evt: React.FormEvent<HTMLFormElement>) => {
                if (onSubmit) {
                    onSubmit(formData, evt);
                }
            },
            [formData, onSubmit]
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
