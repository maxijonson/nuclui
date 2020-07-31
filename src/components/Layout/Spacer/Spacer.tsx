import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { nuiLog, createComponentName } from "@utils";
import { NuiSpacer } from "./types";

const Spacer: NuiSpacer = React.forwardRef((props, ref) => {
    const { size, className, ...otherProps } = props;

    React.useEffect(() => {
        if (_.isNumber(size)) {
            nuiLog.warn("Spacer size prop should not be below 0.");
        }
    }, [size]);

    return (
        <div {...otherProps} ref={ref} className={`NuiSpacer ${className}`} />
    );
});

const StyledSpacer = styled(Spacer)`
    width: 100%;
    box-sizing: border-box;
    height: ${({ size }) => {
        switch (size) {
            case "xs":
                return "4px";
            case "sm":
                return "8px";
            case "md":
                return "16px";
            case undefined:
            case "lg":
                return "32px";
            case "xl":
                return "64px";
            default:
                return `${size}px`;
        }
    }};
`;

StyledSpacer.displayName = createComponentName("Spacer");

export default StyledSpacer as typeof Spacer;
