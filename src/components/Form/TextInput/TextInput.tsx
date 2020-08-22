import React from "react";
import { createComponentName } from "@utils";
import { TextInputProps } from "./types";
import { useFormContext } from "../useFormContext";

const TextInput = React.memo((props: TextInputProps) => {
    const [value, setValue] = useFormContext(props.name, props.initial ?? "");

    console.info(`TextInput ${props.name} RENDER`);

    const onChange = React.useCallback<
        Required<React.InputHTMLAttributes<HTMLInputElement>>["onChange"]
    >(
        (evt) => {
            setValue(evt.target.value);
        },
        [setValue]
    );

    return <input type="text" onChange={onChange} value={value} />;
});

TextInput.displayName = createComponentName("TextInput");

export default TextInput;
