import React from "react";
import styled from "styled-components";
import {
    createComponentName,
    breakpointUnder,
    createBreakpoints,
} from "@utils";
import { background, text } from "@theme";
import { quicksand } from "@fonts";
import { NuiContainer } from "./types";

const Container: NuiContainer = React.forwardRef((props, ref) => {
    const {
        as: Component = "div",
        className,
        fixed,
        maxPadding,
        maxWidth,
        ...restProps
    } = props;

    return (
        <Component
            {...restProps}
            ref={ref}
            className={`NuiContainer ${className}`}
        />
    );
});

Container.defaultProps = {
    fixed: false,
    maxPadding: undefined,
    maxWidth: undefined,
    as: "div",
};

const bp = createBreakpoints({ sm: 620, md: 980, lg: 1280, xl: 1920 });
const padding = createBreakpoints({ xs: 16, sm: 25, md: 38, lg: 50, xl: 62 });

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
    padding-left: ${({ maxPadding }) =>
        maxPadding != "none" ? `${padding.xs}px` : undefined};
    padding-right: ${({ maxPadding }) =>
        maxPadding != "none" ? `${padding.xs}px` : undefined};
    font-size: 1rem;
    font-weight: 400;
    word-wrap: break-word;

    /* SM */
    @media (min-width: ${bp.sm}px) {
        max-width: ${({ maxWidth, fixed }) =>
            (() => {
                if (fixed) {
                    return !maxWidth || breakpointUnder("sm", maxWidth)
                        ? `${bp.sm}px`
                        : undefined;
                }
                return maxWidth == "sm" ? `${bp.sm}px` : undefined;
            })()};
        padding-left: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("sm", maxPadding)
                ? `${padding.sm}px`
                : undefined};
        padding-right: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("sm", maxPadding)
                ? `${padding.sm}px`
                : undefined};
    }

    /* MD */
    @media (min-width: ${bp.md}px) {
        max-width: ${({ maxWidth, fixed }) =>
            (() => {
                if (fixed) {
                    return !maxWidth || breakpointUnder("md", maxWidth)
                        ? `${bp.md}px`
                        : undefined;
                }
                return maxWidth == "md" ? `${bp.md}px` : undefined;
            })()};
        padding-left: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("md", maxPadding)
                ? `${padding.md}px`
                : undefined};
        padding-right: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("md", maxPadding)
                ? `${padding.md}px`
                : undefined};
    }

    /* LG */
    @media (min-width: ${bp.lg}px) {
        max-width: ${({ maxWidth, fixed }) =>
            (() => {
                if (fixed) {
                    return !maxWidth || breakpointUnder("lg", maxWidth)
                        ? `${bp.lg}px`
                        : undefined;
                }
                return maxWidth == "lg" ? `${bp.lg}px` : undefined;
            })()};
        padding-left: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("lg", maxPadding)
                ? `${padding.lg}px`
                : undefined};
        padding-right: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("lg", maxPadding)
                ? `${padding.lg}px`
                : undefined};
        
    }

    /* XL */
    @media (min-width: ${bp.xl}px) {
        max-width: ${({ maxWidth, fixed }) =>
            (() => {
                if (fixed) {
                    return !maxWidth || breakpointUnder("xl", maxWidth)
                        ? `${bp.xl}px`
                        : undefined;
                }
                return maxWidth == "xl" ? `${bp.xl}px` : undefined;
            })()};
        padding-left: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("xl", maxPadding)
                ? `${padding.xl}px`
                : undefined};
        padding-right: ${({ maxPadding }) =>
            !maxPadding || breakpointUnder("xl", maxPadding)
                ? `${padding.xl}px`
                : undefined};
    }
`;

StyledContainer.displayName = createComponentName("Container");

export default StyledContainer as typeof Container;
