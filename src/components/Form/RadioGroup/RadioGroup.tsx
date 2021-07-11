import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName } from "@utils";
import { quicksand } from "@fonts";
import { NuiRadioGroup, RadioGroupContextValue } from "./types";
import { InputBase } from "../InputBase";
import { extractInputBaseProps } from "../InputBase/InputBase";

export const RadioGroupContext = React.createContext<RadioGroupContextValue>(
    {}
);

const RadioGroup: NuiRadioGroup = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                name,
                direction,
                onChange,
                value,
                className,
                children,
                ...inputBaseElementProps
            },
            ...inputBaseProps
        } = extractInputBaseProps(props);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiRadioGroup",
                    [
                        direction == "row-reverse" &&
                            "NuiRadioGroup--direction-row-reverse",
                        direction == "column" &&
                            "NuiRadioGroup--direction-column",
                        direction == "column-reverse" &&
                            "NuiRadioGroup--direction-column-reverse",
                    ],
                    className,
                ]),
            [className, direction]
        );

        const providerValue = React.useMemo(
            () => ({
                name,
                size: inputBaseProps.size,
                onChange,
                value,
            }),
            [inputBaseProps.size, name, onChange, value]
        );

        return (
            <StyledRadioGroup
                {...inputBaseElementProps}
                {...inputBaseProps}
                className={classes}
                ref={ref}
            >
                <div className="NuiRadioGroup__group" data-group={name}>
                    <RadioGroupContext.Provider value={providerValue}>
                        {children}
                    </RadioGroupContext.Provider>
                </div>
            </StyledRadioGroup>
        );
    })
);

const StyledRadioGroup = styled(InputBase)`
    ${quicksand}

    --nui-radiogroup-pad: 8px;

    & .NuiRadioGroup__group {
        display: flex;
        flex-direction: row;
        gap: var(--nui-radiogroup-pad);
    }

    &.NuiRadioGroup--direction-row-reverse .NuiRadioGroup__group {
        flex-direction: row-reverse;
    }
    &.NuiRadioGroup--direction-column .NuiRadioGroup__group {
        flex-direction: column;
    }
    &.NuiRadioGroup--direction-column-reverse .NuiRadioGroup__group {
        flex-direction: column-reverse;
    }

    & .NuiInputBase__label-container {
        pointer-events: none;

        & .NuiInputBase__label-container {
            pointer-events: all;
        }
    }

    &.NuiInputBase--size-xs {
        --nui-radiogroup-pad: 4px;
    }
    &.NuiInputBase--size-md {
        --nui-radiogroup-pad: 10px;
    }
    &.NuiInputBase--size-lg {
        --nui-radiogroup-pad: 12px;
    }
    &.NuiInputBase--size-xl {
        --nui-radiogroup-pad: 14px;
    }
`;

RadioGroupContext.displayName = createComponentName("RadioGroupContext");
RadioGroup.displayName = createComponentName("RadioGroup");
StyledRadioGroup.displayName = createComponentName("StyledRadioGroup");

export default RadioGroup;
