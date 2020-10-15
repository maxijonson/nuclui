import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { quicksand } from "@fonts";
import { background, text, border, shadow } from "@theme";
import { NuiCard } from "./types";

const Card: NuiCard = React.forwardRef((props, ref) => {
    const {
        component,
        className,
        padding,
        outline,
        disableShadow,
        ...restProps
    } = props;

    const Component = component || "div";

    return (
        <Component
            {...restProps}
            ref={ref}
            className={clsx(["NuiCard", className])}
        />
    );
});

const StyledCard = styled(Card)`
    ${quicksand}
    ${background.primary}
    ${text.primary}
    ${border.secondary}
    ${shadow.secondary}

    display: block;
    position: relative;
    border-radius: 5px;
    border-width: 1px;
    box-sizing: border-box;
    margin-top: 15px;
    margin-bottom: 15px;
    box-shadow: ${({ disableShadow }) =>
        disableShadow
            ? undefined
            : "0 2px 3px -1px var(--nui-shadow), 0 1px 1px -1px var(--nui-shadow)"};
    border-style: ${({ outline }) => {
        switch (outline) {
            case undefined:
                return "solid";
            default:
                return outline;
        }
    }};
    padding: ${({ padding }) => {
        switch (padding) {
            case "xs":
                return "4px";
            case "sm":
                return "12px";
            case undefined:
            case "md":
                return "21px";
            case "lg":
                return "32px";
            case "xl":
                return "64px";
            case "none":
                return undefined;
            default:
                return `${padding}px`;
        }
    }}
`;

StyledCard.displayName = createComponentName("Card");

export default StyledCard as typeof Card;
