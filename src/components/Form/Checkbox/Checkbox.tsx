import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import { border, context, text, background } from "@theme";
import { createComponentName } from "@utils";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiCheckbox } from "./types";

const Checkbox: NuiCheckbox = React.memo(
    React.forwardRef((props, ref) => {
        const {
            className,
            label,
            onFocus,
            onChange,
            onBlur,
            value,
            inputValue,
            labelPosition,
            errors: errorsProp,
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const errors = React.useMemo(() => errorsProp || [], [errorsProp]);

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

        const classes = React.useMemo(
            () =>
                clsx(
                    "NuiCheckbox",
                    [
                        labelPosition == "top" && "NuiCheckbox--position-top",
                        labelPosition == "bottom" &&
                            "NuiCheckbox--position-bottom",
                        labelPosition == "left" && "NuiCheckbox--position-left",
                    ],
                    props.disabled && "NuiCheckbox--disabled",
                    errors.length && touched && "NuiCheckbox--invalid",
                    focused && "NuiCheckbox--focused",
                    className
                ),
            [
                className,
                errors.length,
                focused,
                labelPosition,
                props.disabled,
                touched,
            ]
        );

        return (
            <label className={classes}>
                <div className="NuiCheckbox__container">
                    {label && <div className="NuiCheckbox__label">{label}</div>}
                    <div className="NuiCheckbox__inputContainer">
                        <input
                            {...restProps}
                            value={inputValue}
                            checked={value}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            ref={ref}
                            type="checkbox"
                            className="NuiCheckbox__input"
                        />
                        <div className="NuiCheckbox__customInput" />
                    </div>
                </div>
                {errors.length > 0 && touched && (
                    <div
                        className="NuiCheckbox__error"
                        children={_.first(errors)}
                    />
                )}
            </label>
        );
    })
);

const StyledCheckbox = styled(Checkbox)`
    ${context}

    position: relative;
    display: flex;
    width: fit-content;
    pointer-events: none;
    flex-direction: column;

    & .NuiCheckbox__label,
    & .NuiCheckbox__error {
        ${text.secondary}

        transition: color 0.2s;
        font-size: 0.8em;
        font-weight: 500;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    & .NuiCheckbox__inputContainer {
        position: relative;
        width: 18px;
        height: 18px;
    }

    & .NuiCheckbox__input,
    & .NuiCheckbox__customInput,
    & .NuiCheckbox__label {
        cursor: pointer;
        pointer-events: all;
    }

    & .NuiCheckbox__input {
        position: absolute;
        opacity: 0;

        &:focus-visible ~ .NuiCheckbox__customInput {
            ${background.dimmed}
        }

        &:active ~ .NuiCheckbox__customInput {
            ${background.secondary}

            border-color: var(--nui-context-primary);
        }

        &:checked ~ .NuiCheckbox__customInput {
            background-color: var(--nui-context-primary);
            transform: scale(1);
            border-color: transparent;
        }

        &:checked ~ .NuiCheckbox__customInput::after {
            border-color: white;
            border-width: 0px;
            border-style: solid;
            border-right-width: 2px;
            border-bottom-width: 2px;
            transform: translate(-45%, -58%) rotate(40deg) scale(1);
        }

        &:checked:focus-visible ~ .NuiCheckbox__customInput {
            background-color: var(--nui-context-primaryLight);
        }

        &:checked:active ~ .NuiCheckbox__customInput {
            ${border.primary}

            background-color: var(--nui-context-primaryDark);
        }
    }

    & .NuiCheckbox__customInput {
        ${border.primary}

        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
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
            width: 3px;
            height: 9px;
            transform: translate(-45%, -58%) rotate(40deg) scale(0);
            transition: transform 300ms ease-out;
            content: "";
        }
    }

    & .NuiCheckbox__container {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-direction: row-reverse;
    }

    &.NuiCheckbox--position-top {
        & .NuiCheckbox__container {
            gap: 0;
            flex-direction: column;
        }
    }

    &.NuiCheckbox--position-left {
        & .NuiCheckbox__container {
            gap: 10px;
            flex-direction: row;
        }
    }

    &.NuiCheckbox--position-bottom {
        flex-direction: column-reverse;

        & .NuiCheckbox__container {
            gap: 0;
            flex-direction: column-reverse;
        }
    }

    &.NuiCheckbox--disabled {
        opacity: 0.5;

        & .NuiCheckbox__input,
        & .NuiCheckbox__customInput,
        & .NuiCheckbox__label {
            cursor: default;
            pointer-events: none;
        }

        & .NuiCheckbox__customInput {
            border-style: dashed;
        }

        & .NuiCheckbox__input:checked ~ .NuiCheckbox__customInput {
            background-color: var(--nui-context-primaryDark);
        }
    }

    &.NuiCheckbox--invalid {
        & .NuiCheckbox__label,
        & .NuiCheckbox__error {
            color: var(--nui-context-danger);
        }
    }
`;

StyledCheckbox.displayName = createComponentName("Checkbox");

export default StyledCheckbox as typeof Checkbox;
