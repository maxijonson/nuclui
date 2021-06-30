import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import { border } from "@theme";
import { createComponentName, nuiLog } from "@utils";
import { NuiHR } from "./types";

const HR: NuiHR = React.forwardRef((props, ref) => {
    const { size = "xs", spacing = "lg", className, ...restProps } = props;

    const style = React.useMemo(() => {
        const margin = _.isNumber(spacing) ? `${spacing}px` : undefined;
        return {
            borderWidth: _.isNumber(size) ? `${size}px` : undefined,
            marginTop: margin,
            marginBottom: margin,
            ...props.style,
        };
    }, [size, spacing, props.style]);

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiHR",
                [
                    size == "sm" && "NuiHR--size-sm",
                    size == "md" && "NuiHR--size-md",
                    size == "lg" && "NuiHR--size-lg",
                    size == "xl" && "NuiHR--size-xl",
                ],
                [
                    spacing == "xs" && "NuiHR--spacing-xs",
                    spacing == "sm" && "NuiHR--spacing-sm",
                    spacing == "md" && "NuiHR--spacing-md",
                    spacing == "xl" && "NuiHR--spacing-xl",
                ],
                className,
            ]),
        [className, size, spacing]
    );

    React.useEffect(() => {
        if (_.isNumber(size) && size < 0) {
            nuiLog.warn("HR size prop should not be below 0.");
        }
        if (_.isNumber(spacing) && spacing < 0) {
            nuiLog.warn("HR spacing prop should not be below 0.");
        }
    }, [size, spacing]);

    return <div {...restProps} ref={ref} style={style} className={classes} />;
});

const StyledHR = styled(HR)`
    ${border.secondary}

    display: block;
    width: 100%;
    opacity: 0.5;
    border-style: solid;
    box-sizing: border-box;
    border-radius: 4px;
    border-width: 1px;
    margin-top: 16px;
    margin-bottom: 16px;

    &.NuiHR--size-sm {
        border-width: 2px;
    }
    &.NuiHR--size-md {
        border-width: 4px;
    }
    &.NuiHR--size-lg {
        border-width: 6px;
    }
    &.NuiHR--size-xl {
        border-width: 8px;
    }

    &.NuiHR--spacing-xs {
        margin-top: 2px;
        margin-bottom: 2px;
    }
    &.NuiHR--spacing-sm {
        margin-top: 4px;
        margin-bottom: 4px;
    }
    &.NuiHR--spacing-md {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    &.NuiHR--spacing-xl {
        margin-top: 32px;
        margin-bottom: 32px;
    }
`;

StyledHR.displayName = createComponentName("StyledHR");
HR.displayName = createComponentName("HR");

export default StyledHR as typeof HR;
