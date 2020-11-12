import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { createComponentName } from "@utils";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiDatePicker } from "./types";

const DatePicker: NuiDatePicker = React.memo(
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
            type = "text",
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const errors = React.useMemo(() => props.errors || [], [props.errors]);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiDatePicker",
                    focused && "NuiDatePicker--focused",
                    className,
                ]),
            [className, focused]
        );

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
                if (onChange) {
                    onChange(e.currentTarget.valueAsNumber, e);
                }
            },
            [onChange]
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
            <StyledDatePicker
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
                <div className="NuiDatePicker__container">
                    <input
                        {...restProps}
                        ref={ref}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={type}
                    />
                    <div className="NuiDatePicker__popover">
                        <div className="NuiDatePicker__calendar" />
                        <div className="NuiDatePicker__clock" />
                    </div>
                </div>
            </StyledDatePicker>
        );
    })
);

const StyledDatePicker = styled(InputContainer)``;

StyledDatePicker.displayName = createComponentName("StyledDatePicker");
DatePicker.displayName = createComponentName("DatePicker");

export default DatePicker;
