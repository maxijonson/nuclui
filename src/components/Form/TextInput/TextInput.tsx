import React from "react";
import styled from "styled-components";
import MaskedInput from "react-text-mask";
import { createComponentName, nuiLog } from "@utils";
import { NuiTextInput, HTMLInputProps } from "./types";
import { InputContainer } from "../InputContainer";

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
            name,
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
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const errors = React.useMemo(() => props.errors || [], [props.errors]);

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
                if (!touched) {
                    setTouched(true);
                }
                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur, touched]
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
            <StyledTextInput
                disabled={disabled}
                focused={focused}
                touched={touched}
                errors={errors}
                size={size}
                prepend={prepend}
                append={append}
                label={label}
                variant={variant}
                className="NuiTextInput"
            >
                <MaskedInput
                    {...restProps}
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
            </StyledTextInput>
        );
    })
);

const StyledTextInput = styled(InputContainer)`
    & .NuiTextInput__input {
        padding: 8px;
        font-size: 16px;
        line-height: 19px;
        box-sizing: border-box;
        width: 100%;
        background: transparent;
        border: none;

        &:focus {
            outline: none;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
            -webkit-text-fill-color: inherit;
            box-shadow: 0 0 0px 1000px inherit inset;
            transition: background-color 5000s ease-in-out 0s;
        }
    }
`;

TextInput.displayName = createComponentName("TextInput");

export default TextInput;
