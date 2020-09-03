import React from "react";
import { FormCtx } from "../FormContext/types";
import { FormContext } from "../FormContext";

const useFormContext = <T extends any>(name: string, initialValue: T) => {
    const { register } = React.useContext(FormContext) as FormCtx<T>;
    const { init, value, setValue, unregister, errors, setErrors } = register(
        name,
        initialValue
    );
    const hasInit = React.useRef(false);

    React.useEffect(() => {
        init();
        hasInit.current = true;
        return () => unregister();
    }, [init, unregister]);

    return {
        value,
        setValue,
        errors,
        setErrors,
        hasInit: hasInit.current,
    } as const;
};

export default useFormContext;
