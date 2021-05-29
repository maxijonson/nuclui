import React from "react";
import styled from "styled-components";
import { border, context, background } from "@theme";
import { createComponentName } from "@utils";
import clsx from "clsx";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiCheckbox } from "./types";
import { CheckboxContainer } from "../CheckboxContainer";
import { extractCheckboxContainerProps } from "../CheckboxContainer/CheckboxContainer";

const Checkbox: NuiCheckbox = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                onChange,
                className,
                value,
                inputValue,
                ...inputProps
            },
            ...checkboxContainerProps
        } = extractCheckboxContainerProps(props);
        const { onFocus, onBlur } = inputProps;
        const { disabled } = checkboxContainerProps;

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
                setTouched(true);
                if (onChange) {
                    onChange(e.currentTarget.checked, e);
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
            <StyledCheckbox
                {...checkboxContainerProps}
                className={clsx(["NuiCheckbox", className])}
                focused={focused}
                touched={touched}
            >
                <input
                    {...inputProps}
                    ref={ref}
                    disabled={disabled}
                    value={inputValue}
                    checked={value}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="checkbox"
                    className="NuiCheckbox__input"
                />
                <div className="NuiCheckbox__container" />
            </StyledCheckbox>
        );
    })
);

const StyledCheckbox = styled(CheckboxContainer)`
    ${context}

    & .NuiCheckbox__input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;

        &:focus-visible ~ .NuiCheckbox__container {
            ${background.dimmed}
        }

        &:active ~ .NuiCheckbox__container {
            ${background.secondary}

            border-color: var(--nui-context-primary);
        }

        &:checked {
            & ~ .NuiCheckbox__container {
                background-color: var(--nui-context-primary);
                transform: scale(1);
                border-color: transparent;
            }

            & ~ .NuiCheckbox__container::after {
                border-color: white;
                border-width: 0px;
                border-style: solid;
                border-right-width: calc(var(--nui-inputBase-size) / 9);
                border-bottom-width: calc(var(--nui-inputBase-size) / 9);
                transform: translate(-45%, -58%) rotate(40deg) scale(1);
            }

            &:focus-visible ~ .NuiCheckbox__container {
                background-color: var(--nui-context-primaryLight);
            }

            &:active ~ .NuiCheckbox__container {
                ${border.primary}

                background-color: var(--nui-context-primaryDark);
            }
        }
    }

    & .NuiCheckbox__container {
        ${border.primary}

        cursor: pointer;
        pointer-events: all;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border-radius: 2px;
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
            width: calc(var(--nui-inputBase-size) / 6);
            height: calc(var(--nui-inputBase-size) / 2);
            transform: translate(-45%, -58%) rotate(40deg) scale(0);
            transition: transform 300ms ease-out;
            content: "";
        }
    }

    &.NuiInputBase--disabled {
        & .NuiCheckbox__container {
            cursor: default;
            pointer-events: none;
        }

        & .NuiCheckbox__container {
            border-style: dashed;
        }

        & .NuiCheckbox__input:checked ~ .NuiCheckbox__container {
            background-color: var(--nui-context-primaryDark);
        }
    }
`;

StyledCheckbox.displayName = createComponentName("StyledCheckbox");
Checkbox.displayName = createComponentName("Checkbox");

export default Checkbox;
