import React from "react";
import styled, { ThemeProvider } from "styled-components";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { quicksand } from "@fonts";
import { NuiFlex } from "./types";

const Flex: NuiFlex = React.forwardRef((props, ref) => {
    const {
        component,
        className,
        inline,
        direction,
        wrap,
        justify,
        align,
        gap,
        children,
        itemGrow,
        itemShrink,
        itemBasis,
        itemSpacing,
        itemXs,
        itemSm,
        itemMd,
        itemLg,
        itemXl,
        ...restProps
    } = props;

    const Component = component || "div";

    return (
        <Component
            {...restProps}
            ref={ref}
            className={clsx(["NuiFlex", className])}
        >
            <ThemeProvider
                theme={{
                    nui: {
                        $parent: {
                            flex: {
                                itemGrow,
                                itemShrink,
                                itemBasis,
                                itemSpacing,
                                itemXs,
                                itemSm,
                                itemMd,
                                itemLg,
                                itemXl,
                            },
                        },
                    },
                }}
            >
                {children}
            </ThemeProvider>
        </Component>
    );
});

const StyledFlex = styled(Flex)`
    ${quicksand}

    display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
    position: relative;
    box-sizing: border-box;
    width: 100%;
    gap: ${({ gap }) => {
        switch (gap) {
            case "xs":
                return "5px";
            case "sm":
                return "10px";
            case "md":
                return "15px";
            case "lg":
                return "20px";
            case "xl":
                return "30px";
            case undefined:
                return undefined;
            default:
                return `${gap}px`;
        }
    }};
    flex-direction: ${({ direction }) => {
        switch (direction) {
            case "columnReverse":
                return "column-reverse";
            case "rowReverse":
                return "row-reverse";
            case undefined:
                return "row";
            default:
                return direction;
        }
    }};
    flex-wrap: ${({ wrap }) => {
        switch (wrap) {
            case "wrapReverse":
                return "wrap-reverse";
            case undefined:
                return "wrap";
            default:
                return wrap;
        }
    }};
    justify-content: ${({ justify }) => {
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
            case undefined:
                return "center";
            default:
                return justify;
        }
    }};
    align-items: ${({ align }) => {
        switch (align) {
            case "flexEnd":
                return "flex-end";
            case "flexStart":
                return "flex-start";
            case "selfEnd":
                return "self-end";
            case "selfStart":
                return "self-start";
            case undefined:
                return "stretch";
            default:
                return align;
        }
    }};
`;

StyledFlex.displayName = createComponentName("Flex");

export default StyledFlex as typeof Flex;
