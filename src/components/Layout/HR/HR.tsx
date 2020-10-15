import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import { border } from "@theme";
import { createComponentName, nuiLog } from "@utils";
import { NuiHR } from "./types";

const HR: NuiHR = React.forwardRef((props, ref) => {
    const { size, spacing, className, ...restProps } = props;

    React.useEffect(() => {
        if (_.isNumber(size) && size < 0) {
            nuiLog.warn("HR size prop should not be below 0.");
        }
        if (_.isNumber(spacing) && spacing < 0) {
            nuiLog.warn("HR spacing prop should not be below 0.");
        }
    }, [size, spacing]);

    return (
        <div {...restProps} ref={ref} className={clsx(["NuiHR", className])} />
    );
});

const StyledHR = styled(HR)`
    ${border.secondary}

    --nui-hr-spacing: ${({ spacing }) => {
        switch (spacing) {
            case "xs":
                return "2px";
            case "sm":
                return "4px";
            case "md":
                return "8px";
            case undefined:
            case "lg":
                return "16px";
            case "xl":
                return "32px";
            default:
                return `${spacing}px`;
        }
    }};

    display: block;
    width: 100%;
    opacity: 0.5;
    border-style: solid;
    box-sizing: border-box;
    border-width: ${({ size }) => {
        switch (size) {
            case undefined:
            case "xs":
                return "1px";
            case "sm":
                return "2px";
            case "md":
                return "4px";
            case "lg":
                return "6px";
            case "xl":
                return "8px";
            default:
                return `${size}px`;
        }
    }};
    border-radius: 4px;
    margin-top: var(--nui-hr-spacing);
    margin-bottom: var(--nui-hr-spacing);
`;

StyledHR.displayName = createComponentName("HR");

export default StyledHR as typeof HR;
