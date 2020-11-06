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
                    className,
                ]),
            [className, disabled, errors.length, focused, touched, variant]
        );

        const style = React.useMemo(
            () => ({
                width: _.isNumber(size) ? `${size}ch` : size,
                ...props.style,
            }),
            [props.style, size]
        );

        return (
            <div {...restProps} className={classes} ref={ref} style={style}>
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

    position: relative;
    max-width: 100%;
    margin: 10px 0;
    transition: opacity ${TRANSITION_TIME}s;
    width: 30ch;

    & .NuiInputContainer__prepend, & .NuiInputContainer__append {
        ${background.secondary}

        display: flex;
        align-items: center;
        margin-bottom: 0px;
        padding: 8px;
        font-size: 16px;
        line-height: 19px;

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
        font-size: 0.8em;
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
        transition: background-image ${TRANSITION_TIME}s, border-color ${TRANSITION_TIME}s, background-size ${TRANSITION_TIME}s;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0% 100%;
        padding: 0;
        box-shadow: 0 1px 2px -1px var(--nui-shadow);
        border-style: solid;
        border-width: 1px;

        & > input {
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
    }

    &.NuiInputContainer--variant-underline {
        & .NuiInputContainer__prepend, 
        & .NuiInputContainer__append {
            ${background.secondary}
        }

        & .NuiInputContainer__container {
            box-shadow: none;
            border-width: 1px;
            border-left: none;
            border-right: none;
            border-top: none;
            background-image: linear-gradient(to top, var(--nui-context-primary) 1px, transparent 1px);
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
            background-image: linear-gradient(to top, var(--nui-context-primary) 1px, transparent 1px);
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
            background-image: linear-gradient(to top, var(--nui-context-primary) 1px, transparent 1px);
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
    }

    &.NuiInputContainer--focused {
        & .NuiInputContainer__prepend, 
        & .NuiInputContainer__append {
            padding-bottom: 7px;
            margin-bottom: 1px;
        }

        & .NuiInputContainer__label {
            color: var(--nui-context-primary);
        }

        & .NuiInputContainer__container {
            border-color: var(--nui-context-primary);
            background-size: 100% 100%;
            background-image: linear-gradient(to top, var(--nui-context-primary) 1px, transparent 1px);
        }

        &.NuiInputContainer--variant-none .NuiInputContainer__container, 
        &.NuiInputContainer--variant-filled-none .NuiInputContainer__container {
            background-image: none;
        }
    }

    &.NuiInputContainer--invalid {
        & .NuiInputContainer__error, 
        & .NuiInputContainer__label {
            color: var(--nui-context-danger);
        }

        & .NuiInputContainer__container {
            border-color: var(--nui-context-danger);
            background-image: linear-gradient(to top, var(--nui-context-danger) 1px, transparent 1px);
        }

        &.NuiInputContainer--variant-none .NuiInputContainer__container, 
        &.NuiInputContainer--variant-filled-none .NuiInputContainer__container {
            background-image: none;
        }
    }

    &.NuiInputContainer--disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

StyledInputContainer.displayName = createComponentName("InputContainer");

export default StyledInputContainer as typeof InputContainer;
