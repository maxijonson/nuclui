import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import { context, text } from "@theme";
import { createComponentName } from "@utils";
import { NuiCheckboxContainer } from "./types";

const CheckboxContainer: NuiCheckboxContainer = React.memo(
    React.forwardRef((props, ref) => {
        const {
            className,
            label,
            onFocus,
            onChange,
            onBlur,
            value,
            inputValue,
            labelPosition,
            errors: errorsProp,
            children,
            focused,
            touched,
            size,
            type = "checkbox",
            ...restProps
        } = props;

        const errors = React.useMemo(() => errorsProp || [], [errorsProp]);

        const classes = React.useMemo(
            () =>
                clsx(
                    "NuiCheckboxContainer",
                    [
                        labelPosition == "top" &&
                            "NuiCheckboxContainer--position-top",
                        labelPosition == "bottom" &&
                            "NuiCheckboxContainer--position-bottom",
                        labelPosition == "left" &&
                            "NuiCheckboxContainer--position-left",
                    ],
                    [
                        size == "xs" && "NuiCheckboxContainer--size-xs",
                        size == "md" && "NuiCheckboxContainer--size-md",
                        size == "lg" && "NuiCheckboxContainer--size-lg",
                        size == "xl" && "NuiCheckboxContainer--size-xl",
                    ],
                    props.disabled && "NuiCheckboxContainer--disabled",
                    errors.length && touched && "NuiCheckboxContainer--invalid",
                    focused && "NuiCheckboxContainer--focused",
                    className
                ),
            [
                className,
                errors.length,
                focused,
                labelPosition,
                props.disabled,
                size,
                touched,
            ]
        );

        return (
            <label className={classes}>
                <div className="NuiCheckboxContainer__container">
                    {label && (
                        <div className="NuiCheckboxContainer__label">
                            {label}
                        </div>
                    )}
                    <div className="NuiCheckboxContainer__inputContainer">
                        <input
                            {...restProps}
                            value={inputValue}
                            checked={value}
                            onFocus={onFocus}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                            type={type}
                            className="NuiCheckboxContainer__input"
                        />
                        {children}
                    </div>
                </div>
                {errors.length > 0 && touched && (
                    <div
                        className="NuiCheckboxContainer__error"
                        children={_.first(errors)}
                    />
                )}
            </label>
        );
    })
);

const StyledCheckboxContainer = styled(CheckboxContainer)`
    ${context}
    --nui-checkboxContainer-size: 18px;

    position: relative;
    display: flex;
    width: fit-content;
    pointer-events: none;
    flex-direction: column;
    margin: 10px 0;

    & .NuiCheckboxContainer__label,
    & .NuiCheckboxContainer__error {
        ${text.secondary}

        transition: color 0.2s;
        font-size: calc(var(--nui-checkboxContainer-size) / 1.3);
        font-weight: 500;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    & .NuiCheckboxContainer__inputContainer {
        position: relative;
        flex-shrink: 0;
        width: var(--nui-checkboxContainer-size);
        height: var(--nui-checkboxContainer-size);
    }

    & .NuiCheckboxContainer__input,
    & .NuiCheckboxContainer__label {
        cursor: pointer;
        pointer-events: all;
    }

    & .NuiCheckboxContainer__input {
        position: absolute;
        opacity: 0;
    }

    & .NuiCheckboxContainer__container {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-direction: row-reverse;
    }

    &.NuiCheckboxContainer--position-top {
        & .NuiCheckboxContainer__container {
            gap: 0;
            flex-direction: column;
        }
    }

    &.NuiCheckboxContainer--position-left {
        & .NuiCheckboxContainer__container {
            gap: 10px;
            flex-direction: row;
        }
    }

    &.NuiCheckboxContainer--position-bottom {
        flex-direction: column-reverse;

        & .NuiCheckboxContainer__container {
            gap: 0;
            flex-direction: column-reverse;
        }
    }

    &.NuiCheckboxContainer--disabled {
        opacity: 0.5;

        & .NuiCheckboxContainer__input,
        & .NuiCheckboxContainer__label {
            cursor: default;
            pointer-events: none;
        }
    }

    &.NuiCheckboxContainer--invalid {
        & .NuiCheckboxContainer__label,
        & .NuiCheckboxContainer__error {
            color: var(--nui-context-danger);
        }
    }

    &.NuiCheckboxContainer--size-xs {
        --nui-checkboxContainer-size: 12px;
    }
    &.NuiCheckboxContainer--size-md {
        --nui-checkboxContainer-size: 24px;
    }
    &.NuiCheckboxContainer--size-lg {
        --nui-checkboxContainer-size: 32px;
    }
    &.NuiCheckboxContainer--size-xl {
        --nui-checkboxContainer-size: 42px;
    }
`;

StyledCheckboxContainer.displayName = createComponentName("CheckboxContainer");

export default StyledCheckboxContainer as typeof CheckboxContainer;
