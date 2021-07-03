import { background, border, shadow, text } from "@theme";
import { createComponentName } from "@utils";
import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { NuiPopover } from "./types";

const Popover: NuiPopover = React.forwardRef((props, ref) => {
    const {
        className,
        children,
        position = "top",
        spacing = "xs",
        open = true,
        ...restProps
    } = props;

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiPopover",
                open && "NuiPopover--open",
                [
                    position == "right" && "NuiPopover--position-right",
                    position == "bottom" && "NuiPopover--position-bottom",
                    position == "left" && "NuiPopover--position-left",
                    position == "center" && "NuiPopover--position-center",
                ],
                [
                    spacing == "none" && "NuiPopover--spacing-none",
                    spacing == "sm" && "NuiPopover--spacing-sm",
                    spacing == "md" && "NuiPopover--spacing-md",
                    spacing == "lg" && "NuiPopover--spacing-lg",
                    spacing == "xl" && "NuiPopover--spacing-xl",
                ],
                className,
            ]),
        [className, open, position, spacing]
    );

    return (
        <div className={classes} children={children} ref={ref} {...restProps} />
    );
});

const StyledPopover = styled(Popover)`
    ${background.primary}
    ${shadow.primary}
    ${border.primary}
    ${text.primary}

    --nui-popover-spacing: 4px;
    --nui-popover-initialscale: 0.97;

    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: 0 2px 3px -1px ${shadow.varPrimary},
        0 1px 1px -1px ${shadow.varPrimary};
    box-sizing: border-box;
    position: absolute;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    z-index: 10;
    left: 50%;
    transform-origin: left top;
    top: 0;
    transform: scale(var(--nui-popover-initialscale)) translateX(-50%)
        translateY(calc(-100% - var(--nui-popover-spacing)));
    margin: 0;

    &.NuiPopover--position-right {
        left: calc(100% + var(--nui-popover-spacing));
        top: 50%;
        transform: scale(var(--nui-popover-initialscale)) translateY(-50%);
    }
    &.NuiPopover--position-bottom {
        left: 50%;
        top: calc(100% + var(--nui-popover-spacing));
        transform: scale(var(--nui-popover-initialscale)) translateX(-50%);
    }
    &.NuiPopover--position-left {
        left: 0;
        top: 50%;
        transform: scale(var(--nui-popover-initialscale)) translateY(-50%)
            translateX(calc(-100% - var(--nui-popover-spacing)));
    }
    &.NuiPopover--position-center {
        left: 50%;
        top: 50%;
        transform: scale(var(--nui-popover-initialscale)) translateY(-50%)
            translateX(-50%);
    }

    &.NuiPopover--spacing-none {
        --nui-popover-spacing: 0px;
    }
    &.NuiPopover--spacing-sm {
        --nui-popover-spacing: 8px;
    }
    &.NuiPopover--spacing-md {
        --nui-popover-spacing: 16px;
    }
    &.NuiPopover--spacing-lg {
        --nui-popover-spacing: 24px;
    }
    &.NuiPopover--spacing-xl {
        --nui-popover-spacing: 32px;
    }

    &.NuiPopover--open {
        opacity: 1;
        pointer-events: all;
        transform: scale(1) translateX(-50%)
            translateY(calc(-100% - var(--nui-popover-spacing)));

        &.NuiPopover--position-right {
            transform: scale(1) translateY(-50%);
        }
        &.NuiPopover--position-bottom {
            transform: scale(1) translateX(-50%);
        }
        &.NuiPopover--position-left {
            transform: scale(1) translateY(-50%)
                translateX(calc(-100% - var(--nui-popover-spacing)));
        }
        &.NuiPopover--position-center {
            transform: scale(1) translateY(-50%) translateX(-50%);
        }
    }
`;

StyledPopover.displayName = createComponentName("StyledPopover");
Popover.displayName = createComponentName("Popover");

export default StyledPopover as typeof Popover;
