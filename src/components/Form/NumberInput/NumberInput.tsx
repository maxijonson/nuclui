import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName, mergeRefs } from "@utils";
import { text } from "@theme";
import { useControllable } from "@hooks";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiNumberInput } from "./types";
import { extractInputContainerProps } from "../InputContainer/InputContainer";

const arrowUp = (
    <svg viewBox="0 0 135 1">
        <g transform="rotate(-180 70,42.50000381469726)">
            <path d="m125,8.5375l-112,0c-5.3,0 -8,6.4 -4.2,10.2l56,56c2.3,2.3 6.1,2.3 8.401,0l56,-56c3.799,-3.8 1.099,-10.2 -4.201,-10.2z" />
        </g>
    </svg>
);

const arrowDown = (
    <svg viewBox="0 0 135 100">
        <path d="m125,8.5375l-112,0c-5.3,0 -8,6.4 -4.2,10.2l56,56c2.3,2.3 6.1,2.3 8.401,0l56,-56c3.799,-3.8 1.099,-10.2 -4.201,-10.2z" />
    </svg>
);

const NumberInput: NuiNumberInput = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                type,
                value: propsValue,
                defaultValue,
                strict = false,
                onChange,
                min,
                max,
                step,
                className,
                ...inputProps
            },
            ...inputContainerProps
        } = extractInputContainerProps(props);
        const { onFocus, onBlur } = inputProps;
        const { disabled } = inputContainerProps;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);
        const inputRef = React.useRef<HTMLInputElement>(null);

        const mergedRefs = React.useMemo(() => mergeRefs(ref, inputRef), [ref]);

        const [controllableValue, controllableOnChange, readOnly] =
            useControllable(defaultValue ?? NaN, props);

        const value = React.useMemo(() => {
            if (isNaN(controllableValue)) return strict ? 0 : "";
            return controllableValue;
        }, [controllableValue, strict]);

        const canStepUp = React.useMemo(() => {
            if (max == undefined) return true;
            const s = step ?? 1;

            if (typeof value === "number") {
                return value + s <= max;
            }

            return min != undefined ? min + s <= max : max >= s;
        }, [max, min, step, value]);

        const canStepDown = React.useMemo(() => {
            if (min == undefined) return true;
            const s = step ?? 1;

            if (typeof value === "number") {
                return value - s >= min;
            }

            return -s >= min;
        }, [min, step, value]);

        const stepUpDisabled = disabled || readOnly || !canStepUp;
        const stepDownDisabled = disabled || readOnly || !canStepDown;

        const handleFocus = React.useCallback<HTMLInputProps["onFocus"]>(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        const onValueChange = React.useCallback(
            (v: number, e?: React.ChangeEvent<HTMLInputElement>) => {
                /* istanbul ignore next */
                if (isNaN(v) && strict) {
                    controllableOnChange(0, e);
                } else {
                    controllableOnChange(v, e);
                }
            },
            [controllableOnChange, strict]
        );

        const handleChange = React.useCallback<HTMLInputProps["onChange"]>(
            (e) => {
                const { valueAsNumber } = e.target;
                onValueChange(valueAsNumber, e);
            },
            [onValueChange]
        );

        const increment = React.useCallback(() => {
            /* istanbul ignore next */
            if (!inputRef.current) {
                return;
            }
            inputRef.current.stepUp();
            setTouched(true);
            onValueChange(inputRef.current.valueAsNumber);
        }, [onValueChange]);

        const decrement = React.useCallback(() => {
            /* istanbul ignore next */
            if (!inputRef.current) {
                return;
            }
            inputRef.current.stepDown();
            setTouched(true);
            onValueChange(inputRef.current.valueAsNumber);
        }, [onValueChange]);

        const handleBlur = React.useCallback<HTMLInputProps["onBlur"]>(
            (e) => {
                setFocused(false);
                setTouched(true);
                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur]
        );

        return (
            <StyledNumberInput
                {...inputContainerProps}
                focused={focused}
                touched={touched}
                className={clsx(["NuiNumberInput", className])}
            >
                <input
                    {...inputProps}
                    readOnly={readOnly}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                    className="NuiNumberInput__input"
                    type="number"
                    ref={mergedRefs}
                    value={value}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className="NuiNumberInput__arrows">
                    <button
                        type="button"
                        disabled={stepUpDisabled}
                        className={clsx([
                            "NuiNumberInput__arrows__up",
                            stepUpDisabled && "disabled",
                        ])}
                        onClick={increment}
                        tabIndex={-1}
                    >
                        {arrowUp}
                    </button>
                    <button
                        type="button"
                        disabled={stepDownDisabled}
                        className={clsx([
                            "NuiNumberInput__arrows__down",
                            stepDownDisabled && "disabled",
                        ])}
                        onClick={decrement}
                        tabIndex={-1}
                    >
                        {arrowDown}
                    </button>
                </div>
            </StyledNumberInput>
        );
    })
);

const StyledNumberInput = styled(InputContainer)`
    & .NuiNumberInput__input {
        -moz-appearance: textfield;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0;
        }
    }

    & .NuiNumberInput__arrows {
        display: flex;
        flex-direction: column;
        width: 4%;
        margin-right: 10px;
        opacity: 0;
        transition: opacity 100ms;

        & > .NuiNumberInput__arrows__up,
        & > .NuiNumberInput__arrows__down {
            margin: 0;
            padding: 0;
            height: 1em;
            border: none;
            background: none;
            outline: none;
            cursor: pointer;

            & > svg {
                ${text.secondary}

                width: 100%;
                height: 100%;
                fill: ${text.varSecondary};
            }

            &.disabled {
                cursor: default;
                opacity: 0;
            }
        }
    }

    &:hover .NuiNumberInput__arrows,
    &.focused .NuiNumberInput__arrows {
        opacity: 1;
    }
`;

StyledNumberInput.displayName = createComponentName("StyledNumberInput");
NumberInput.displayName = createComponentName("NumberInput");

export default NumberInput;
