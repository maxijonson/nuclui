import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { quicksand } from "@fonts";
import { background, text, border, shadow } from "@theme";
import { NuiCard } from "./types";

const Card: NuiCard = React.forwardRef((props, ref) => {
    const { component, className, padding, disableShadow, ...restProps } =
        props;

    const Component = component || "div";

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiCard",
                [
                    padding == "xs" && "NuiCard--padding-xs",
                    padding == "sm" && "NuiCard--padding-sm",
                    padding == "lg" && "NuiCard--padding-lg",
                    padding == "xl" && "NuiCard--padding-xl",
                    padding == "none" && "NuiCard--padding-none",
                ],
                disableShadow && "NuiCard--no-shadow",
                className,
            ]),
        [className, disableShadow, padding]
    );

    return <Component {...restProps} ref={ref} className={classes} />;
});

const StyledCard = styled(Card)`
    ${quicksand}
    ${background.primary}
    ${text.primary}
    ${border.secondary}
    ${shadow.secondary}

    display: block;
    position: relative;
    box-sizing: border-box;
    margin-top: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 3px -1px var(--nui-shadow),
        0 1px 1px -1px var(--nui-shadow);
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    padding: 21px;

    &.NuiCard--padding-xs {
        padding: 4px;
    }
    &.NuiCard--padding-sm {
        padding: 12px;
    }
    &.NuiCard--padding-lg {
        padding: 32px;
    }
    &.NuiCard--padding-xl {
        padding: 64px;
    }
    &.NuiCard--padding-none {
        padding: 0;
    }

    &.NuiCard--no-shadow {
        box-shadow: none;
    }
`;

StyledCard.displayName = createComponentName("Card");

export default StyledCard as typeof Card;
