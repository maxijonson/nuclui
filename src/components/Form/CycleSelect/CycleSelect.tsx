import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import { createComponentName } from "@utils";
import { background, border } from "@theme";
import { NuiCycleSelect } from "./types";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";

const CycleSelect: NuiCycleSelect = React.memo(
    React.forwardRef((props, ref) => {
        const {
            label,
            className,
            variant,
            onFocus,
            onChange,
            onBlur,
            onKeyDown,
            append,
            prepend,
            size,
            fluid,
            disabled,
            options,
            value,
            errors,
            ...restProps
        } = props;

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
            if (_.size(options) <= 1) return null;
            if (selectedOption == -1) return _.first(options);

            return selectedOption != 0
                ? options?.[selectedOption - 1] // Index before
                : _.last(options); // Last index
        }, [options, selectedOption]);

        const nextOption = React.useMemo(() => {
            if (_.size(options) <= 1) return null;
            if (selectedOption == -1) return _.first(options);

            return selectedOption != _.size(options) - 1
                ? options?.[selectedOption + 1] // Index after
                : _.first(options); // First index
        }, [options, selectedOption]);

        const inputValue = React.useMemo(() => {
            if (_.size(options) == 0) return "No Options";
            if (!options?.[selectedOption]) return "";
            return options[selectedOption].label;
        }, [options, selectedOption]);

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
            },
            [onChange]
        );

        /** Provides a way to navigate through the options with the keyboard arrows */
        const handleKeyDown = React.useCallback<HTMLInputProps["onKeyPress"]>(
            (e) => {
                switch (e.key) {
                    case "ArrowLeft": // Previous
                        if (onChange && prevOption) {
                            onChange(prevOption.value, e);
                        }
                        break;
                    case "ArrowRight": // Next
                        if (onChange && nextOption) {
                            onChange(nextOption.value, e);
                        }
                        break;
                    default:
                }

                if (onKeyDown) {
                    onKeyDown(e);
                }
            },
            [nextOption, onChange, onKeyDown, prevOption]
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
                label={label}
                variant={variant}
                prepend={prepend}
                append={append}
                size={size}
                fluid={fluid}
                errors={errors}
                touched={touched}
                focused={focused}
                disabled={disabled}
                className={classes}
            >
                <div className="NuiCycleSelect__container">
                    <button
                        type="button"
                        tabIndex={-1}
                        value={prevOption?.value}
                        disabled={!prevOption}
                        onClick={handleCycle}
                        className="NuiCycleSelect__button NuiCycleSelect__button--prev"
                    >
                        <div className="NuiCycleSelect__arrow NuiCycleSelect__arrow--left" />
                    </button>
                    <input
                        {...restProps}
                        readOnly
                        className="NuiCycleSelect__input"
                        ref={ref}
                        type="text"
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        disabled={_.size(options) == 0}
                        value={inputValue}
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        value={nextOption?.value}
                        disabled={!nextOption}
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
        padding-left: 8px;
    }
    & .NuiCycleSelect__button--next {
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
