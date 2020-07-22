import React from "react";
import styled from "styled-components";
import {
    createComponentName,
    breakpointUnder,
    createBreakpoints,
} from "@utils";
import { background, text } from "@theme";
import { quicksand } from "@fonts";
import { ContainerProps } from "./types";

const Container: Nui.CustomComponent<ContainerProps, "div"> = (props) => {
    const {
        component: Component = "div",
        className,
        fixed,
        maxPadding,
        maxWidth,
        ...restProps
    } = props;
    return <Component {...restProps} className={`NuiContainer ${className}`} />;
};

Container.defaultProps = {
    fixed: false,
    maxPadding: undefined,
    maxWidth: undefined,
};

const bp = createBreakpoints({ sm: 620, md: 980, lg: 1280, xl: 1920 });

/**
 * A responsive container for your content
 */
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
    padding-left: ${({ maxPadding }) => maxPadding != "none" && "16px"};
    padding-right: ${({ maxPadding }) => maxPadding != "none" && "16px"};
    font-size: 1rem;
    font-weight: 400;
    word-wrap: break-word;

    /* SM */
    @media (min-width: ${bp.sm}px) {
        max-width: ${({ maxWidth }) => maxWidth == "sm" && `${bp.sm}px`};
        width: ${({ fixed }) => (fixed ? `${bp.sm}px` : undefined)};
        padding-left: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "sm") && "25px"};
        padding-right: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "sm") && "25px"};
    }

    /* MD */
    @media (min-width: ${bp.md}px) {
        max-width: ${({ maxWidth }) => maxWidth == "md" && `${bp.md}px`};
        width: ${({ fixed }) => (fixed ? `${bp.md}px` : undefined)};
        padding-left: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "md") && "38px"};
        padding-right: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "md") && "38px"};
    }

    /* LG */
    @media (min-width: ${bp.lg}px) {
        max-width: ${({ maxWidth }) => maxWidth == "lg" && `${bp.lg}px`};
        width: ${({ fixed }) => (fixed ? `${bp.lg}px` : undefined)};
        padding-left: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "lg") && "50px"};
        padding-right: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "lg") && "50px"};
        
    }

    /* XL */
    @media (min-width: ${bp.xl}px) {
        max-width: ${({ maxWidth }) => maxWidth == "xl" && `${bp.xl}px`};
        width: ${({ fixed }) => (fixed ? `${bp.xl}px` : undefined)};
        padding-left: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "xl") && "62px"};
        padding-right: ${({ maxPadding }) =>
            breakpointUnder(maxPadding, "xl") && "62px"};
    }
`;

StyledContainer.displayName = createComponentName("Container");

export default StyledContainer as typeof Container;
