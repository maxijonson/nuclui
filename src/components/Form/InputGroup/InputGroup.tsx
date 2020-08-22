import React from "react";
import produce from "immer";
import _ from "lodash";
import { createComponentName } from "@utils";
import { NuiInputGroup } from "./types";
import { FormContext } from "../FormContext";
import { useFormContext } from "../useFormContext";
import { RegisterFunc } from "../FormContext/types";

const InputGroup = React.memo((props) => {
    type T = NonNullable<typeof props.initial>[0];

    const [ctxValue, setCtxValue, hasInit] = useFormContext(
        props.name,
        props.initial ?? []
    );

    const indexes = React.useRef({} as { [name: string]: number });
    const registry = React.useRef(
        {} as { [name: string]: ReturnType<RegisterFunc<T>> }
    );

    const register = React.useCallback<RegisterFunc<T>>(
        (name, initialValue) => {
            type R = ReturnType<RegisterFunc<T>>;

            if (registry.current[name]) {
                const index = indexes.current[name];
                if (registry.current[name].value != ctxValue[index]) {
                    registry.current[name].value = ctxValue[index];
                }
                return registry.current[name];
            }

            const init: R["init"] = () => {
                setCtxValue((current) =>
                    produce(current, (draft) => {
                        indexes.current[name] = draft.length;
                        draft.push(initialValue);
                        console.info("INDEXES", indexes.current);
                    })
                );
            };

            const setValue: R["setValue"] = (v) => {
                setCtxValue((current) =>
                    produce(current, (draft) => {
                        const index = indexes.current[name];
                        draft[index] = _.isFunction(v) ? v(draft[index]) : v;
                    })
                );
            };

            const unregister: R["unregister"] = () => {
                setCtxValue((current) =>
                    produce(current, (draft) => {
                        const index = indexes.current[name];
                        draft.splice(index, 1);
                        delete indexes.current[name];
                        delete registry.current[name];
                        _.forEach(indexes.current, (i, n) => {
                            if (i > index) {
                                indexes.current[n] = i - 1;
                            }
                        });
                        console.info("InputGroup UNREGISTER", name);
                        console.info("INDEXES", indexes.current);
                    })
                );
            };

            registry.current[name] = {
                init,
                value: initialValue,
                setValue,
                unregister,
            };
            return registry.current[name];
        },
        [ctxValue, setCtxValue]
    );

    console.info("InputGroup RENDER");

    return (
        <FormContext.Provider value={{ register }}>
            {hasInit && props.children}
        </FormContext.Provider>
    );
}) as NuiInputGroup;

InputGroup.displayName = createComponentName("InputGroup");

export default InputGroup;
