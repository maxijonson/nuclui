import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { background, border, context, shadow, text } from "@theme";
import { createComponentName } from "@utils";
import { InputContainerProps, NuiInputContainer } from "./types";

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
            focused = false,
            touched = true,
            ...restProps
        } = props;

        const errors = React.useMemo(() => props.errors || [], [props.errors]);

        return (
            <div
                className={clsx([
                    "NuiInputContainer",
                    className,
                    focused && "focused",
                ])}
                ref={ref}
                {...restProps}
            >
                {label && (
                    <label
                        className={clsx([
                            "NuiInputContainer__label",
                            focused && "focused",
                            errors.length && touched && "invalid",
                        ])}
                        children={label}
                    />
                )}
                <div
                    className={clsx([
                        "NuiInputContainer__container",
                        focused && "focused",
                        errors.length && touched && "invalid",
                    ])}
                >
                    {prepend && (
                        <div
                            className={clsx([
                                "NuiInputContainer__prepend",
                                focused && "focused",
                            ])}
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

const getBorder = ({ variant }: InputContainerProps) => {
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
}: InputContainerProps) => {
    switch (variant) {
        case "none":
        case "filled-none":
            return undefined;
        default:
            return `linear-gradient(to top, var(--nui-context-${type}) 1px, transparent 1px)`;
    }
};

const TRANSITION_TIME = 0.2;

const StyledInputContainer = styled(InputContainer)`
    ${context}

    position: relative;
    max-width: 100%;
    margin: 10px 0;
    transition: opacity ${TRANSITION_TIME}s;
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
    width: ${({ size }) => {
        if (size) return typeof size === "string" ? size : `${size}ch`;
        return "30ch";
    }};

    & .NuiInputContainer__prepend, & .NuiInputContainer__append {
        ${({ variant }) => {
            switch (variant) {
                case "filled":
                case "filled-none":
                case "filled-underline":
                    return background.dimmed;
                default:
                    return background.secondary;
            }
        }}

        display: flex;
        align-items: center;
        margin-bottom: 0px;
        padding: 8px;
        font-size: 16px;
        line-height: 19px;

        &.focused {
            padding-bottom: 7px;
            margin-bottom: 1px;
        }

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

    & .NuiInputContainer__error, & label.invalid {
        color: var(--nui-context-danger);
    }

    & label.focused {
        color: var(--nui-context-primary);
    }

    & .NuiInputContainer__container {
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

        display: flex;
        box-sizing: border-box;
        transition: background-image ${TRANSITION_TIME}s, border-color ${TRANSITION_TIME}s, background-size ${TRANSITION_TIME}s;
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

StyledInputContainer.displayName = createComponentName("InputContainer");

export default StyledInputContainer as typeof InputContainer;
