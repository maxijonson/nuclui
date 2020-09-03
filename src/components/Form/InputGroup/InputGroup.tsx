import React from "react";
import produce from "immer";
import _ from "lodash";
import { createComponentName } from "@utils";
import { NuiInputGroup } from "./types";
import { FormContext } from "../FormContext";
import { useFormContext } from "../useFormContext";
import { RegisterFunc } from "../FormContext/types";

const ERROR_SEP = "__IGSEP__";

const InputGroup = React.memo((props) => {
    type T = any;

    const {
        value: ctxValue,
        setValue: setCtxValue,
        errors: ctxErrors,
        setErrors: setCtxErrors,
        hasInit,
    } = useFormContext<T[]>(props.name, []);

    // Keeps track of which index each input is in the respective array
    const dataIndexes = React.useRef({} as { [name: string]: number });
    const errorIndexes = React.useRef({} as { [name: string]: number | null });

    // Overrides the Form registry to create its own, since the InputGroup itself has to register
    const registry = React.useRef(
        {} as { [name: string]: ReturnType<RegisterFunc<T>> }
    );

    const register = React.useCallback<RegisterFunc<T>>(
        (name, initialValue) => {
            type R = ReturnType<RegisterFunc<T>>;

            if (registry.current[name]) {
                const dataIndex = dataIndexes.current[name];
                if (registry.current[name].value != ctxValue[dataIndex]) {
                    registry.current[name].value = ctxValue[dataIndex];
                }

                const errorIndex = errorIndexes.current[name];
                if (
                    errorIndex != null &&
                    _.join(registry.current[name].errors, ERROR_SEP) !=
                        ctxErrors[errorIndex]
                ) {
                    // Update the error registry before returning it
                    registry.current[name].errors = _.split(
                        ctxErrors[errorIndex],
                        ERROR_SEP
                    );
                }

                return registry.current[name];
            }

            const init: R["init"] = () => {
                setCtxValue((current) =>
                    produce(current, (draft) => {
                        dataIndexes.current[name] = draft.length;
                        draft.push(initialValue);
                    })
                );
                errorIndexes.current[name] = null;
            };

            const setValue: R["setValue"] = (v) => {
                setCtxValue((current) =>
                    produce(current, (draft) => {
                        const index = dataIndexes.current[name];
                        draft[index] = _.isFunction(v) ? v(draft[index]) : v;
                    })
                );
            };

            const setErrors: R["setErrors"] = (e) => {
                setCtxErrors((current) =>
                    produce(current, (draft) => {
                        const index = errorIndexes.current[name];
                        const currentErrors = index
                            ? _.split(draft[index], ERROR_SEP)
                            : [];
                        const next = _.isFunction(e) ? e(currentErrors) : e;
                        const compacted = _.compact(
                            _.isArray(next) ? next : [next]
                        );

                        if (compacted.length && index == null) {
                            // Create a new errorIndex
                            errorIndexes.current[name] = draft.length;
                            draft.push(compacted.join(ERROR_SEP));
                        } else if (compacted.length && index != null) {
                            // update the existing one
                            draft[index] = compacted.join(ERROR_SEP);
                        } else if (!compacted.length && index != null) {
                            // remove the exisiting one
                            draft.splice(index, 1);
                            errorIndexes.current[name] = null;
                            registry.current[name].errors = [];
                            _.forEach(errorIndexes.current, (i, n) => {
                                if (i != null && i > index) {
                                    errorIndexes.current[n] = i - 1;
                                }
                            });
                        }
                    })
                );
            };

            const unregister: R["unregister"] = () => {
                const errorIndex = errorIndexes.current[name];
                if (errorIndex) {
                    setCtxErrors((current) =>
                        produce(current, (draft) => {
                            draft.splice(errorIndex, 1);
                            delete errorIndexes.current[name];
                            _.forEach(errorIndexes.current, (i, n) => {
                                if (i && i > errorIndex) {
                                    errorIndexes.current[n] = i - 1;
                                }
                            });
                        })
                    );
                }
                setCtxValue((current) =>
                    produce(current, (draft) => {
                        const index = dataIndexes.current[name];
                        draft.splice(index, 1);
                        delete dataIndexes.current[name];
                        delete registry.current[name];
                        _.forEach(dataIndexes.current, (i, n) => {
                            if (i > index) {
                                dataIndexes.current[n] = i - 1;
                            }
                        });
                    })
                );
            };

            registry.current[name] = {
                init,
                value: initialValue,
                errors: [],
                setErrors,
                setValue,
                unregister,
            };
            return registry.current[name];
        },
        [ctxErrors, ctxValue, setCtxErrors, setCtxValue]
    );

    return (
        <FormContext.Provider value={{ register }}>
            {hasInit && props.children}
        </FormContext.Provider>
    );
}) as NuiInputGroup;

InputGroup.displayName = createComponentName("InputGroup");

export default InputGroup;
