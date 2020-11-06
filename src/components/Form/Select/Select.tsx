import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { background, border, context, shadow, text } from "@theme";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiSelect } from "./types";

const Select: NuiSelect = React.memo(
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
            options,
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const errors = React.useMemo(() => props.errors || [], [props.errors]);

        const classes = React.useMemo(
            () =>
                clsx(["NuiSelect", focused && "NuiSelect--focused", className]),
            [className, focused]
        );

        const inputValue = React.useMemo(() => {
            if (!props.value) return "";

            const selected = _.find(options, (o) => o.value == props.value);

            if (selected) return selected.label;

            return props.value;
        }, [options, props.value]);

        const handleInputFocus = React.useCallback<HTMLInputProps["onFocus"]>(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        const handleInputChange = React.useCallback<HTMLInputProps["onChange"]>(
            () => null,
            []
        );

        const handleItemSelect = React.useCallback(
            (e: React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
                if (onChange) {
                    onChange(e.currentTarget.value);
                }
            },
            [onChange]
        );

        const handleInputBlur = React.useCallback<HTMLInputProps["onBlur"]>(
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
            <StyledSelect
                disabled={disabled}
                focused={focused}
                touched={touched}
                errors={errors}
                size={size}
                prepend={prepend}
                append={append}
                label={label}
                variant={variant}
                className={classes}
            >
                <input
                    {...restProps}
                    value={inputValue}
                    className="NuiSelect__input"
                    ref={ref}
                    type="text"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                />
                <div className="NuiSelect__options">
                    <ul className="NuiSelect__options__list">
                        {_.map(options, (option, i) => (
                            <option
                                className={clsx([
                                    "NuiSelect__options__list__item",
                                    option.value == props.value &&
                                        "NuiSelect__options__list__item--selected",
                                ])}
                                key={`${i}${option.value}`}
                                children={option.label}
                                value={option.value}
                                onClick={handleItemSelect}
                                disabled={option.disabled}
                            />
                        ))}
                    </ul>
                </div>
                <div className="NuiSelect__icon" />
            </StyledSelect>
        );
    })
);

const StyledSelect = styled(InputContainer)`
    ${context}

    & .NuiSelect__options {
        ${background.primary}
        ${shadow.primary}
        ${border.primary}

        border-radius: 0 0 4px 4px;
        border-style: solid;
        border-top-width: 0;
        border-width: 1px;
        box-shadow: 0 2px 3px -1px var(--nui-shadow), 0 1px 1px -1px var(--nui-shadow);
        box-sizing: border-box;
        left: 0;
        opacity: 0;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: calc(100% + 1px);
        transform-origin: top center;
        transform: scaleY(0);
        transition: opacity 0.2s, transform 0.2s;
        z-index: 10;
    }

    & .NuiSelect__options__list {
        margin: 0;
        padding: 0;
        max-height: 150px;
        overflow-y: auto;
    }

    & .NuiSelect__options__list__item {
        ${background.primary}
        
        padding: 0 10px;
        transition: background-color 0.2s, color 0.2s;
        cursor: pointer;

        &:hover:not(:disabled) {
            ${background.dimmed}
        }

        &:disabled {
            ${text.secondary}
            
            cursor: default;
        }

        &.NuiSelect__options__list__item--selected {
            ${background.secondary}

            color: var(--nui-context-primary);
        }
    }

    & .NuiSelect__icon {
        ${border.primary}

        position: absolute;
        transition: transform 0.2s;
        right: 10px;
        transform: translateY(-80%) rotate(135deg);
        top: 50%;
        width: 10px;
        height: 10px;
        border-style: solid;
        border-width: 1px;
        border-left-width: 0;
        border-bottom-width: 0;
        pointer-events: none;
    }

    &.NuiSelect--focused .NuiSelect__options, 
    & .NuiSelect__options:focus,
    & .NuiSelect__options:hover {
        opacity: 1;
        pointer-events: all;
        transform: scaleY(1);
    }

    &.NuiSelect--focused .NuiSelect__icon {
        transform: translateY(-20%) rotate(-45deg);
    }
`;

export default Select;
