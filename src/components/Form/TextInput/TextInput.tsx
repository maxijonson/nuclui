import React from "react";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { NuiTextInput } from "./types";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { extractInputContainerProps } from "../InputContainer/InputContainer";

const TextInput: NuiTextInput = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                type = "text",
                value,
                onChange,
                className,
                ...inputProps
            },
            ...inputContainerProps
        } = extractInputContainerProps(props);
        const { onFocus, onBlur } = inputProps;
        const { disabled } = inputContainerProps;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const handleFocus = React.useCallback<HTMLInputProps["onFocus"]>(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        const handleChange = React.useCallback<HTMLInputProps["onChange"]>(
            (e) => {
                if (onChange) {
                    onChange(e.currentTarget.value, e);
                }
            },
            [onChange]
        );

        const handleBlur = React.useCallback<HTMLInputProps["onBlur"]>(
            (e) => {
                setFocused(false);
                setTouched(true);
                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur]
        );

        return (
            <InputContainer
                {...inputContainerProps}
                focused={focused}
                touched={touched}
                className={clsx(["NuiTextInput", className])}
            >
                <input
                    {...inputProps}
                    value={value}
                    disabled={disabled}
                    className="NuiTextInput__input"
                    ref={ref}
                    type={type}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </InputContainer>
        );
    })
);

TextInput.displayName = createComponentName("TextInput");

export default TextInput;
