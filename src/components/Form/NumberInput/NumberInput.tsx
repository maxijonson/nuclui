import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { createComponentName, mergeRefs } from "@utils";
import { text } from "@theme";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiNumberInput } from "./types";

// FIXME: NumberInput looks almost the same as TextInput. Maybe move some code in a reusable component.

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
            name,
            label,
            className,
            variant,
            onFocus,
            onChange,
            onBlur,
            append,
            prepend,
            size,
            disabled,
            min,
            max,
            step,
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);
        const inputRef = React.useRef<HTMLInputElement>(null);

        const mergedRefs = React.useMemo(() => mergeRefs(ref, inputRef), [ref]);

        const errors = React.useMemo(() => props.errors || [], [props.errors]);
        const value = React.useMemo(() => {
            if (props.value == undefined) return undefined;
            if (typeof props.value !== "number") return "";
            return props.value;
        }, [props.value]);

        const canStepUp = React.useMemo(() => {
            if (max == undefined) return true;
            const v = value ?? inputRef.current?.valueAsNumber;
            const s = step ?? 1;

            if (typeof v === "number") {
                return v + s <= max;
            }

            return min != undefined ? min + s <= max : max >= s;
        }, [max, min, step, value]);

        const canStepDown = React.useMemo(() => {
            if (min == undefined) return true;
            const v = value ?? inputRef.current?.valueAsNumber;
            const s = step ?? 1;

            if (typeof v === "number") {
                return v - s >= min;
            }

            return -s >= min;
        }, [min, step, value]);

        const handleFocus = React.useCallback<HTMLInputProps["onFocus"]>(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        const handleChange = React.useCallback<HTMLInputProps["onChange"]>(
            (e) => {
                if (onChange) {
                    onChange(e.currentTarget.valueAsNumber, e);
                }
            },
            [onChange]
        );

        const increment = React.useCallback(() => {
            if (inputRef.current) {
                inputRef.current.stepUp();
                if (onChange) {
                    onChange(inputRef.current.valueAsNumber);
                }
            }
        }, [onChange]);

        const decrement = React.useCallback(() => {
            if (inputRef.current) {
                inputRef.current.stepDown();
                if (onChange) {
                    onChange(inputRef.current.valueAsNumber);
                }
            }
        }, [onChange]);

        const handleBlur = React.useCallback<HTMLInputProps["onBlur"]>(
            (e) => {
                setFocused(false);
                if (!touched) {
                    setTouched(true);
                }
                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur, touched]
        );

        return (
            <StyledNumberInput
                disabled={disabled}
                focused={focused}
                touched={touched}
                errors={errors}
                size={size}
                prepend={prepend}
                append={append}
                label={label}
                variant={variant}
                className={clsx(["NuiNumberInput", className])}
            >
                <input
                    {...restProps}
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
                        disabled={!canStepUp}
                        className={clsx([
                            "NuiNumberInput__arrows__up",
                            !canStepUp && "disabled",
                        ])}
                        onClick={increment}
                    >
                        {arrowUp}
                    </button>
                    <button
                        type="button"
                        disabled={!canStepDown}
                        className={clsx([
                            "NuiNumberInput__arrows__down",
                            !canStepDown && "disabled",
                        ])}
                        onClick={decrement}
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
        padding: 8px;
        font-size: 16px;
        line-height: 19px;
        box-sizing: border-box;
        width: 100%;
        background: transparent;
        border: none;
        -moz-appearance: textfield;

        &:focus {
            outline: none;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
            -webkit-text-fill-color: inherit;
            box-shadow: 0 0 0px 1000px inherit inset;
            transition: background-color 5000s ease-in-out 0s;
        }

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
                fill: var(--nui-text-secondary);
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

NumberInput.displayName = createComponentName("NumberInput");

export default NumberInput;
