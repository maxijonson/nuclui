import React from "react";
import styled from "styled-components";
import { border, context, background } from "@theme";
import { createComponentName } from "@utils";
import clsx from "clsx";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiCheckbox } from "./types";
import { CheckboxContainer } from "../CheckboxContainer";

const Checkbox: NuiCheckbox = React.memo(
    React.forwardRef((props, ref) => {
        const {
            className,
            onFocus,
            onChange,
            onBlur,
            errors: errorsProp,
            size,
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const errors = React.useMemo(() => errorsProp || [], [errorsProp]);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiCheckbox",
                    [
                        size == "xs" && "NuiCheckbox--size-xs",
                        size == "md" && "NuiCheckbox--size-md",
                        size == "lg" && "NuiCheckbox--size-lg",
                        size == "xl" && "NuiCheckbox--size-xl",
                    ],
                    className,
                ]),
            [className, size]
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
                    onChange(e.currentTarget.checked, e);
                }
                setTouched(true);
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
            <StyledCheckboxContainer
                {...restProps}
                ref={ref}
                className={classes}
                focused={focused}
                touched={touched}
                errors={errors}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <div className="NuiCheckbox__container" />
            </StyledCheckboxContainer>
        );
    })
);

const StyledCheckboxContainer = styled(CheckboxContainer)`
    ${context}
    --nui-checkbox-size: 18px;

    & .NuiCheckbox__container {
        cursor: pointer;
        pointer-events: all;
    }

    & .NuiCheckboxContainer__input {
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
                border-right-width: calc(var(--nui-checkbox-size) / 9);
                border-bottom-width: calc(var(--nui-checkbox-size) / 9);
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

    & .NuiCheckboxContainer__inputContainer {
        width: var(--nui-checkbox-size);
        height: var(--nui-checkbox-size);
    }

    & .NuiCheckbox__container {
        ${border.primary}

        position: absolute;
        top: 0;
        left: 0;
        width: var(--nui-checkbox-size);
        height: var(--nui-checkbox-size);
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
            width: calc(var(--nui-checkbox-size) / 6);
            height: calc(var(--nui-checkbox-size) / 2);
            transform: translate(-45%, -58%) rotate(40deg) scale(0);
            transition: transform 300ms ease-out;
            content: "";
        }
    }

    &.NuiCheckboxContainer--disabled {
        & .NuiCheckbox__container {
            cursor: default;
            pointer-events: none;
        }

        & .NuiCheckbox__container {
            border-style: dashed;
        }

        & .NuiCheckboxContainer__input:checked ~ .NuiCheckbox__container {
            background-color: var(--nui-context-primaryDark);
        }
    }

    &.NuiCheckbox--size-xs {
        --nui-checkbox-size: 12px;
    }
    &.NuiCheckbox--size-md {
        --nui-checkbox-size: 24px;
    }
    &.NuiCheckbox--size-lg {
        --nui-checkbox-size: 32px;
    }
    &.NuiCheckbox--size-xl {
        --nui-checkbox-size: 42px;
    }
`;

Checkbox.displayName = createComponentName("Checkbox");

export default Checkbox;
