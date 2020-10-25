import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import { createComponentName, nuiLog, createBreakpoints } from "@utils";
import { quicksand } from "@fonts";
import { useMediaQuery } from "@hooks";
import { NuiFlexItem } from "./types";
import FlexContext from "../FlexContext";

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
const breakpoints = {
    sm: `(min-width: ${bp.sm}px)`,
    md: `(min-width: ${bp.md}px)`,
    lg: `(min-width: ${bp.lg}px)`,
    xl: `(min-width: ${bp.xl}px)`,
};

const FlexItem: NuiFlexItem = React.forwardRef((props, ref) => {
    const {
        component,
        className,
        grow,
        order,
        shrink,
        align = "auto",
        spacing,
        basis,
        xs,
        sm,
        md,
        lg,
        xl,
        ...restProps
    } = props;

    const Component = component || "div";

    const context = React.useContext(FlexContext);
    const query = useMediaQuery(breakpoints);

    const style = React.useMemo(() => {
        const spacingVal = spacing ?? context.itemSpacing;
        return {
            flexGrow: grow ?? context.itemGrow,
            order,
            flexShrink: shrink ?? context.itemShrink,
            padding: _.isNumber(spacingVal) ? `${spacingVal}px` : undefined,
            flexBasis: (() => {
                const basisXl =
                    query.xl &&
                    getBasis(
                        xl ?? basis ?? context.itemXl ?? context.itemBasis
                    );
                const basisLg =
                    !basisXl &&
                    query.lg &&
                    getBasis(
                        lg ?? basis ?? context.itemLg ?? context.itemBasis
                    );
                const basisMd =
                    !basisLg &&
                    query.md &&
                    getBasis(
                        md ?? basis ?? context.itemMd ?? context.itemBasis
                    );
                const basisSm =
                    !basisMd &&
                    query.sm &&
                    getBasis(
                        sm ?? basis ?? context.itemSm ?? context.itemBasis
                    );
                return (
                    basisXl ||
                    basisLg ||
                    basisMd ||
                    basisSm ||
                    getBasis(xs ?? basis ?? context.itemXs ?? context.itemBasis)
                );
            })(),
            ...props.style,
        };
    }, [
        basis,
        context,
        grow,
        lg,
        md,
        order,
        props.style,
        query,
        shrink,
        sm,
        spacing,
        xl,
        xs,
    ]);

    const classes = React.useMemo(() => {
        const spacingVal = spacing ?? context.itemSpacing ?? "sm";
        return clsx([
            "NuiFlexItem",
            [
                align == "auto" && "NuiFlexItem--align-auto",
                align == "flexStart" && "NuiFlexItem--align-fstart",
                align == "flexEnd" && "NuiFlexItem--align-fend",
                align == "center" && "NuiFlexItem--align-center",
                align == "baseline" && "NuiFlexItem--align-base",
                align == "stretch" && "NuiFlexItem--align-stretch",
            ],
            [
                spacingVal == "none" && "NuiFlexItem--spacing-none",
                spacingVal == "xs" && "NuiFlexItem--spacing-xs",
                spacingVal == "sm" && "NuiFlexItem--spacing-sm",
                spacingVal == "md" && "NuiFlexItem--spacing-md",
                spacingVal == "lg" && "NuiFlexItem--spacing-lg",
                spacingVal == "xl" && "NuiFlexItem--spacing-xl",
            ],
            className,
        ]);
    }, [align, className, context.itemSpacing, spacing]);

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
        <Component {...restProps} ref={ref} className={classes} style={style} />
    );
});

const StyledFlexItem = styled(FlexItem)`
    ${quicksand}

    position: relative;
    box-sizing: border-box;
    margin: 0;
    flex-grow: 1;
    order: 0;
    flex-shrink: 1;

    &.NuiFlexItem--align-auto {
        align-self: auto;
    }
    &.NuiFlexItem--align-fstart {
        align-self: flex-start;
    }
    &.NuiFlexItem--align-fend {
        align-self: flex-end;
    }
    &.NuiFlexItem--align-base {
        align-self: baseline;
    }
    &.NuiFlexItem--align-stretch {
        align-self: stretch;
    }

    &.NuiFlexItem--spacing-xs {
        padding: 5px;
    }
    &.NuiFlexItem--spacing-sm {
        padding: 10px;
    }
    &.NuiFlexItem--spacing-md {
        padding: 15px;
    }
    &.NuiFlexItem--spacing-lg {
        padding: 20px;
    }
    &.NuiFlexItem--spacing-xl {
        padding: 30px;
    }
    &.NuiFlexItem--spacing-none {
        padding: 0px;
    }
`;

StyledFlexItem.displayName = createComponentName("FlexItem");

export default StyledFlexItem as typeof FlexItem;
