import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName, createBreakpoints } from "@utils";
import { background, text } from "@theme";
import { quicksand } from "@fonts";
import { NuiContainer } from "./types";

const bp = createBreakpoints({ sm: 620, md: 980, lg: 1280, xl: 1920 });
const padding = createBreakpoints({ xs: 16, sm: 25, md: 38, lg: 50, xl: 62 });

const Container: NuiContainer = React.forwardRef((props, ref) => {
    const {
        component,
        className,
        fixed,
        maxPadding,
        maxWidth,
        ...restProps
    } = props;

    const Component = component || "div";

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiContainer",
                [
                    maxPadding == "xs" && "NuiContainer--maxPadding-xs",
                    maxPadding == "sm" && "NuiContainer--maxPadding-sm",
                    maxPadding == "md" && "NuiContainer--maxPadding-md",
                    maxPadding == "lg" && "NuiContainer--maxPadding-lg",
                    maxPadding == "xl" && "NuiContainer--maxPadding-xl",
                    maxPadding == "none" && "NuiContainer--maxPadding-none",
                ],
                [
                    maxWidth == "xs" && "NuiContainer--maxWidth-xs",
                    maxWidth == "sm" && "NuiContainer--maxWidth-sm",
                    maxWidth == "md" && "NuiContainer--maxWidth-md",
                    maxWidth == "lg" && "NuiContainer--maxWidth-lg",
                    maxWidth == "xl" && "NuiContainer--maxWidth-xl",
                ],
                fixed && "NuiContainer--fixed",
                className,
            ]),
        [className, fixed, maxPadding, maxWidth]
    );

    return <Component {...restProps} ref={ref} className={classes} />;
});

Container.defaultProps = {
    fixed: false,
    maxPadding: undefined,
    maxWidth: undefined,
};

const StyledContainer = styled(Container)`
    ${background.primary}
    ${text.primary}
    ${quicksand}

    display: block;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
    line-height: 1.5;
    padding-left: ${padding.xs}px;
    padding-right: ${padding.xs}px;
    font-size: 1rem;
    font-weight: 400;
    word-wrap: break-word;

    &.NuiContainer--maxPadding-none {
        padding-left: 0;
        padding-right: 0;
    }

    &.NuiContainer--maxWidth-xs {
        max-width: 320px;
    }

    /* SM */
    @media (min-width: ${bp.sm}px) {
        &.NuiContainer--fixed:not(.NuiContainer--maxWidth-xs),
        &.NuiContainer--maxWidth-sm {
            max-width: ${bp.sm}px;
        }
        
        &:not(.NuiContainer--maxPadding-xs):not(.NuiContainer--maxPadding-none) {
            padding-left: ${padding.sm}px;
            padding-right: ${padding.sm}px;
        }
    }

    /* MD */
    @media (min-width: ${bp.md}px) {
        &.NuiContainer--fixed:not(.NuiContainer--maxWidth-xs):not(.NuiContainer--maxWidth-sm),
        &.NuiContainer--maxWidth-md {
            max-width: ${bp.md}px;
        }

        &:not(.NuiContainer--maxPadding-xs):not(.NuiContainer--maxPadding-sm):not(.NuiContainer--maxPadding-none) {
            padding-left: ${padding.md}px;
            padding-right: ${padding.md}px;
        }
    }

    /* LG */
    @media (min-width: ${bp.lg}px) {
        &.NuiContainer--fixed:not(.NuiContainer--maxWidth-xs):not(.NuiContainer--maxWidth-sm):not(.NuiContainer--maxWidth-md),
        &.NuiContainer--maxWidth-lg {
            max-width: ${bp.lg}px;
        }

        &:not(.NuiContainer--maxPadding-xs):not(.NuiContainer--maxPadding-sm):not(.NuiContainer--maxPadding-md):not(.NuiContainer--maxPadding-none) {
            padding-left: ${padding.lg}px;
            padding-right: ${padding.lg}px;
        }
    }

    /* XL */
    @media (min-width: ${bp.xl}px) {
        &.NuiContainer--fixed:not(.NuiContainer--maxWidth-xs):not(.NuiContainer--maxWidth-sm):not(.NuiContainer--maxWidth-md):not(.NuiContainer--maxWidth-lg),
        &.NuiContainer--maxWidth-xl {
            max-width: ${bp.xl}px;
        }
        
        &:not(.NuiContainer--maxPadding-xs):not(.NuiContainer--maxPadding-sm):not(.NuiContainer--maxPadding-md):not(.NuiContainer--maxPadding-lg):not(.NuiContainer--maxPadding-none) {
            padding-left: ${padding.xl}px;
            padding-right: ${padding.xl}px;
        }
    }
`;

StyledContainer.displayName = createComponentName("Container");

export default StyledContainer as typeof Container;
