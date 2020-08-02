import React from "react";
import styled from "styled-components";
import { createComponentName, nuiLog } from "@utils";
import { quicksand } from "@fonts";
import { NuiFlexItem } from "./types";

const FlexItem: NuiFlexItem = React.forwardRef((props, ref) => {
    const {
        component,
        className,
        grow,
        order,
        shrink,
        basis,
        align,
        ...restProps
    } = props;

    const Component = component || "div";

    React.useEffect(() => {
        const warns: string[] = [];

        if (grow && grow < 0) {
            warns.push("FlexItem grow prop should not be below 0.");
        }
        if (shrink && shrink < 0) {
            warns.push("FlexItem shrink prop should not be below 0.");
        }

        if (warns.length != 0) {
            nuiLog.warn(warns);
        }
    }, [grow, shrink]);

    return (
        <Component
            {...restProps}
            ref={ref}
            className={`NuiFlexItem ${className}`}
        />
    );
});

const StyledFlexItem = styled(FlexItem)`
    ${quicksand}

    position: relative;
    box-sizing: border-box;
    margin: 0;
    flex-grow: ${({ theme, grow }) => {
        const itemGrow: typeof grow = theme.nui?.$parent?.flex?.itemGrow;
        return grow ?? itemGrow ?? 1;
    }};
    order: ${({ order }) => order ?? 0};
    flex-shrink: ${({ theme, shrink }) => {
        const itemShrink: typeof shrink = theme.nui?.$parent?.flex?.itemShrink;
        return shrink ?? itemShrink ?? 1;
    }};
    flex-basis: ${({ theme, basis }) => {
        const itemBasis: typeof basis = theme.nui?.$parent?.flex?.itemBasis;
        return basis ?? itemBasis ?? "auto";
    }};
    align-self: ${({ align }) => {
        switch (align) {
            case "flexStart":
                return "flex-start";
            case "flexEnd":
                return "flex-end";
            case undefined:
                return "auto";
            default:
                return align;
        }
    }};
    padding: ${({ theme, spacing }) => {
        const itemSpacing: typeof spacing =
            theme.nui?.$parent?.flex?.itemSpacing;
        const value = spacing ?? itemSpacing;

        switch (value) {
            case "xs":
                return "5px";
            case undefined:
            case "sm":
                return "10px";
            case "md":
                return "15px";
            case "lg":
                return "20px";
            case "xl":
                return "30px";
            case "none":
                return "0px";
            default:
                return `${value}px`;
        }
    }};
`;

StyledFlexItem.displayName = createComponentName("FlexItem");

export default StyledFlexItem as typeof FlexItem;
