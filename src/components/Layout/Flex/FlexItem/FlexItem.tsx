import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import { createComponentName, nuiLog, createBreakpoints } from "@utils";
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
        spacing,
        xs,
        sm,
        md,
        lg,
        xl,
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
            nuiLog.warn(warns, { once: true });
        }
    }, [grow, shrink]);

    return (
        <Component
            {...restProps}
            ref={ref}
            className={clsx(["NuiFlexItem", className])}
        />
    );
});

/**
 * Given a value, returns the appropriate flex-basis value. Giving a number will return a fraction of the 12-based grid.
 * @param basis the basis value
 */
const getBasis = (basis: number | string | undefined) => {
    if (!basis) return undefined;

    if (typeof basis === "number") {
        const min = 0;
        const max = 12;
        let numericBasis = basis;

        if (!_.isInteger(basis)) {
            nuiLog.warn(
                `FlexItem basis, when specified as a number, must be an integer. The rounded number will be used`,
                { once: "FlexItem-getBasis-integer" }
            );
            numericBasis = _.clamp(_.round(basis), min, max);
        } else if (basis < min || basis > max) {
            nuiLog.warn(
                `FlexItem basis, when specified as a number, must be between ${min} and ${max}. Clamped value will be used.`,
                { once: "FlexItem-getBasis-bounds" }
            );
            numericBasis = _.clamp(basis, min, max);
        }

        return `${(numericBasis / max) * 100}%`;
    }

    return basis;
};

const bp = createBreakpoints({ sm: 620, md: 980, lg: 1280, xl: 1920 });

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
    flex-basis: ${({ theme, basis, xs }) => {
        const itemBasis: typeof basis =
            theme.nui?.$parent?.flex?.itemXs ??
            theme.nui?.$parent?.flex?.itemBasis;
        return getBasis(xs ?? basis ?? itemBasis);
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

    @media (min-width: ${bp.sm}px) {
        flex-basis: ${({ theme, basis, sm }) => {
            const itemBasis: typeof basis =
                theme.nui?.$parent?.flex?.itemSm ??
                theme.nui?.$parent?.flex?.itemBasis;
            return getBasis(sm ?? basis ?? itemBasis);
        }};
    }

    @media (min-width: ${bp.md}px) {
        flex-basis: ${({ theme, basis, md }) => {
            const itemBasis: typeof basis =
                theme.nui?.$parent?.flex?.itemMd ??
                theme.nui?.$parent?.flex?.itemBasis;
            return getBasis(md ?? basis ?? itemBasis);
        }};
    }

    @media (min-width: ${bp.lg}px) {
        flex-basis: ${({ theme, basis, lg }) => {
            const itemBasis: typeof basis =
                theme.nui?.$parent?.flex?.itemLg ??
                theme.nui?.$parent?.flex?.itemBasis;
            return getBasis(lg ?? basis ?? itemBasis);
        }};
    }

    @media (min-width: ${bp.xl}px) {
        flex-basis: ${({ theme, basis, xl }) => {
            const itemBasis: typeof basis =
                theme.nui?.$parent?.flex?.itemXl ??
                theme.nui?.$parent?.flex?.itemBasis;
            return getBasis(xl ?? basis ?? itemBasis);
        }};
    }
`;

StyledFlexItem.displayName = createComponentName("FlexItem");

export default StyledFlexItem as typeof FlexItem;
