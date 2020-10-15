import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import { nuiLog, createComponentName, isBreakpoint } from "@utils";
import { NuiSpacer } from "./types";

const Spacer: NuiSpacer = React.forwardRef((props, ref) => {
    const { size: sizeProp = "lg", className, ...otherProps } = props;

    const size = React.useMemo(
        () => (isBreakpoint(sizeProp) ? sizeProp : null),
        [sizeProp]
    );

    React.useEffect(() => {
        if (_.isNumber(sizeProp) && sizeProp < 0) {
            nuiLog.warn("Spacer size prop should not be below 0.");
        }
    }, [sizeProp]);

    return (
        <div
            {...otherProps}
            ref={ref}
            style={{
                height: _.isNumber(sizeProp) ? `${sizeProp}px` : undefined,
            }}
            className={clsx([
                "NuiSpacer",
                size && `NuiSpacer--${size}`,
                className,
            ])}
        />
    );
});

const StyledSpacer = styled(Spacer)`
    width: 100%;
    box-sizing: border-box;

    &.NuiSpacer--xs {
        height: 4px;
    }

    &.NuiSpacer--sm {
        height: 8px;
    }

    &.NuiSpacer--md {
        height: 16px;
    }

    &.NuiSpacer--lg {
        height: 32px;
    }

    &.NuiSpacer--xl {
        height: 64px;
    }
`;

StyledSpacer.displayName = createComponentName("Spacer");

export default StyledSpacer as typeof Spacer;
