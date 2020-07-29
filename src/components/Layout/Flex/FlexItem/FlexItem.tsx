import React from "react";
import styled from "styled-components";
import { createComponentName, nuiLog } from "@utils";
import { quicksand } from "@fonts";
import { NuiFlexItem } from "./types";

const FlexItem: NuiFlexItem = React.forwardRef((props, ref) => {
    const {
        as,
        className,
        grow,
        order,
        shrink,
        basis,
        align,
        ...restProps
    } = props;

    const Component = as || "div";

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
    margin: 10px;
    flex-grow: ${({ grow }) => grow ?? 1};
    order: ${({ order }) => order ?? 0};
    flex-shrink: ${({ shrink }) => shrink ?? 1};
    flex-basis: ${({ basis }) => basis ?? "auto"};
    align-self: ${({ align }) => {
        if (!align) return "auto";
        switch (align) {
            case "flexStart":
                return "flex-start";
            case "flexEnd":
                return "flex-end";
            default:
                return align;
        }
    }};
`;

StyledFlexItem.displayName = createComponentName("FlexItem");

export default StyledFlexItem as typeof FlexItem;
