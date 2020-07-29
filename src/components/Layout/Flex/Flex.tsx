import React from "react";
import styled from "styled-components";
import { createComponentName } from "@utils";
import { quicksand } from "@fonts";
import { NuiFlex } from "./types";

const Flex: NuiFlex = React.forwardRef((props, ref) => {
    const {
        as,
        className,
        inline,
        direction,
        wrap,
        justify,
        align,
        ...restProps
    } = props;

    const Component = as || "div";

    return (
        <Component
            {...restProps}
            ref={ref}
            className={`NuiFlex ${className}`}
        />
    );
});

const StyledFlex = styled(Flex)`
    ${quicksand}

    display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
    position: relative;
    box-sizing: border-box;
    flex-direction: ${({ direction }) => {
        if (!direction) return "row";
        switch (direction) {
            case "columnReverse":
                return "column-reverse";
            case "rowReverse":
                return "row-reverse";
            default:
                return direction;
        }
    }};
    flex-wrap: ${({ wrap }) => {
        if (!wrap) return "wrap";
        switch (wrap) {
            case "wrapReverse":
                return "wrap-reverse";
            default:
                return wrap;
        }
    }};
    justify-content: ${({ justify }) => {
        if (!justify) return "center";
        switch (justify) {
            case "flexEnd":
                return "flex-end";
            case "flexStart":
                return "flex-start";
            case "spaceAround":
                return "space-around";
            case "spaceBetween":
                return "space-between";
            case "spaceEvenly":
                return "space-evenly";
            default:
                return justify;
        }
    }};
    align-items: ${({ align }) => {
        if (!align) return "stretch";
        switch (align) {
            case "flexEnd":
                return "flex-end";
            case "flexStart":
                return "flex-start";
            case "selfEnd":
                return "self-end";
            case "selfStart":
                return "self-start";
            default:
                return align;
        }
    }};
    width: 100%;
`;

StyledFlex.displayName = createComponentName("Flex");

export default StyledFlex as typeof Flex;
