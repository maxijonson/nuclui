import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { context, text } from "@theme";
import { createComponentName } from "@utils";
import { quicksand } from "@fonts";
import { InputBaseProps, NuiInputBase } from "./types";

const InputBase: NuiInputBase = React.memo(
    React.forwardRef((props, ref) => {
        const {
            label,
            labelPosition,
            className,
            size,
            children,
            disabled,
            fluid = false,
            focused = false,
            touched = true,
            errors: errorsProp,
            ...restProps
        } = props;

        const errors = React.useMemo(() => errorsProp || [], [errorsProp]);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiInputBase",
                    focused && "NuiInputBase--focused",
                    errors.length && touched && "NuiInputBase--invalid",
                    [
                        labelPosition == "right" &&
                            "NuiInputBase--position-right",
                        labelPosition == "bottom" &&
                            "NuiInputBase--position-bottom",
                        labelPosition == "left" &&
                            "NuiInputBase--position-left",
                    ],
                    [
                        size == "xs" && "NuiInputBase--size-xs",
                        size == "md" && "NuiInputBase--size-md",
                        size == "lg" && "NuiInputBase--size-lg",
                        size == "xl" && "NuiInputBase--size-xl",
                    ],
                    disabled && "NuiInputBase--disabled",
                    fluid && "NuiInputBase--fluid",
                    className,
                ]),
            [
                className,
                disabled,
                errors.length,
                fluid,
                focused,
                labelPosition,
                size,
                touched,
            ]
        );

        return (
            <StyledInputBase {...restProps} className={classes} ref={ref}>
                <label className="NuiInputBase__label-container">
                    {label && (
                        <span
                            className="NuiInputBase__label"
                            children={label}
                        />
                    )}
                    <div className="NuiInputBase__container">{children}</div>
                </label>
                {errors.length > 0 && touched && (
                    <div
                        className="NuiInputBase__error"
                        children={_.first(errors)}
                    />
                )}
            </StyledInputBase>
        );
    })
);

const TRANSITION_TIME = 0.2;

const StyledInputBase = styled.div`
    ${quicksand}
    ${context.primary}
    ${context.danger}

    --nui-inputBase-size: 18px;
    --nui-inputBase-font: 17px;

    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 10px 0;
    transition: opacity ${TRANSITION_TIME}s;
    width: calc(var(--nui-inputBase-size) * 18);
    font-size: var(--nui-inputBase-font);

    & .NuiInputBase__label-container {
        display: flex;
        flex-direction: column;
        -webkit-tap-highlight-color: transparent;
    }

    & .NuiInputBase__label,
    & .NuiInputBase__error {
        ${text.secondary}

        width: fit-content;
        transition: color ${TRANSITION_TIME}s;
        font-size: calc(var(--nui-inputBase-font) / 1.25);
        font-weight: 500;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    &.NuiInputBase--focused {
        & .NuiInputBase__label {
            color: ${context.varPrimary};
        }
    }

    &.NuiInputBase--invalid {
        & .NuiInputBase__error,
        & .NuiInputBase__label {
            color: ${context.varDanger};
        }
    }

    &.NuiInputBase--disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    &.NuiInputBase--fluid {
        width: 100%;
    }

    &.NuiInputBase--position-right {
        & .NuiInputBase__label-container {
            gap: 10px;
            flex-direction: row-reverse;
            align-items: center;
        }
    }

    &.NuiInputBase--position-left {
        & .NuiInputBase__label-container {
            gap: 10px;
            flex-direction: row;
            align-items: center;
        }
    }

    &.NuiInputBase--position-bottom {
        flex-direction: column-reverse;

        & .NuiInputBase__label-container {
            gap: 0;
            flex-direction: column-reverse;
        }
    }

    &.NuiInputBase--size-xs {
        --nui-inputBase-size: 14px;
        --nui-inputBase-font: 12px;
    }
    &.NuiInputBase--size-md {
        --nui-inputBase-size: 24px;
        --nui-inputBase-font: 23px;
    }
    &.NuiInputBase--size-lg {
        --nui-inputBase-size: 32px;
        --nui-inputBase-font: 30px;
    }
    &.NuiInputBase--size-xl {
        --nui-inputBase-size: 42px;
        --nui-inputBase-font: 40px;
    }
`;

StyledInputBase.displayName = createComponentName("StyledInputBase");
InputBase.displayName = createComponentName("InputBase");

/**
 * Extracts all relevant props for the InputBase and gives them a default value, if needed. The excess is placed in the `restProps` property.
 */
export const extractInputBaseProps = <T extends InputBaseProps>(
    props: T
): Required<InputBaseProps> & { restProps: Omit<T, keyof InputBaseProps> } => {
    const {
        disabled = false,
        errors = [],
        fluid = false,
        focused = false,
        label = "",
        labelPosition = "top",
        size = "sm",
        touched = true,
        ...restProps
    } = props;

    return {
        disabled,
        errors,
        fluid,
        focused,
        label,
        labelPosition,
        size,
        touched,
        restProps,
    };
};

export default InputBase;
