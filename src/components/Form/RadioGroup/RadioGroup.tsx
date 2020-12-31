import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { context, text } from "@theme";
import { NuiRadioGroup, RadioGroupContextValue } from "./types";

export const RadioGroupContext = React.createContext<RadioGroupContextValue>(
    {}
);

const RadioGroup: NuiRadioGroup = React.memo(
    React.forwardRef((props, ref) => {
        const {
            label,
            name,
            size,
            onChange,
            value,
            errors: errorsProp,
            direction,
            className,
            children,
            component,
            ...restProps
        } = props;

        const Component = component || "div";

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiRadioGroup",
                    [
                        size == "xs" && "NuiRadioGroup--size-xs",
                        size == "md" && "NuiRadioGroup--size-md",
                        size == "lg" && "NuiRadioGroup--size-lg",
                        size == "xl" && "NuiRadioGroup--size-xl",
                    ],
                    [
                        direction == "row-reverse" &&
                            "NuiRadioGroup--direction-rowreverse",
                        direction == "column" &&
                            "NuiRadioGroup--direction-column",
                        direction == "column-reverse" &&
                            "NuiRadioGroup--direction-columnreverse",
                    ],
                    className,
                ]),
            [className, direction, size]
        );

        return (
            <Component className={classes} ref={ref} {...restProps}>
                {label && (
                    <label className="NuiRadioGroup__label">{label}</label>
                )}
                <div className="NuiRadioGroup__group" data-group={name}>
                    <RadioGroupContext.Provider
                        value={{ name, size, onChange, value }}
                    >
                        {children}
                    </RadioGroupContext.Provider>
                </div>
            </Component>
        );
    })
);

const StyledRadioGroup = styled(RadioGroup)`
    ${context}
    --nui-radiogroup-size: 18px;
    --nui-radiogroup-pad: 8px;
    --nui-radiogroup-font: 17px;

    & .NuiRadioGroup__label {
        ${text.secondary}

        transition: color 0.2s;
        font-size: calc(var(--nui-radiogroup-font) / 1.25);
        font-weight: 500;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    & .NuiRadioGroup__group {
        display: flex;
        flex-direction: row;
        gap: var(--nui-radiogroup-pad);
    }

    &.NuiRadioGroup--direction-rowreverse .NuiRadioGroup__group {
        flex-direction: row-reverse;
    }
    &.NuiRadioGroup--direction-column .NuiRadioGroup__group {
        flex-direction: column;
    }
    &.NuiRadioGroup--direction-columnreverse .NuiRadioGroup__group {
        flex-direction: column-reverse;
    }

    &.NuiRadioGroup--size-xs {
        --nui-radiogroup-size: 14px;
        --nui-radiogroup-pad: 4px;
        --nui-radiogroup-font: 12px;
    }
    &.NuiRadioGroup--size-md {
        --nui-radiogroup-size: 24px;
        --nui-radiogroup-pad: 10px;
        --nui-radiogroup-font: 23px;
    }
    &.NuiRadioGroup--size-lg {
        --nui-radiogroup-size: 32px;
        --nui-radiogroup-pad: 12px;
        --nui-radiogroup-font: 30px;
    }
    &.NuiRadioGroup--size-xl {
        --nui-radiogroup-size: 42px;
        --nui-radiogroup-pad: 14px;
        --nui-radiogroup-font: 40px;
    }
`;

RadioGroupContext.displayName = createComponentName("RadioGroupContext");
RadioGroup.displayName = createComponentName("RadioGroup");
StyledRadioGroup.displayName = createComponentName("StyledRadioGroup");

export default StyledRadioGroup as typeof RadioGroup;
