import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import MaskedInput from "react-text-mask";
import { createComponentName } from "@utils";
import { border, shadow, text, background, context } from "@theme";
import { NuiTextInput, HTMLInputProps, TextInputProps } from "./types";
import { useFormContext } from "../useFormContext";

const TextInput: NuiTextInput = React.memo(
    React.forwardRef((props, ref) => {
        const {
            initial = "",
            initialTouched = false,
            type = "text",
            validateWhen = "blur",
            transformWhen = "change",
            required = false,
            mask = false,
            guide = true,
            placeholderChar = "_",
            keepCharPositions = false,
            showMask = false,
            pipe,
            name,
            label,
            className,
            validate,
            transform,
            variant,
            ...restProps
        } = props;

        const { value, setValue, errors, setErrors } = useFormContext(
            name,
            initial
        );
        const [touched, setTouched] = React.useState(initialTouched);
        const [focused, setFocused] = React.useState(false);

        const prevChangeValue = React.useRef(value);
        const prevBlurValue = React.useRef(value);

        const runValidation = React.useCallback(
            (v: string) => {
                // No validation required
                if (!validate && !required) return;

                // Require that there is a value
                if (required && !v) return setErrors("This field is required");

                // Use the validation function provided
                if (validate) {
                    const valid = validate(v);
                    if (valid == false || typeof valid === "string") {
                        return setErrors(
                            typeof valid === "string"
                                ? valid
                                : "Field validation failed"
                        );
                    }
                }

                setErrors(null);
            },
            [required, setErrors, validate]
        );

        const transformValue = React.useCallback(
            (prev: string, v: string) => (transform ? transform(prev, v) : v),
            [transform]
        );

        const onChange = React.useCallback<HTMLInputProps["onChange"]>(
            (evt) => {
                const evtValue = evt.target.value;
                const next =
                    transformWhen == "change"
                        ? transformValue(prevChangeValue.current, evtValue)
                        : evtValue;

                if (validateWhen == "change") {
                    runValidation(next);
                }

                setValue(next);
                prevChangeValue.current = next;
            },
            [
                runValidation,
                setValue,
                transformValue,
                transformWhen,
                validateWhen,
            ]
        );

        const onFocus = React.useCallback(() => {
            setFocused(true);
        }, []);

        const onBlur = React.useCallback<HTMLInputProps["onBlur"]>(
            (evt) => {
                const evtValue = evt.target.value;
                const next =
                    transformWhen == "blur"
                        ? transformValue(prevBlurValue.current, evtValue)
                        : evtValue;

                if (validateWhen == "blur") {
                    runValidation(next);
                }

                if (next != evtValue) {
                    setValue(next);
                }

                if (!touched) {
                    setTouched(true);
                }

                setFocused(false);
                prevBlurValue.current = next;
            },
            [
                runValidation,
                setValue,
                touched,
                transformValue,
                transformWhen,
                validateWhen,
            ]
        );

        React.useEffect(() => {
            runValidation(initial);
            // This effect should only run once in the TextInput's lifecycle. Changes in the "initial" prop should have no effect to the component at all.
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

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
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        value={value}
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

const StyledTextInput = styled(TextInput)`
    ${context}

    width: 30ch;
    margin: 10px 0;

    & .NuiTextInput__input {
        box-sizing: border-box;
        width: 100%;
        background: transparent;
        padding: 8px;
        border: none;

        &:focus {
            outline: none;
        }
    }

    & label, & .NuiTextInput__error {
        ${text.secondary}

        transition: color 0.2s;
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
        transition: background-image 0.2s, border-color 0.2s, background-size 0.2s;
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
