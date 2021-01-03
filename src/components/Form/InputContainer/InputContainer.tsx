import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { background, border, context, shadow, text } from "@theme";
import { createComponentName } from "@utils";
import { NuiInputContainer } from "./types";

const InputContainer: NuiInputContainer = React.memo(
    React.forwardRef((props, ref) => {
        const {
            label,
            className,
            variant,
            append,
            prepend,
            size,
            children,
            disabled,
            fluid = false,
            focused = false,
            touched = true,
            errors: errorsProp,
            ...restProps
        } = props;

        const errors = React.useMemo(() => errorsProp || [], [errorsProp]);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiInputContainer",
                    focused && "NuiInputContainer--focused",
                    errors.length && touched && "NuiInputContainer--invalid",
                    [
                        size == "xs" && "NuiInputContainer--size-xs",
                        size == "md" && "NuiInputContainer--size-md",
                        size == "lg" && "NuiInputContainer--size-lg",
                        size == "xl" && "NuiInputContainer--size-xl",
                    ],
                    [
                        variant == "underline" &&
                            "NuiInputContainer--variant-underline",
                        variant == "none" && "NuiInputContainer--variant-none",
                        variant == "filled" &&
                            "NuiInputContainer--variant-filled",
                        variant == "filled-underline" &&
                            "NuiInputContainer--variant-filled-underline",
                        variant == "filled-none" &&
                            "NuiInputContainer--variant-filled-none",
                    ],
                    disabled && "NuiInputContainer--disabled",
                    fluid && "NuiInputContainer--fluid",
                    className,
                ]),
            [
                className,
                disabled,
                errors.length,
                fluid,
                focused,
                size,
                touched,
                variant,
            ]
        );

        return (
            <div {...restProps} className={classes} ref={ref}>
                {label && (
                    <label
                        className="NuiInputContainer__label"
                        children={label}
                    />
                )}
                <div className="NuiInputContainer__container">
                    {prepend && (
                        <div
                            className="NuiInputContainer__prepend"
                            children={prepend}
                        />
                    )}
                    {children}
                    {append && (
                        <div
                            className="NuiInputContainer__append"
                            children={append}
                        />
                    )}
                    <div className="NuiInputContainer__underline" />
                </div>
                {errors.length > 0 && touched && (
                    <div
                        className="NuiInputContainer__error"
                        children={_.first(errors)}
                    />
                )}
            </div>
        );
    })
);

const TRANSITION_TIME = 0.2;

const StyledInputContainer = styled(InputContainer)`
    ${context}
    --nui-inputContainer-size: 18px;
    --nui-inputContainer-underline: 1px;
    --nui-inputContainer-pad: 8px;
    --nui-inputContainer-font: 17px;

    position: relative;
    max-width: 100%;
    margin: 10px 0;
    transition: opacity ${TRANSITION_TIME}s;
    width: calc(var(--nui-inputContainer-size) * 18);

    & .NuiInputContainer__prepend, & .NuiInputContainer__append {
        ${background.secondary}

        display: flex;
        align-items: center;
        margin-bottom: 0px;
        padding: var(--nui-inputContainer-pad);
        font-size: calc(var(--nui-inputContainer-font) / 1.2);

        & svg {
            fill: currentColor;
            width: 1em;
            height: 1em;
            font-size: 1rem;
            user-select: none;
        }
    }

    & .NuiInputContainer__label, & .NuiInputContainer__error {
        ${text.secondary}

        transition: color ${TRANSITION_TIME}s;
        font-size: calc(var(--nui-inputContainer-font) / 1.25);
        font-weight: 500;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    & .NuiInputContainer__container {
        ${border.secondary}
        ${shadow.secondary}

        display: flex;
        position: relative;
        box-sizing: border-box;
        transition: border-color ${TRANSITION_TIME}s;
        padding: 0;
        box-shadow: 0 1px 2px -1px var(--nui-shadow);
        border-style: solid;
        border-width: 1px;

        & input {
            padding: var(--nui-inputContainer-pad);
            font-size: var(--nui-inputContainer-font);
            box-sizing: border-box;
            width: 100%;
            background: transparent;
            border: none;
            min-width: 0;

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
    }

    & .NuiInputContainer__underline {
        position: absolute;
        width: 100%;
        height: var(--nui-inputContainer-underline);
        left: 0;
        bottom: 0;
        background-color: var(--nui-context-primary);
        transform-origin: 50% 50%;
        transform: scaleX(0);
        transition: transform ${TRANSITION_TIME}s;
    }

    &.NuiInputContainer--variant-underline {
        & .NuiInputContainer__prepend, 
        & .NuiInputContainer__append {
            ${background.secondary}
        }

        & .NuiInputContainer__container {
            box-shadow: none;
            border-width: 0px;
            border-bottom-width: 1px;
        }
    }

    &.NuiInputContainer--variant-none {
        & .NuiInputContainer__prepend, 
        & .NuiInputContainer__append {
            ${background.secondary}
        }

        & .NuiInputContainer__container {
            box-shadow: none;
            border-width: 0;
            border-left: none;
            border-right: none;
            border-top: none;
        }

        & .NuiInputContainer__underline {
            display: none;
        }
    }

    &.NuiInputContainer--variant-filled {
        & .NuiInputContainer__prepend, 
        & .NuiInputContainer__append {
            ${background.dimmed}
        }

        & .NuiInputContainer__container {
            ${background.secondary}

            box-shadow: 0 1px 2px -1px var(--nui-shadow);
            border-width: 1px;
        }
    }

    &.NuiInputContainer--variant-filled-underline {
        & .NuiInputContainer__prepend, 
        & .NuiInputContainer__append {
            ${background.dimmed}
        }

        & .NuiInputContainer__container {
            ${background.secondary}

            box-shadow: 0 1px 2px -1px var(--nui-shadow);
            border-width: 1px;
            border-left: none;
            border-right: none;
            border-top: none;
        }
    }

    &.NuiInputContainer--variant-filled-none {
        & .NuiInputContainer__prepend, 
        & .NuiInputContainer__append {
            ${background.dimmed}
        }

        & .NuiInputContainer__container {
            ${background.secondary}

            box-shadow: none;
            border-width: 0;
            border-left: none;
            border-right: none;
            border-top: none;
        }

        & .NuiInputContainer__underline {
            display: none;
        }
    }

    &.NuiInputContainer--focused {
        & .NuiInputContainer__label {
            color: var(--nui-context-primary);
        }

        & .NuiInputContainer__container {
            border-color: var(--nui-context-primary);
        }

        & .NuiInputContainer__underline {
            transform: scaleX(1);
        }
    }

    &.NuiInputContainer--invalid {
        & .NuiInputContainer__error, 
        & .NuiInputContainer__label {
            color: var(--nui-context-danger);
        }

        & .NuiInputContainer__container {
            border-color: var(--nui-context-danger);
        }

        & .NuiInputContainer__underline {
            background-color: var(--nui-context-danger);
        }
    }

    &.NuiInputContainer--disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    &.NuiInputContainer--fluid {
        width: 100%;
    }

    &.NuiInputContainer--size-xs {
        --nui-inputContainer-size: 14px;
        --nui-inputContainer-underline: 1px;
        --nui-inputContainer-pad: 4px;
        --nui-inputContainer-font: 12px;
    }
    &.NuiInputContainer--size-md {
        --nui-inputContainer-size: 24px;
        --nui-inputContainer-underline: 1px;
        --nui-inputContainer-pad: 10px;
        --nui-inputContainer-font: 23px;
    }
    &.NuiInputContainer--size-lg {
        --nui-inputContainer-size: 32px;
        --nui-inputContainer-underline: 2px;
        --nui-inputContainer-pad: 12px;
        --nui-inputContainer-font: 30px;
    }
    &.NuiInputContainer--size-xl {
        --nui-inputContainer-size: 42px;
        --nui-inputContainer-underline: 2px;
        --nui-inputContainer-pad: 14px;
        --nui-inputContainer-font: 40px;
    }
`;

StyledInputContainer.displayName = createComponentName("InputContainer");

export default StyledInputContainer as typeof InputContainer;
