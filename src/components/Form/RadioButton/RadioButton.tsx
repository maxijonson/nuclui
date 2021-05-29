import React from "react";
import styled from "styled-components";
import { border, context, background } from "@theme";
import { createComponentName } from "@utils";
import clsx from "clsx";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiRadioButton } from "./types";
import { CheckboxContainer } from "../CheckboxContainer";
import { RadioGroupContext } from "../RadioGroup/RadioGroup";
import { extractCheckboxContainerProps } from "../CheckboxContainer/CheckboxContainer";

const RadioButton: NuiRadioButton = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: { onChange, value, className, ...inputProps },
            ...checkboxContainerProps
        } = extractCheckboxContainerProps(props);
        const { onFocus, onBlur } = inputProps;
        const { disabled } = checkboxContainerProps;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const ctx = React.useContext(RadioGroupContext);

        const checked = React.useMemo(() => {
            if (ctx.value != undefined) return value == ctx.value;
            if (props.checked != undefined) return props.checked;
            return undefined;
        }, [ctx.value, props.checked, value]);

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
                setTouched(true);
                if (onChange) {
                    onChange(e.currentTarget.value, e);
                } else if (ctx.onChange) {
                    ctx.onChange(e.currentTarget.value, e);
                }
            },
            [ctx, onChange]
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
            <StyledRadioButton
                {...checkboxContainerProps}
                className={clsx(["NuiRadioButton", className])}
                focused={focused}
                touched={touched}
                size={props.size ?? ctx.size}
            >
                <input
                    {...inputProps}
                    ref={ref}
                    disabled={disabled}
                    name={props.name ?? ctx.name}
                    value={value}
                    checked={checked}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    className="NuiRadioButton__input"
                />
                <div className="NuiRadioButton__container" />
            </StyledRadioButton>
        );
    })
);

const StyledRadioButton = styled(CheckboxContainer)`
    ${context}

    & .NuiRadioButton__container {
        cursor: pointer;
        pointer-events: all;
    }

    & .NuiRadioButton__input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 0;
        height: 0;
        opacity: 0;

        &:focus-visible ~ .NuiRadioButton__container {
            ${background.dimmed}
        }

        &:active ~ .NuiRadioButton__container {
            ${background.secondary}

            border-color: var(--nui-context-primary);
        }

        &:checked {
            & ~ .NuiRadioButton__container {
                background-color: var(--nui-context-primary);
                transform: scale(1);
                border-color: transparent;
            }

            & ~ .NuiRadioButton__container::after {
                transform: translate(-50%, -50%) scale(1);
            }

            &:focus-visible ~ .NuiRadioButton__container {
                background-color: var(--nui-context-primaryLight);
            }

            &:active ~ .NuiRadioButton__container {
                ${border.primary}

                background-color: var(--nui-context-primaryDark);
            }
        }
    }

    & .NuiRadioButton__container {
        ${border.primary}

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border-radius: 50%;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        transition: background-color 200ms ease-out, border-color 200ms ease-out;

        &:active {
            ${background.dimmed}
        }

        &::after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 300ms ease-out;
            width: 50%;
            height: 50%;
            border-radius: 50%;
            background-color: white;
            content: "";
        }
    }

    &.NuiInputBase--disabled {
        & .NuiRadioButton__container {
            cursor: default;
            pointer-events: none;
        }

        & .NuiRadioButton__container {
            border-style: dashed;
        }

        & .NuiRadioButton__input:checked ~ .NuiRadioButton__container {
            background-color: var(--nui-context-primaryDark);
        }
    }
`;

StyledRadioButton.displayName = createComponentName("StyledRadioButton");
RadioButton.displayName = createComponentName("RadioButton");

export default RadioButton;
