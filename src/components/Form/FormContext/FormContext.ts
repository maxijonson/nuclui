import React from "react";
import { nuiLog, createComponentName } from "@utils";
import { FormCtx } from "./types";

const FormContext = React.createContext<FormCtx>({
    register: () => ({
        setValue: () => {
            nuiLog.warn(
                "setValue has been called, but the component is not a child of Form.",
                {
                    once: true,
                }
            );
        },
        value: null,
        unregister: () => undefined,
        init: () => undefined,
    }),
});

FormContext.displayName = createComponentName("FormContext");

export default FormContext;
