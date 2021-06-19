import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { createComponentName, isBetween, mergeRefs } from "@utils";
import { shadow, text, context, background } from "@theme";
import { quicksand } from "@fonts";
import { NuiButton } from "./types";

// FIXME: weird glitch happens when the button is pressed (Chrome only)
// TODO: Better confirm animation for round variants (scale from center)

const PRESSED_ANIMATION_DURATION = 100;

const Button: NuiButton = React.forwardRef((props, ref) => {
    const {
        icon,
        className,
        children,
        onClick,
        iconPosition = "left",
        size = "sm",
        variant = "filled",
        color = "default",
        disableShadow = false,
        confirmDuration = 0,
        disableFullAnimation = false,
        ...restProps
    } = props;

    const [isMouse, setIsMouse] = React.useState(true);
    const [recentlyPressed, setRecentlyPressed] = React.useState(false);

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const recentlyPressedTimeout = React.useRef<number>();

    const mergedRefs = React.useMemo(() => mergeRefs(ref, buttonRef), [ref]);

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
                confirmDuration != 0 && "NuiButton--confirm",
                disableShadow && "NuiButton--disableshadow",
                !isMouse && "NuiButton--isTouch",
                recentlyPressed && "NuiButton--recentlyPressed",
                className,
            ]),
        [
            className,
            color,
            confirmDuration,
            disableShadow,
            iconPosition,
            isMouse,
            recentlyPressed,
            size,
            variant,
        ]
    );

    // Temporarily adds the class to simulate a full button click, no matter the click speed
    const onRecentlyPressed = React.useCallback(() => {
        if (disableFullAnimation) return;
        setRecentlyPressed(true);
        window.clearTimeout(recentlyPressedTimeout.current);
        recentlyPressedTimeout.current = window.setTimeout(() => {
            setRecentlyPressed(false);
        }, PRESSED_ANIMATION_DURATION);
    }, [disableFullAnimation]);

    const handlePointerDown = React.useCallback(
        (e: React.PointerEvent<HTMLButtonElement>) => {
            setIsMouse(e.pointerType === "mouse");
            onRecentlyPressed();
        },
        [onRecentlyPressed]
    );

    const handleButtonClick = React.useCallback(
        (
            e:
                | React.MouseEvent<HTMLButtonElement>
                | React.TouchEvent<HTMLButtonElement>
        ) => {
            if (!onClick) return;
            if (confirmDuration == 0 || !buttonRef.current) {
                return onClick(e);
            }

            const beforeStyle = window.getComputedStyle(
                buttonRef.current,
                "::after"
            );
            const widthPx = beforeStyle.width;
            const [widthStr] = widthPx.split("px");
            const width = Number(widthStr);
            const buttonWidth = buttonRef.current.clientWidth;

            if (isBetween(width, buttonWidth - 1, buttonWidth + 1, true)) {
                return onClick(e);
            }
        },
        [confirmDuration, onClick]
    );

    const handleDoubleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
        },
        []
    );

    React.useEffect(
        () => () => {
            window.clearTimeout(recentlyPressedTimeout.current);
        },
        []
    );

    return (
        <button
            {...restProps}
            className={classes}
            type="button"
            ref={mergedRefs}
            onPointerDown={handlePointerDown}
            onClick={
                isMouse || confirmDuration == 0 ? handleButtonClick : undefined
            }
            onDoubleClick={handleDoubleClick}
            onTouchEnd={
                isMouse || confirmDuration == 0 ? undefined : handleButtonClick
            }
        >
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
    ${quicksand}
    
    --nui-button-color: var(--nui-background-dimmed);
    --nui-button-color-hover: var(--nui-background-dark);

    --nui-button-outline: var(--nui-text-primary);
    --nui-button-outline-hover: var(--nui-text-primary);
    --nui-button-outline-background: var(--nui-background-dimmed);

    --nui-button-size: 18px;
    --nui-button-pad: 4px;

    --nui-button-confirm-duration: ${({ confirmDuration }) => {
        if (!confirmDuration || confirmDuration == 0) return "0ms";
        return `${confirmDuration}ms`;
    }};
    --nui-button-confirm-color: black;

    position: relative;
    outline: none;
    border: 2px solid var(--nui-button-color);
    padding: 0;
    border-radius: 4px;
    margin: 5px;
    font-weight: 600;
    background-color: var(--nui-button-color);
    transform: translateY(0);
    transition: background-color 0.2s, transform ${PRESSED_ANIMATION_DURATION}ms,
        border-color 0.2s, color 0.2s;
    user-select: none;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &.NuiButton--confirm::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: var(--nui-button-confirm-color);
        box-sizing: border-box;
        opacity: 0.25;
        transition: width var(--nui-button-confirm-duration) linear,
            height var(--nui-button-confirm-duration) linear;
    }

    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -2px;
        left: -2px;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        opacity: 1;
        box-shadow: 0 calc(var(--nui-button-pad) / 1.75) var(--nui-button-pad)
            var(--nui-shadow);
        transition: opacity 0.2s, background-color 0.2s;
        background-color: var(--nui-button-color);
    }

    &::after,
    &::before {
        border-radius: 4px;
    }

    /* 
     * HACK: Some browsers seems to ignore these styling rules when "focus-visible" is specified with the other rules, so they are separated but the same. 
     * This will be a recurring bug in the styles to come below, so it will simply be labeled as the "focus-visible bug". For these styles, make sure both blocks match!
     */
    &:hover:not(.NuiButton--isTouch),
    &.NuiButton--isTouch:active {
        background-color: var(--nui-button-color-hover);
        border-color: var(--nui-button-color-hover);
        &::before {
            background-color: var(--nui-button-color-hover);
        }
    }
    &:focus-visible {
        background-color: var(--nui-button-color-hover);
        border-color: var(--nui-button-color-hover);
        &::before {
            background-color: var(--nui-button-color-hover);
        }
    }

    /* HACK: focus-visible bug */
    &:active:is(:hover, .NuiButton--isTouch) {
        transform: translateY(2px) translateZ(0);

        &::before {
            opacity: 0;
        }
        &::after {
            width: 100%;
        }
    }
    &:active:focus-visible {
        transform: translateY(2px) translateZ(0);

        &::before {
            opacity: 0;
        }
        &::after {
            width: 100%;
        }
    }
    &.NuiButton--recentlyPressed {
        transform: translateY(2px) translateZ(0);

        &::before {
            opacity: 0;
        }
    }

    &:disabled {
        cursor: default;
        pointer-events: none;
        opacity: 0.7;

        &::before {
            box-shadow: none;
        }
    }

    & .NuiButton__content {
        box-sizing: border-box;
        padding: var(--nui-button-pad);
        font-size: var(--nui-button-size);
        display: flex;
        gap: 5px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    & .NuiButton__icon,
    & .NuiButton__main {
        position: relative;
    }

    & .NuiButton__icon {
        display: flex;
        align-items: center;

        & > svg {
            width: 1.25em;
            height: 1.25em;
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

    &.NuiButton--size-xs {
        --nui-button-size: 12px;
        --nui-button-pad: 2px;
    }
    &.NuiButton--size-md {
        --nui-button-size: 26px;
        --nui-button-pad: 4px;
    }
    &.NuiButton--size-lg {
        --nui-button-size: 36px;
        --nui-button-pad: 6px;
    }
    &.NuiButton--size-xl {
        --nui-button-size: 46px;
        --nui-button-pad: 6px;
    }

    &.NuiButton--disableshadow::before {
        box-shadow: none;
    }

    &.NuiButton--variant-outline,
    &.NuiButton--variant-round-outline,
    &.NuiButton--variant-empty,
    &.NuiButton--variant-round-empty {
        --nui-button-confirm-color: var(--nui-button-color-hover);
        background-color: transparent;
        color: var(--nui-button-outline);

        &:hover:not(.NuiButton--isTouch),
        &.NuiButton--isTouch:active {
            color: var(--nui-button-outline-hover);
            background-color: var(--nui-button-outline-background);

            &::before {
                background-color: transparent;
            }
        }

        &::before {
            box-shadow: none;
            background-color: transparent;
        }
    }
    &.NuiButton--variant-empty,
    &.NuiButton--variant-round-empty {
        border-color: transparent;

        &:hover:not(.NuiButton--isTouch),
        &.NuiButton--isTouch:active {
            border-color: transparent;
        }
    }
    &.NuiButton--variant-round,
    &.NuiButton--variant-round-outline,
    &.NuiButton--variant-round-empty {
        border-radius: 50%;

        &::after,
        &::before {
            border-radius: 50%;
        }
        &::after {
            height: 0%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        /* HACK: focus-visible bug */
        &:active:is(:hover, .NuiButton--isTouch)::after {
            height: 100%;
        }
        &:active:focus-visible::after {
            height: 100%;
        }
    }
`;

Button.displayName = createComponentName("Button");
StyledButton.displayName = createComponentName("StyledButton");

export default StyledButton as typeof Button;
