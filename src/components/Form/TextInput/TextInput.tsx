import React from "react";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { useControllable } from "@hooks";
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
                defaultValue,
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

        const [controllableValue, controllableOnChange, readOnly] =
            useControllable(defaultValue ?? "", props);

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
                controllableOnChange(e.target.value, e);
            },
            [controllableOnChange]
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
                    ref={ref}
                    readOnly={readOnly}
                    value={controllableValue}
                    disabled={disabled}
                    className="NuiTextInput__input"
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
