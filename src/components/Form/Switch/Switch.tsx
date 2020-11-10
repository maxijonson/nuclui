import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { background, border, context, text } from "@theme";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiSwitch } from "./types";
import { CheckboxContainer } from "../CheckboxContainer";

const Switch: NuiSwitch = React.memo(
    React.forwardRef((props, ref) => {
        const {
            className,
            onFocus,
            onChange,
            onBlur,
            onChildren,
            offChildren,
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
                    "NuiSwitch",
                    [
                        size == "xs" && "NuiSwitch--size-xs",
                        size == "md" && "NuiSwitch--size-md",
                        size == "lg" && "NuiSwitch--size-lg",
                        size == "xl" && "NuiSwitch--size-xl",
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
                size={size}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <div className="NuiSwitch__container">
                    <div
                        className="NuiSwitch__text"
                        children={props.value ? onChildren : offChildren}
                    />
                    <div className="NuiSwitch__toggle" />
                </div>
            </StyledCheckboxContainer>
        );
    })
);

const StyledCheckboxContainer = styled(CheckboxContainer)`
    ${context}
    --nui-switch-pad: 2px;
    --nui-switch-toggle: calc(
        var(--nui-checkboxContainer-size) - (2 * var(--nui-switch-pad) + 2px)
    ); /* size - (2 * padding + 2 * toggle-border-width) */

    & .NuiSwitch__container {
        ${border.primary}

        cursor: pointer;
        pointer-events: all;
        border-radius: var(--nui-checkboxContainer-size);
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        height: 100%;
        min-width: calc(var(--nui-checkboxContainer-size) * 2);
        padding: var(--nui-switch-pad);
        position: relative;
        transition: background-color 0.2s, border-color 0.2s;
    }

    & .NuiSwitch__text {
        user-select: none;
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: var(--nui-switch-toggle);
        height: 100%;
        margin-left: calc(var(--nui-switch-toggle) + var(--nui-switch-pad));
        margin-right: var(--nui-switch-pad);
        transition: margin-left 0.3s, margin-right 0.3s, color 0.2s;
    }

    & .NuiSwitch__toggle {
        ${border.secondary}
        ${background.primary}

        border-radius: 50%;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        height: var(--nui-switch-toggle);
        left: var(--nui-switch-pad);
        position: absolute;
        top: var(--nui-switch-pad);
        transition: left 0.3s, border-color 0.2s, transform 0.2s;
        transform: scale(1);
        width: var(--nui-switch-toggle);
    }

    & .NuiCheckboxContainer__inputContainer {
        width: auto;
    }

    & .NuiCheckboxContainer__input {
        &:focus-visible ~ .NuiSwitch__container {
            ${background.dimmed}
        }

        &:active ~ .NuiSwitch__container {
            ${background.secondary}

            border-color: var(--nui-context-primary);

            & .NuiSwitch__toggle {
                transform: scale(0.9);
            }
        }

        &:checked {
            & ~ .NuiSwitch__container {
                background-color: var(--nui-context-primary);
                border-color: var(--nui-context-primary);

                & .NuiSwitch__text {
                    ${text.contrast}

                    margin-left: var(--nui-switch-pad);
                    margin-right: calc(
                        var(--nui-switch-toggle) + var(--nui-switch-pad)
                    );
                }

                & .NuiSwitch__toggle {
                    border-color: var(--nui-background-primary);
                    left: calc(
                        100% -
                            (var(--nui-switch-toggle) + var(--nui-switch-pad))
                    );
                }
            }

            &:focus-visible ~ .NuiSwitch__container {
                background-color: var(--nui-context-primaryLight);
            }

            &:active ~ .NuiSwitch__container {
                ${border.primary}

                background-color: var(--nui-context-primaryDark);
            }
        }
    }

    &.NuiCheckboxContainer--disabled {
        & .NuiSwitch__container {
            cursor: default;
            pointer-events: none;
        }

        & .NuiSwitch__container {
            border-style: dashed;
        }

        & .NuiCheckboxContainer__input:checked ~ .NuiSwitch__container {
            background-color: var(--nui-context-primaryDark);
            border-color: var(--nui-context-primaryDark);
        }
    }

    &.NuiSwitch--size-xs {
        --nui-switch-pad: 1px;
    }
    &.NuiSwitch--size-md {
        --nui-switch-pad: 3px;
    }
    &.NuiSwitch--size-lg {
        --nui-switch-pad: 4px;
    }
    &.NuiSwitch--size-xl {
        --nui-switch-pad: 5px;
    }
`;

Switch.displayName = createComponentName("Switch");

export default Switch;
