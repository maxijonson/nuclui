import React from "react";
import _ from "lodash";
import styled, { ThemeProvider } from "styled-components";
import clsx from "clsx";
import { createComponentName, isBreakpoint } from "@utils";
import { quicksand } from "@fonts";
import { NuiFlex } from "./types";
import FlexContext from "./FlexContext";

const Flex: NuiFlex = React.forwardRef((props, ref) => {
    const {
        component,
        className,
        inline,
        direction = "row",
        wrap = "wrap",
        justify = "center",
        align = "stretch",
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

    const style = React.useMemo(
        () => ({
            gap: _.isNumber(gap) ? `${gap}px` : undefined,
            ...props.style,
        }),
        [gap, props.style]
    );

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiFlex",
                isBreakpoint(gap) && `NuiFlex--gap-${gap}`,
                [
                    direction == "rowReverse" && "NuiFlex--dir-rr",
                    direction == "column" && "NuiFlex--dir-c",
                    direction == "columnReverse" && "NuiFlex--dir-cr",
                ],
                [
                    align == "flexStart" && "NuiFlex--align-fstart",
                    align == "start" && "NuiFlex--align-start",
                    align == "selfStart" && "NuiFlex--align-sstart",
                    align == "flexEnd" && "NuiFlex--align-fend",
                    align == "end" && "NuiFlex--align-end",
                    align == "selfEnd" && "NuiFlex--align-send",
                    align == "center" && "NuiFlex--align-center",
                    align == "baseline" && "NuiFlex--align-base",
                ],
                [
                    justify == "flexStart" && "NuiFlex--jc-fstart",
                    justify == "flexEnd" && "NuiFlex--jc-fend",
                    justify == "start" && "NuiFlex--jc-start",
                    justify == "end" && "NuiFlex--jc-end",
                    justify == "left" && "NuiFlex--jc-left",
                    justify == "right" && "NuiFlex--jc-right",
                    justify == "spaceBetween" && "NuiFlex--jc-between",
                    justify == "spaceAround" && "NuiFlex--jc-around",
                    justify == "spaceEvenly" && "NuiFlex--jc-even",
                ],
                [
                    wrap == "nowrap" && "NuiFlex--wrap-no",
                    wrap == "wrapReverse" && "NuiFlex--wrap-wr",
                ],
                className,
            ]),
        [align, className, direction, gap, justify, wrap]
    );

    const contextValue = React.useMemo(
        () => ({
            itemGrow,
            itemShrink,
            itemBasis,
            itemSpacing,
            itemXs,
            itemSm,
            itemMd,
            itemLg,
            itemXl,
        }),
        [
            itemBasis,
            itemGrow,
            itemLg,
            itemMd,
            itemShrink,
            itemSm,
            itemSpacing,
            itemXl,
            itemXs,
        ]
    );

    return (
        <Component {...restProps} ref={ref} className={classes} style={style}>
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
                <FlexContext.Provider value={contextValue}>
                    {children}
                </FlexContext.Provider>
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;

    &.NuiFlex--gap-xs {
        gap: 5px;
    }
    &.NuiFlex--gap-sm {
        gap: 10px;
    }
    &.NuiFlex--gap-md {
        gap: 15px;
    }
    &.NuiFlex--gap-lg {
        gap: 20px;
    }
    &.NuiFlex--gap-xl {
        gap: 30px;
    }

    &.NuiFlex--dir-cr {
        flex-direction: column-reverse;
    }
    &.NuiFlex--dir-rr {
        flex-direction: row-reverse;
    }
    &.NuiFlex--dir-c {
        flex-direction: column;
    }

    &.NuiFlex--align-fstart {
        align-items: flex-start;
    }
    &.NuiFlex--align-start {
        align-items: start;
    }
    &.NuiFlex--align-sstart {
        align-items: self-start;
    }
    &.NuiFlex--align-fend {
        align-items: flex-end;
    }
    &.NuiFlex--align-end {
        align-items: end;
    }
    &.NuiFlex--align-send {
        align-items: self-end;
    }
    &.NuiFlex--align-center {
        align-items: center;
    }
    &.NuiFlex--align-base {
        align-items: baseline;
    }

    &.NuiFlex--jc-fstart {
        justify-content: flex-start;
    }
    &.NuiFlex--jc-fend {
        justify-content: flex-end;
    }
    &.NuiFlex--jc-start {
        justify-content: start;
    }
    &.NuiFlex--jc-end {
        justify-content: end;
    }
    &.NuiFlex--jc-left {
        justify-content: left;
    }
    &.NuiFlex--jc-right {
        justify-content: right;
    }
    &.NuiFlex--jc-between {
        justify-content: space-between;
    }
    &.NuiFlex--jc-around {
        justify-content: space-around;
    }
    &.NuiFlex--jc-even {
        justify-content: space-evenly;
    }

    &.NuiFlex--wrap-no {
        flex-wrap: nowrap;
    }
    &.NuiFlex--wrap-wr {
        flex-wrap: wrap-reverse;
    }
`;

StyledFlex.displayName = createComponentName("StyledFlex");
Flex.displayName = createComponentName("Flex");

export default StyledFlex as typeof Flex;
