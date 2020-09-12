import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import MaskedInput from "react-text-mask";
import { createComponentName, nuiLog } from "@utils";
import { border, shadow, text, background, context } from "@theme";
import { NuiTextInput, HTMLInputProps, TextInputProps } from "./types";

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
            inline,
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
                    onChange(transformValue(e.target.value), e);
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
            <div className={`NuiTextInput ${className}`}>
                {label && (
                    <label
                        className={clsx([
                            "NuiTextInput__label",
                            focused && "focused",
                            errors.length && touched && "invalid",
                        ])}
                        children={label}
                    />
                )}
                <div
                    className={clsx([
                        "NuiTextInput__inputContainer",
                        focused && "focused",
                        errors.length && touched && "invalid",
                    ])}
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
                        mask={mask}
                        guide={guide}
                        placeholderChar={placeholderChar}
                        keepCharPositions={keepCharPositions}
                        showMask={showMask}
                        pipe={pipe}
                    />
                </div>
                {errors.length > 0 && touched && (
                    <div
                        className="NuiTextInput__error"
                        children={_.first(errors)}
                    />
                )}
            </div>
        );
    })
);

const getBorder = ({ variant }: TextInputProps) => {
    switch (variant) {
        case "none":
        case "underline":
        case "filled-none":
        case "filled-underline":
            return "none";
        default:
            return undefined;
    }
};

const getUnderline = (type: "primary" | "danger") => ({
    variant,
}: TextInputProps) => {
    switch (variant) {
        case "none":
        case "filled-none":
            return undefined;
        default:
            return `linear-gradient(to top, var(--nui-context-${type}) 1px, transparent 1px)`;
    }
};

const ANIMATE_TIME = 0.2;

const StyledTextInput = styled(TextInput)`
    ${context}

    display: ${({ inline }) => (inline ? "inline-block" : "block")};
    width: 30ch;
    margin: ${({ inline }) => (inline ? "10px 10px 10px 0" : "10px 0")};
    transition: opacity ${ANIMATE_TIME}s;
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

    & .NuiTextInput__input {
        box-sizing: border-box;
        width: 100%;
        background: transparent;
        padding: 8px;
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

    & label, & .NuiTextInput__error {
        ${text.secondary}

        transition: color ${ANIMATE_TIME}s;
        font-size: 0.8em;
        font-weight: 500;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    & .NuiTextInput__error, & label.invalid {
        color: var(--nui-context-danger);
    }

    & label.focused {
        color: var(--nui-context-primary);
    }

    & .NuiTextInput__inputContainer {
        ${border.secondary}
        ${shadow.secondary}
        ${({ variant }) => {
            switch (variant) {
                case "filled":
                case "filled-none":
                case "filled-underline":
                    return background.secondary;
                default:
                    return undefined;
            }
        }}

        box-sizing: border-box;
        transition: background-image ${ANIMATE_TIME}s, border-color ${ANIMATE_TIME}s, background-size ${ANIMATE_TIME}s;
        background-image: ${getUnderline("primary")};
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0% 100%;
        padding: 0;
        box-shadow: ${({ variant }) => {
            switch (variant) {
                case undefined:
                case "filled":
                case "filled-underline":
                case "outline":
                case "filled-none":
                    return "0 1px 2px -1px var(--nui-shadow)";
                default:
                    return undefined;
            }
        }};
        border-style: solid;
        border-width: ${({ variant }) => {
            switch (variant) {
                case "none":
                case "filled-none":
                    return "0";
                default:
                    return "1px";
            }
        }};
        border-left: ${getBorder};
        border-right: ${getBorder};
        border-top: ${getBorder};

        &.invalid {
            border-color: var(--nui-context-danger);
            background-image: ${getUnderline("danger")}
        }

        &.focused {
            border-color: var(--nui-context-primary);
            background-size: 100% 100%;
            background-image: ${getUnderline("primary")};
        }
    }
`;

StyledTextInput.displayName = createComponentName("TextInput");

export default StyledTextInput as typeof TextInput;
