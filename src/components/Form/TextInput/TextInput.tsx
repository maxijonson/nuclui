import React from "react";
import MaskedInput from "react-text-mask";
import clsx from "clsx";
import { createComponentName, nuiLog } from "@utils";
import { NuiTextInput } from "./types";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";

const TextInput: NuiTextInput = React.memo(
    React.forwardRef((props, ref) => {
        const {
            type = "text",
            mask = false,
            guide = true,
            placeholderChar = "_",
            keepCharPositions = false,
            showMask = false,
            pipe,
            label,
            className,
            variant,
            onFocus,
            onChange,
            onBlur,
            transform,
            append,
            prepend,
            size,
            disabled,
            errors,
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const transformValue = React.useCallback(
            (v: string) => transform?.(v) || v,
            [transform]
        );

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
                    onChange(transformValue(e.currentTarget.value), e);
                }
            },
            [onChange, transformValue]
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

        // HACK: When mask is false, MaskedInput will not show the value if it is updated externally
        const defaultMask = React.useCallback(
            (v: string) => v.split("").map(() => /./),
            []
        );

        React.useEffect(() => {
            if (mask && transform) {
                nuiLog.warn(
                    `TextInput: when using the "mask" prop, use the "pipe" prop instead of "transform" to avoid potential value errors`,
                    { once: true }
                );
            }
            if (!mask && pipe) {
                nuiLog.warn(
                    `TextInput: using the "pipe" prop without "mask" has no effect. Use the "transform" prop instead`,
                    { once: true }
                );
            }
        }, [mask, pipe, transform]);

        return (
            <InputContainer
                disabled={disabled}
                focused={focused}
                touched={touched}
                errors={errors}
                size={size}
                prepend={prepend}
                append={append}
                label={label}
                variant={variant}
                className={clsx(["NuiTextInput", className])}
            >
                <MaskedInput
                    {...restProps}
                    disabled={disabled}
                    name={name}
                    className="NuiTextInput__input"
                    ref={ref}
                    type={type}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    mask={mask || defaultMask}
                    guide={guide}
                    placeholderChar={placeholderChar}
                    keepCharPositions={keepCharPositions}
                    showMask={showMask}
                    pipe={pipe}
                />
            </InputContainer>
        );
    })
);

TextInput.displayName = createComponentName("TextInput");

export default TextInput;
