import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { createComponentName } from "@utils";
import { shadow, text, context, background } from "@theme";
import { NuiButton } from "./types";

// FIXME: weird glitch happens when the button is pressed (often but not always)

const Button: NuiButton = React.forwardRef((props, ref) => {
    const {
        icon,
        className,
        children,
        iconPosition = "left",
        size = "sm",
        variant = "filled",
        color = "default",
        disableShadow = false,
        ...restProps
    } = props;

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiButton",
                [iconPosition == "right" && "NuiButton--iconposition-right"],
                [
                    size == "xs" && "NuiButton--size-xs",
                    size == "md" && "NuiButton--size-md",
                    size == "lg" && "NuiButton--size-lg",
                    size == "xl" && "NuiButton--size-xl",
                ],
                [
                    color == "primary" && "NuiButton--color-primary",
                    color == "secondary" && "NuiButton--color-secondary",
                    color == "warn" && "NuiButton--color-warn",
                    color == "danger" && "NuiButton--color-danger",
                    color == "success" && "NuiButton--color-success",
                    color == "info" && "NuiButton--color-info",
                ],
                [
                    variant == "empty" && "NuiButton--variant-empty",
                    variant == "outline" && "NuiButton--variant-outline",
                    variant == "round" && "NuiButton--variant-round",
                    variant == "round-outline" &&
                        "NuiButton--variant-round-outline",
                    variant == "round-empty" &&
                        "NuiButton--variant-round-empty",
                ],
                disableShadow && "NuiButton--disableshadow",
                className,
            ]),
        [className, color, disableShadow, iconPosition, size, variant]
    );

    return (
        <button className={classes} type="button" ref={ref} {...restProps}>
            <div className="NuiButton__content">
                {icon && <div className="NuiButton__icon" children={icon} />}
                {children && (
                    <div className="NuiButton__main" children={children} />
                )}
            </div>
        </button>
    );
});

const StyledButton = styled(Button)`
    ${shadow.primary}
    ${text.primary}
    ${background.dimmed}
    ${background.dark}
    ${context}

    --nui-button-color: var(--nui-background-dimmed);
    --nui-button-color-hover: var(--nui-background-dark);

    --nui-button-outline: var(--nui-text-primary);
    --nui-button-outline-hover: var(--nui-text-primary);
    --nui-button-outline-background: var(--nui-background-dimmed);

    outline: none;
    border: 2px solid var(--nui-button-color);
    padding: 0;
    border-radius: 4px;
    box-shadow: 0 2px 3px var(--nui-shadow);
    margin: 5px;
    font-weight: 600;
    background-color: var(--nui-button-color);
    transform: translateY(0) translateZ(0);
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s, border-color 0.2s, color 0.2s;
    user-select: none;
    cursor: pointer;

    &:hover, &:focus-visible {
        background-color: var(--nui-button-color-hover);
        border-color: var(--nui-button-color-hover);
    }
    &:active {
        box-shadow: 0 0 0 var(--nui-shadow);
        transform: translateY(2px) translateZ(0);
    }
    &:disabled {
        cursor: default;
        pointer-events: none;
        opacity: 0.7;
        box-shadow: none;
    }

    & .NuiButton__content {
        box-sizing: border-box;
        padding: 8px;
        display: flex;
        gap: 5px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    & .NuiButton__icon, & .NuiButton__main {
        position: relative;
    }

    & .NuiButton__icon {
        display: flex;
        align-items: center;

        & > svg {
            width: 1em;
            height: 1em;
        }
    }

    &.NuiButton--iconposition-right .NuiButton__content {
        flex-direction: row-reverse;
    }

    &.NuiButton--color-primary {
        ${text.contrast}
        --nui-button-color: var(--nui-context-primary);
        --nui-button-color-hover: var(--nui-context-primaryDark);
        --nui-button-outline: var(--nui-context-primary);
        --nui-button-outline-hover: var(--nui-context-primaryDark);
        --nui-button-outline-background: var(--nui-context-primaryVLight);
    }
    &.NuiButton--color-secondary {
        ${text.contrast}
        --nui-button-color: var(--nui-context-secondary);
        --nui-button-color-hover: var(--nui-context-secondaryDark);
        --nui-button-outline: var(--nui-context-secondary);
        --nui-button-outline-hover: var(--nui-context-secondaryDark);
        --nui-button-outline-background: var(--nui-context-secondaryVLight);
    }
    &.NuiButton--color-warn {
        ${text.contrast}
        --nui-button-color: var(--nui-context-warn);
        --nui-button-color-hover: var(--nui-context-warnDark);
        --nui-button-outline: var(--nui-context-warn);
        --nui-button-outline-hover: var(--nui-context-warnDark);
        --nui-button-outline-background: var(--nui-context-warnVLight);
    }
    &.NuiButton--color-danger {
        ${text.contrast}
        --nui-button-color: var(--nui-context-danger);
        --nui-button-color-hover: var(--nui-context-dangerDark);
        --nui-button-outline: var(--nui-context-danger);
        --nui-button-outline-hover: var(--nui-context-dangerDark);
        --nui-button-outline-background: var(--nui-context-dangerVLight);
    }
    &.NuiButton--color-success {
        ${text.contrast}
        --nui-button-color: var(--nui-context-success);
        --nui-button-color-hover: var(--nui-context-successDark);
        --nui-button-outline: var(--nui-context-success);
        --nui-button-outline-hover: var(--nui-context-successDark);
        --nui-button-outline-background: var(--nui-context-successVLight);
    }
    &.NuiButton--color-info {
        ${text.contrast}
        --nui-button-color: var(--nui-context-info);
        --nui-button-color-hover: var(--nui-context-infoDark);
        --nui-button-outline: var(--nui-context-info);
        --nui-button-outline-hover: var(--nui-context-infoDark);
        --nui-button-outline-background: var(--nui-context-infoVLight);
    }

    &.NuiButton--disableshadow {
        box-shadow: none;
    }

    &.NuiButton--variant-outline, &.NuiButton--variant-round-outline, &.NuiButton--variant-empty, &.NuiButton--variant-round-empty {
        background-color: transparent;
        box-shadow: none;
        color: var(--nui-button-outline);
        &:hover {
            color: var(--nui-button-outline-hover);
            background-color: var(--nui-button-outline-background);
        }
    }
    &.NuiButton--variant-empty, &.NuiButton--variant-round-empty {
        border-color: transparent;
    }
    &.NuiButton--variant-round, &.NuiButton--variant-round-outline, &.NuiButton--variant-round-empty {
        border-radius: 50%;
    } 
`;

Button.displayName = createComponentName("Button");
StyledButton.displayName = createComponentName("StyledButton");

export default StyledButton as typeof Button;
