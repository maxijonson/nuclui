import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { background, border, context, shadow, text } from "@theme";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiSelect, SelectOption, HTMLButtonProps } from "./types";

// FIXME: Find a better way to know when the input is "focused". Focus is lost when selecting an option, which influenced some "hacks" but has limitations.
// TODO: Multi select (maybe separate component?)
// TODO: Make sure the options do not go out of view

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
            onKeyDown,
            append,
            prepend,
            size,
            disabled,
            options,
            renderOption,
            creatable = false,
            onCreate,
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);
        const [highlight, setHighlight] = React.useState(-1);
        const [search, setSearch] = React.useState<string | null>(null);
        const [created, setCreated] = React.useState<SelectOption[]>([]);

        const timeout = React.useRef<number>(0);
        const containerRef = React.useRef<HTMLDivElement>(null);

        const errors = React.useMemo(() => props.errors || [], [props.errors]);

        const classes = React.useMemo(
            () =>
                clsx(["NuiSelect", focused && "NuiSelect--focused", className]),
            [className, focused]
        );

        const mergedOptions = React.useMemo(() => [...created, ...options], [
            created,
            options,
        ]);

        /** The value displayed inside the text input */
        const inputValue = React.useMemo(() => {
            // Show the search query
            if (search != null) return search;

            // Show the selected option label
            const selected = _.find(
                mergedOptions,
                (o) => o.value == props.value
            );
            if (selected) return selected.label;

            // Fallback value
            if (props.value == null || props.value == undefined) return "";
            return props.value;
        }, [mergedOptions, props.value, search]);

        /** Filters `props.options` according to the `search` state */
        const filteredOptions = React.useMemo(() => {
            if (!search) return mergedOptions;

            const lowerCaseSearch = search.toLowerCase();
            return _.filter(mergedOptions, (o) =>
                _.includes(
                    o.label.toLowerCase() + o.value.toLowerCase(),
                    lowerCaseSearch
                )
            );
        }, [mergedOptions, search]);

        /** Whether or not the search query can be created as an option */
        const canCreate = React.useMemo(() => {
            if (!creatable || !search) return false;
            const lowerCaseSearch = search.toLowerCase();
            return !_.find(
                filteredOptions,
                (o) =>
                    o.label.toLowerCase() == lowerCaseSearch ||
                    o.value.toLowerCase() == lowerCaseSearch
            );
        }, [creatable, filteredOptions, search]);

        const handleFocus = React.useCallback<HTMLInputProps["onFocus"]>(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        /** Changes the search query and resets the highlight position */
        const handleChange = React.useCallback<HTMLInputProps["onChange"]>(
            (e) => {
                setSearch(e.currentTarget.value);
                setHighlight(-1);
            },
            []
        );

        /** Fired when selecting an option from the options list */
        const handleItemSelect = React.useCallback<HTMLButtonProps["onClick"]>(
            (e) => {
                setSearch(null);
                setHighlight(-1);

                window.clearTimeout(timeout.current);

                if (onChange) {
                    onChange(e.currentTarget.value, e);
                }
            },
            [onChange]
        );

        const createOption = React.useCallback<HTMLButtonProps["onClick"]>(
            (e) => {
                if (search) {
                    let createdOption: SelectOption | null = {
                        value: search,
                        label: search,
                    };

                    if (onCreate) {
                        const result = onCreate(search);
                        if (result == false) {
                            createdOption = null;
                        }
                        if (typeof result === "object") {
                            createdOption = result;
                        }
                    }

                    if (createdOption) {
                        setCreated((current) => [
                            ...current,
                            createdOption as SelectOption,
                        ]);
                        if (onChange) {
                            onChange(createdOption.value, e);
                        }
                    }

                    setHighlight(-1);
                    setSearch(null);
                }
            },
            [onChange, onCreate, search]
        );

        /** Provides a way to navigate and select from the options list with the keyboard */
        const handleKeyDown = React.useCallback<HTMLInputProps["onKeyPress"]>(
            (e) => {
                let next: number;
                let option: SelectOption | null;

                switch (e.key) {
                    // Highlight previous option
                    case "ArrowUp":
                        e.preventDefault();
                        next = highlight - 1;
                        if (filteredOptions[next]) {
                            setHighlight(next);
                        }
                        break;
                    // Highlight next option
                    case "ArrowDown":
                        e.preventDefault();
                        next = highlight + 1;
                        if (filteredOptions[next]) {
                            setHighlight(next);
                        }
                        break;
                    // Select highlighted option
                    case "Enter":
                        if (highlight != -1) {
                            e.preventDefault();
                        }
                        option = filteredOptions[highlight];
                        if (option != null && !option.disabled && onChange) {
                            setHighlight(-1);
                            setSearch(null);
                            onChange(option.value, e);
                        }
                        break;
                    default:
                }

                if (onKeyDown) {
                    onKeyDown(e);
                }
            },
            [filteredOptions, highlight, onChange, onKeyDown]
        );

        const handleBlur = React.useCallback<HTMLInputProps["onBlur"]>(
            (e) => {
                setFocused(false);
                setTouched(true);
                setHighlight(-1);

                // HACK: Prevent the search to be cleared before handleItemSelect fires
                timeout.current = window.setTimeout(() => {
                    setSearch(null);
                }, 200);

                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur]
        );

        /** Scroll to the highlighted option */
        React.useEffect(() => {
            if (highlight != -1 && containerRef.current != null) {
                const highlighted = containerRef.current.getElementsByClassName(
                    "NuiSelect__options__list__item--highlighted"
                )[0] as HTMLElement;
                const list = containerRef.current.getElementsByClassName(
                    "NuiSelect__options__list"
                )[0] as HTMLElement;

                if (highlighted && list) {
                    const highlightedPos = highlighted.offsetTop;

                    // Scroll higher
                    if (highlightedPos < list.scrollTop) {
                        list.scrollTop = highlightedPos;
                    }

                    // Scroll lower
                    if (
                        highlightedPos + highlighted.clientHeight >
                        list.scrollTop + list.clientHeight
                    ) {
                        list.scrollTop =
                            highlightedPos -
                            (list.clientHeight - highlighted.clientHeight);
                    }
                }
            }
        }, [highlight]);

        /** Cleanup */
        React.useEffect(
            () => () => {
                window.clearTimeout(timeout.current);
            },
            []
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
                ref={containerRef}
            >
                <div className="NuiSelect__container">
                    <input
                        {...restProps}
                        disabled={disabled}
                        value={inputValue}
                        className="NuiSelect__input"
                        ref={ref}
                        type="text"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="NuiSelect__icon" />
                </div>

                <div className="NuiSelect__options">
                    <ul className="NuiSelect__options__list">
                        {!canCreate && filteredOptions.length == 0 && (
                            <div
                                children="No Option"
                                className="NuiSelect__options__list__empty"
                            />
                        )}
                        {canCreate && (
                            <button
                                type="button"
                                children={`Create ${search}`}
                                className="NuiSelect__options__list__create"
                                onClick={createOption}
                            />
                        )}
                        {_.map(filteredOptions, (option, i) => (
                            <button
                                type="button"
                                className={clsx([
                                    "NuiSelect__options__list__item",
                                    option.value == props.value &&
                                        "NuiSelect__options__list__item--selected",
                                    i == highlight &&
                                        "NuiSelect__options__list__item--highlighted",
                                ])}
                                key={`${i}${option.value}`}
                                value={option.value}
                                onClick={handleItemSelect}
                                disabled={option.disabled}
                                tabIndex={-1}
                            >
                                {renderOption
                                    ? renderOption(option, i, filteredOptions)
                                    : option.label}
                            </button>
                        ))}
                    </ul>
                </div>
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

    & .NuiSelect__options__list__item,
    & .NuiSelect__options__list__create {
        display: block;
        border: none;
        outline: none;
        width: 100%;
        text-align: left;
        margin: 0;
    }

    & .NuiSelect__options__list__item,
    & .NuiSelect__options__list__empty,
    & .NuiSelect__options__list__create {
        ${background.primary}
        
        padding: 5px 10px;
        transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
        cursor: pointer;

        &:hover:not(:disabled):not(.NuiSelect__options__list__empty):not(.NuiSelect__options__list__item--selected),
        &.NuiSelect__options__list__item--highlighted {
            ${background.dimmed}
        }

        &.NuiSelect__options__list__item--selected {
            background-color: var(--nui-context-primaryVLight);

            &:hover,
            &.NuiSelect__options__list__item--highlighted {
                background-color: var(--nui-context-primaryLight);
            }
        }

        &:disabled {
            ${text.secondary}
            
            cursor: default;
        }
    }

    & .NuiSelect__container {
        position: relative;
        width: 100%;
    }

    & input.NuiSelect__input {
        padding-right: 28px;
    }

    & .NuiSelect__icon {
        ${border.primary}

        opacity: 0.5;
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

    & .NuiSelect__options__list__empty,
    & .NuiSelect__options__list__create {
        text-align: center;
        font-style: italic;
    }

    & .NuiSelect__options__list__empty {
        cursor: default;
    }
`;

export default Select;
