import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import { createComponentName } from "@utils";
import { background, border } from "@theme";
import { NuiCycleSelect } from "./types";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { extractInputContainerProps } from "../InputContainer/InputContainer";

// FIXME: Can't prev-button, input and next-button cannot be placed in a normal order because of a weird styling bug that would affect the prev-button when hovering/activating the input or the next-button

const CycleSelect: NuiCycleSelect = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                options,
                onChange,
                onPrevious,
                onNext,
                value,
                className,
                ...inputProps
            },
            ...inputContainerProps
        } = extractInputContainerProps(props);
        const { onFocus, onBlur, onKeyDown } = inputProps;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const classes = React.useMemo(
            () => clsx(["NuiCycleSelect", className]),
            [className]
        );

        const selectedOption = React.useMemo(
            () => _.findIndex(options, (o) => o.value == value),
            [options, value]
        );

        const prevOption = React.useMemo(() => {
            if (!options || _.size(options) <= 1) return null;
            if (selectedOption == -1) return _.first(options);

            return selectedOption != 0
                ? options[selectedOption - 1] // Index before
                : _.last(options); // Last index
        }, [options, selectedOption]);

        const nextOption = React.useMemo(() => {
            if (!options || _.size(options) <= 1) return null;
            if (selectedOption == -1) return _.first(options);

            return selectedOption != _.size(options) - 1
                ? options[selectedOption + 1] // Index after
                : _.first(options); // First index
        }, [options, selectedOption]);

        const prevDisabled = props.disabled || (!prevOption && !onPrevious);
        const nextDisabled = props.disabled || (!nextOption && !onNext);
        const disabled =
            props.disabled || (prevDisabled && nextDisabled && !value);

        const inputValue = React.useMemo(() => {
            if (!options || _.size(options) == 0) {
                return value ?? "No Options";
            }
            if (!options[selectedOption]) return value;
            return options[selectedOption].label;
        }, [options, selectedOption, value]);

        const handleFocus = React.useCallback<HTMLInputProps["onFocus"]>(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        /** Provides a way to navigate through the options with the arrows on each side of the input */
        const handleCycle = React.useCallback(
            (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setTouched(true);
                if (onChange && e.currentTarget.value) {
                    onChange(e.currentTarget.value, e);
                }
                if (e.currentTarget.dataset.cycle == "prev" && onPrevious) {
                    onPrevious(e);
                }
                if (e.currentTarget.dataset.cycle == "next" && onNext) {
                    onNext(e);
                }
            },
            [onChange, onNext, onPrevious]
        );

        /** Provides a way to navigate through the options with the keyboard arrows */
        const handleKeyDown = React.useCallback<HTMLInputProps["onKeyPress"]>(
            (e) => {
                switch (e.key) {
                    case "ArrowLeft": // Previous
                        if (onChange && prevOption) {
                            onChange(prevOption.value, e);
                        }
                        if (onPrevious) {
                            onPrevious(e);
                        }
                        break;
                    case "ArrowRight": // Next
                        if (onChange && nextOption) {
                            onChange(nextOption.value, e);
                        }
                        if (onNext) {
                            onNext(e);
                        }
                        break;
                    default:
                }

                if (onKeyDown) {
                    onKeyDown(e);
                }
            },
            [nextOption, onChange, onKeyDown, onNext, onPrevious, prevOption]
        );

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
            <StyledCycleSelect
                {...inputContainerProps}
                disabled={disabled}
                focused={focused}
                touched={touched}
                className={classes}
            >
                <div className="NuiCycleSelect__container">
                    <input
                        {...inputProps}
                        readOnly
                        className="NuiCycleSelect__input"
                        ref={ref}
                        type="text"
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        disabled={disabled}
                        value={inputValue}
                    />
                    <button
                        type="button"
                        data-cycle="prev"
                        tabIndex={-1}
                        value={prevOption?.value}
                        disabled={prevDisabled}
                        onClick={handleCycle}
                        className="NuiCycleSelect__button NuiCycleSelect__button--prev"
                    >
                        <div className="NuiCycleSelect__arrow NuiCycleSelect__arrow--left" />
                    </button>
                    <button
                        type="button"
                        data-cycle="next"
                        tabIndex={-1}
                        value={nextOption?.value}
                        disabled={nextDisabled}
                        onClick={handleCycle}
                        className="NuiCycleSelect__button NuiCycleSelect__button--next"
                    >
                        <div className="NuiCycleSelect__arrow NuiCycleSelect__arrow--right" />
                    </button>
                </div>
            </StyledCycleSelect>
        );
    })
);

const StyledCycleSelect = styled(InputContainer)`
    & .NuiCycleSelect__container {
        width: 100%;
        display: flex;
        align-items: center;
    }

    & .NuiCycleSelect__input {
        order: 2;
        text-align: center;

        &:disabled {
            font-style: italic;
        }
    }

    & .NuiCycleSelect__button {
        background-color: transparent;
        border: none;
        outline: none;
        transition: background-color 0.2s;
        cursor: pointer;
        height: 100%;
        padding: 0 5px;

        &:hover:not(:disabled) {
            ${background.secondary}
        }

        &:active:not(:disabled) {
            ${background.dimmed}
        }

        &:disabled {
            cursor: default;

            & > .NuiCycleSelect__arrow {
                ${border.secondary}
            }
        }
    }

    & .NuiCycleSelect__button--prev {
        order: 1;
        padding-left: 8px;
    }
    & .NuiCycleSelect__button--next {
        order: 3;
        padding-right: 8px;
    }

    & .NuiCycleSelect__arrow {
        ${border.primary}

        width: 5px;
        height: 5px;
        border-width: 0px;
        border-style: solid;
        border-top-width: 2px;
        border-right-width: 2px;
        pointer-events: none;

        &.NuiCycleSelect__arrow--left {
            transform: rotate(-135deg);
        }
        &.NuiCycleSelect__arrow--right {
            transform: rotate(45deg);
        }
    }
`;

StyledCycleSelect.displayName = createComponentName("StyledCycleSelect");
CycleSelect.displayName = createComponentName("CycleSelect");

export default CycleSelect;
