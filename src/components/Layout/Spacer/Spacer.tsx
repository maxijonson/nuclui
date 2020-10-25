import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import { nuiLog, createComponentName, isBreakpoint } from "@utils";
import { NuiSpacer } from "./types";

const Spacer: NuiSpacer = React.forwardRef((props, ref) => {
    const { size = "lg", className, ...otherProps } = props;

    const style = React.useMemo(
        () => ({
            height: _.isNumber(size) ? `${size}px` : undefined,
            ...props.style,
        }),
        [size, props.style]
    );

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiSpacer",
                isBreakpoint(size) && `NuiSpacer--size-${size}`,
                className,
            ]),
        [className, size]
    );

    React.useEffect(() => {
        if (_.isNumber(size) && size < 0) {
            nuiLog.warn("Spacer size prop should not be below 0.");
        }
    }, [size]);

    return <div {...otherProps} ref={ref} style={style} className={classes} />;
});

const StyledSpacer = styled(Spacer)`
    width: 100%;
    box-sizing: border-box;

    &.NuiSpacer--size-xs {
        height: 4px;
    }
    &.NuiSpacer--size-sm {
        height: 8px;
    }
    &.NuiSpacer--size-md {
        height: 16px;
    }
    &.NuiSpacer--size-lg {
        height: 32px;
    }
    &.NuiSpacer--size-xl {
        height: 64px;
    }
`;

StyledSpacer.displayName = createComponentName("Spacer");

export default StyledSpacer as typeof Spacer;
