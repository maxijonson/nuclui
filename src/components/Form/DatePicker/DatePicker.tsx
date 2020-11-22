import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { createComponentName, nuiLog } from "@utils";
import { background, border, context, shadow, text } from "@theme";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiDatePicker } from "./types";
import { HTMLButtonProps } from "../Select/types";

// Inspired from: https://medium.com/swlh/build-a-date-picker-in-15mins-using-javascript-react-from-scratch-f6932c77db09
// TODO: Time picker (check for timezone)
// TODO: Range picker

const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const YEARS_PER_PAGE = 16;

/** Gets the amount of days in a month */
const getDays = (year: number, month: number) => {
    return 40 - new Date(year, month, 40).getDate();
};

/** Gets the next month from a given month in the [year, month] format */
const getNextMonth = (year: number, month: number) => {
    if (month == 11) {
        return [year + 1, 0] as const;
    }
    return [year, month + 1] as const;
};

/** Gets the previous month from a given month in the [year, month] format */
const getPrevMonth = (year: number, month: number) => {
    if (month == 0) {
        return [year - 1, 11] as const;
    }
    return [year, month - 1] as const;
};

/** Prevents an element to gain focus */
const preventFocus = (e: React.MouseEvent) => e.preventDefault();

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
            fluid,
            disabled,
            ...restProps
        } = props;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        /** View type */
        const [view, setView] = React.useState<"days" | "months" | "years">(
            "days"
        );
        /** Zero-based month in view. */
        const [month, setMonth] = React.useState(
            props.value
                ? new Date(props.value).getMonth()
                : new Date().getMonth()
        );
        /** Year in view */
        const [year, setYear] = React.useState(
            props.value
                ? new Date(props.value).getFullYear()
                : new Date().getFullYear()
        );
        /** Offset pages in the years view */
        const [yearsOffset, setYearsOffset] = React.useState(0);

        /** The days shown in the 'days' view. The number of days returned will always be a multiple of 7. The rest of the days are filled from the previous and next month's days */
        const daysOptions = React.useMemo(() => {
            const daysAmount = getDays(year, month);

            const [prevYear, prevMonth] = getPrevMonth(year, month);
            const prevDaysAmount = getDays(prevYear, prevMonth);
            const prevDaysShown = new Date(year, month).getDay();

            const [nextYear, nextMonth] = getNextMonth(year, month);
            const nextDaysShown = 7 - ((prevDaysShown + daysAmount) % 7);

            const options: {
                label: string;
                value: number;
                outOfMonth: boolean;
            }[] = [];

            // Previous days
            for (
                let i = prevDaysAmount - prevDaysShown + 1;
                i <= prevDaysAmount;
                ++i
            ) {
                options.push({
                    label: `${i}`,
                    value: new Date(prevYear, prevMonth, i).getTime(),
                    outOfMonth: true,
                });
            }

            // Current days
            for (let i = 1; i <= daysAmount; ++i) {
                options.push({
                    label: `${i}`,
                    value: new Date(year, month, i).getTime(),
                    outOfMonth: false,
                });
            }

            // Next days
            for (let i = 1; i <= nextDaysShown; ++i) {
                options.push({
                    label: `${i}`,
                    value: new Date(nextYear, nextMonth, i).getTime(),
                    outOfMonth: true,
                });
            }

            return options;
        }, [month, year]);

        /** All months of the year shown when in "months" view */
        const monthsOptions = React.useMemo(() => {
            const current = new Date(year, month);
            current.setHours(0, 0, 0, 0);

            const options: {
                label: string;
                value: number;
            }[] = [];

            for (let i = 0; i < 12; ++i) {
                current.setMonth(i, 1);
                options.push({ label: MONTHS[i], value: current.getTime() });
            }

            return options;
        }, [month, year]);

        /** All years options when in "years" view */
        const yearsOptions = React.useMemo(() => {
            const current = new Date(year, month);
            current.setHours(0, 0, 0, 0);

            // Offset the current year by the `yearsOffset` to display a different "page" of years
            const offsetedYear = year + YEARS_PER_PAGE * yearsOffset;

            const options: {
                label: string;
                value: number;
            }[] = [];

            for (let i = 0; i < YEARS_PER_PAGE; ++i) {
                current.setFullYear(
                    offsetedYear - Math.floor(YEARS_PER_PAGE / 2) + i,
                    0,
                    1
                );
                options.push({
                    label: current.getFullYear().toString(),
                    value: current.getTime(),
                });
            }

            return options;
        }, [month, year, yearsOffset]);

        const selectedDay = React.useMemo(() => {
            if (!props.value) return null;
            const date = new Date(props.value);
            date.setHours(0, 0, 0, 0);
            return date.getTime();
        }, [props.value]);

        const selectedMonth = React.useMemo(() => {
            if (!props.value) return null;
            const date = new Date(props.value);
            date.setHours(0, 0, 0, 0);
            date.setDate(1);
            return date.getTime();
        }, [props.value]);

        const selectedYear = React.useMemo(() => {
            if (!props.value) return null;
            const date = new Date(props.value);
            date.setHours(0, 0, 0, 0);
            date.setMonth(0, 1);
            return date.getTime();
        }, [props.value]);

        const inputValue = React.useMemo(() => {
            if (!selectedYear || !selectedMonth || !selectedDay) return "";

            const y = new Date(selectedYear).getFullYear();
            const m = new Date(selectedMonth).getMonth() + 1;
            const d = new Date(selectedDay).getDate();

            return `${y}/${m}/${d}`;
        }, [selectedDay, selectedMonth, selectedYear]);

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

        /** Fired when selecting a day from the calendar */
        const handleDaySelect = React.useCallback<HTMLButtonProps["onClick"]>(
            (e) => {
                if (onChange) {
                    const v = Number(e.currentTarget.value);
                    const { ofm } = e.currentTarget.dataset;
                    const outOfMonth = ofm == "true";
                    if (isNaN(v)) {
                        return nuiLog.error(
                            `DatePicker (handleDaySelect): ${e.currentTarget.value} is not a number`
                        );
                    }
                    onChange(v, e);

                    if (outOfMonth) {
                        const date = new Date(v);
                        setMonth(date.getMonth());
                        setYear(date.getFullYear());
                    }
                }
            },
            [onChange]
        );
        /** Fired when selecting a month from the calendar */
        const handleMonthSelect = React.useCallback<HTMLButtonProps["onClick"]>(
            (e) => {
                const v = Number(e.currentTarget.value);
                if (isNaN(v)) {
                    return nuiLog.error(
                        `DatePicker (handleMonthSelect): ${e.currentTarget.value} is not a number`
                    );
                }
                setMonth(new Date(v).getMonth());
                setView("days");
            },
            []
        );
        /** Fired when selecting a year from the calendar */
        const handleYearSelect = React.useCallback<HTMLButtonProps["onClick"]>(
            (e) => {
                const v = Number(e.currentTarget.value);
                if (isNaN(v)) {
                    return nuiLog.error(
                        `DatePicker (handleYearSelect): ${e.currentTarget.value} is not a number`
                    );
                }
                setYear(new Date(v).getFullYear());
                setView("months");
            },
            []
        );

        /** Switches to the months view */
        const handleMonthView = React.useCallback(() => {
            setView("months");
        }, []);
        /** Selects the next month */
        const handleNextMonth = React.useCallback(() => {
            const [nextYear, nextMonth] = getNextMonth(year, month);
            setYear(nextYear);
            setMonth(nextMonth);
        }, [month, year]);
        /** Selects the previous month */
        const handlePrevMonth = React.useCallback(() => {
            const [prevYear, prevMonth] = getPrevMonth(year, month);
            setYear(prevYear);
            setMonth(prevMonth);
        }, [month, year]);

        /** Switches to the years view */
        const handleYearView = React.useCallback(() => {
            setView("years");
        }, []);
        /** Selects the next year */
        const handleNextYear = React.useCallback(() => {
            const [nextYear] = getNextMonth(year, 11);
            setYear(nextYear);
        }, [year]);
        /** Selects the previous year */
        const handlePrevYear = React.useCallback(() => {
            const [prevYear] = getPrevMonth(year, 0);
            setYear(prevYear);
        }, [year]);

        /** Increments the years offset */
        const handleNextYearInterval = React.useCallback(() => {
            setYearsOffset((c) => c + 1);
        }, []);
        /** Decrements the years offset */
        const handlePrevYearInterval = React.useCallback(() => {
            setYearsOffset((c) => c - 1);
        }, []);

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
        const handleChange = React.useCallback<
            HTMLInputProps["onChange"]
        >(() => {
            nuiLog.warn("handleChange not implemented", { once: true });
        }, []);

        const handleBlur = React.useCallback<HTMLInputProps["onBlur"]>(
            (e) => {
                setFocused(false);
                setTouched(true);
                setView("days");

                // Reset to current or selected date
                if (selectedYear && selectedMonth) {
                    const y = new Date(selectedYear).getFullYear();
                    setYear(y);

                    const m = new Date(selectedMonth).getMonth();
                    setMonth(m);
                }

                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur, selectedMonth, selectedYear]
        );

        return (
            <StyledDatePicker
                disabled={disabled}
                focused={focused}
                touched={touched}
                errors={errors}
                size={size}
                fluid={fluid}
                prepend={prepend}
                append={append}
                label={label}
                variant={variant}
                className={classes}
            >
                <div className="NuiDatePicker__container">
                    <input
                        {...restProps}
                        name={name}
                        className="NuiDatePicker__input"
                        ref={ref}
                        value={inputValue}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                    />
                    <div
                        className="NuiDatePicker__popover"
                        onMouseDown={preventFocus}
                    >
                        <div className="NuiDatePicker__calendar">
                            <div className="NuiDatePicker__calendar__header">
                                {view == "days" && (
                                    <div className="NuiDatePicker__calendar__header__month">
                                        <div className="NuiDatePicker__arrow-container">
                                            <button
                                                tabIndex={-1}
                                                onClick={handlePrevMonth}
                                                type="button"
                                                className="NuiDatePicker__arrow NuiDatePicker__arrow--left"
                                            />
                                        </div>
                                        <div className="NuiDatePicker__calendar__month__label-container">
                                            <button
                                                onClick={handleMonthView}
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__calendar__header__month__label"
                                                children={MONTHS[month]}
                                            />
                                        </div>
                                        <div className="NuiDatePicker__arrow-container">
                                            <button
                                                onClick={handleNextMonth}
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__arrow NuiDatePicker__arrow--right"
                                            />
                                        </div>
                                    </div>
                                )}
                                {view != "years" && (
                                    <div className="NuiDatePicker__calendar__header__year">
                                        <div className="NuiDatePicker__arrow-container">
                                            <button
                                                onClick={handlePrevYear}
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__arrow NuiDatePicker__arrow--left"
                                            />
                                        </div>
                                        <div className="NuiDatePicker__calendar__year__label-container">
                                            <button
                                                onClick={handleYearView}
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__calendar__header__year__label"
                                                children={year}
                                            />
                                        </div>
                                        <div className="NuiDatePicker__arrow-container">
                                            <button
                                                onClick={handleNextYear}
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__arrow NuiDatePicker__arrow--right"
                                            />
                                        </div>
                                    </div>
                                )}

                                {view == "years" && (
                                    <div className="NuiDatePicker__calendar__header__yearInterval">
                                        <div className="NuiDatePicker__arrow-container">
                                            <button
                                                onClick={handlePrevYearInterval}
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__arrow NuiDatePicker__arrow--left"
                                            />
                                        </div>
                                        <div className="NuiDatePicker__calendar__yearInterval__label-container">
                                            <button
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__calendar__header__yearInterval__label"
                                                children={`${
                                                    _.first(yearsOptions)?.label
                                                } - ${
                                                    _.last(yearsOptions)?.label
                                                }`}
                                            />
                                        </div>
                                        <div className="NuiDatePicker__arrow-container">
                                            <button
                                                onClick={handleNextYearInterval}
                                                tabIndex={-1}
                                                type="button"
                                                className="NuiDatePicker__arrow NuiDatePicker__arrow--right"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="NuiDatePicker__calendar__sep" />

                            {view == "days" && (
                                <div className="NuiDatePicker__calendar__view--days">
                                    <div className="NuiDatePicker__calendar__weekdays">
                                        {_.map(WEEKDAYS, (wd) => (
                                            <div
                                                key={wd}
                                                children={wd}
                                                className="NuiDatePicker__calendar__weekday"
                                            />
                                        ))}
                                    </div>
                                    <div className="NuiDatePicker__calendar__days">
                                        {_.map(daysOptions, (day) => (
                                            <button
                                                key={day.value}
                                                type="button"
                                                children={day.label}
                                                value={day.value}
                                                data-ofm={day.outOfMonth}
                                                tabIndex={-1}
                                                onClick={handleDaySelect}
                                                className={clsx([
                                                    "NuiDatePicker__calendar__days__day",
                                                    day.outOfMonth &&
                                                        "NuiDatePicker__calendar__days__day--outOfMonth",
                                                    day.value == selectedDay &&
                                                        "NuiDatePicker__calendar__days__day--selected",
                                                ])}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {view == "months" && (
                                <div className="NuiDatePicker__calendar__view--months">
                                    <div className="NuiDatePicker__calendar__months">
                                        {_.map(monthsOptions, (m) => (
                                            <button
                                                key={m.value}
                                                type="button"
                                                children={m.label}
                                                value={m.value}
                                                tabIndex={-1}
                                                onClick={handleMonthSelect}
                                                className={clsx([
                                                    "NuiDatePicker__calendar__months__month",
                                                    selectedMonth == m.value &&
                                                        "NuiDatePicker__calendar__months__month--selected",
                                                ])}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {view == "years" && (
                                <div className="NuiDatePicker__calendar__view--years">
                                    <div className="NuiDatePicker__calendar__years">
                                        {_.map(yearsOptions, (y) => (
                                            <button
                                                key={y.value}
                                                type="button"
                                                children={y.label}
                                                value={y.value}
                                                tabIndex={-1}
                                                onClick={handleYearSelect}
                                                className={clsx([
                                                    "NuiDatePicker__calendar__years__year",
                                                    selectedYear == y.value &&
                                                        "NuiDatePicker__calendar__years__year--selected",
                                                ])}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="NuiDatePicker__clock" />
                    </div>
                </div>
            </StyledDatePicker>
        );
    })
);

const StyledDatePicker = styled(InputContainer)`
    ${context}

    & .NuiDatePicker__popover {
        ${background.primary}
        ${shadow.primary}
        ${border.primary}
        ${text.primary}

        border-radius: 0 0 4px 4px;
        border-style: solid;
        border-top-width: 0;
        border-width: 1px;
        box-shadow: 0 2px 3px -1px var(--nui-shadow), 0 1px 1px -1px var(--nui-shadow);
        box-sizing: border-box;
        left: 0;
        min-width: 250px;
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

    & .NuiDatePicker__calendar__header {
        display: flex;
        flex-direction: column;
    }

    & .NuiDatePicker__calendar__header__month,
    & .NuiDatePicker__calendar__header__year,
    & .NuiDatePicker__calendar__header__yearInterval {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    & .NuiDatePicker__calendar__header__month__label,
    & .NuiDatePicker__calendar__header__year__label,
    & .NuiDatePicker__calendar__header__yearInterval__label {
        background: transparent;
        outline: none;
        border: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
    }

    & .NuiDatePicker__calendar__header__yearInterval__label {
        cursor: default;
    }

    & .NuiDatePicker__arrow-container,
    & .NuiDatePicker__calendar__month__label-container,
    & .NuiDatePicker__calendar__year__label-container,
    & .NuiDatePicker__calendar__yearInterval__label-container {
        padding: 5px;
        border-radius: 3px;
        transition: background-color 0.2s;

        &:hover:not(.NuiDatePicker__calendar__yearInterval__label-container) {
            ${background.secondary}
        }
        &:active:not(.NuiDatePicker__calendar__yearInterval__label-container) {
            ${background.dimmed}
        }
    }

    & .NuiDatePicker__calendar__month__label-container,
    & .NuiDatePicker__calendar__year__label-container,
    & .NuiDatePicker__calendar__yearInterval__label-container {
        padding: 2px;
    }

    & .NuiDatePicker__arrow {
        ${border.primary}

        box-sizing: border-box;
        display: block;
        background: transparent;
        border-style: solid;
        border-width: 0;
        border-bottom-width: 2px;
        border-right-width: 2px;
        width: 7px;
        height: 7px;
        padding: 0;
        margin: 0;
        cursor: pointer;

        &.NuiDatePicker__arrow--left {
            transform: rotate(130deg);
        }
        &.NuiDatePicker__arrow--right {
            transform: rotate(-45deg);
        }
    }

    & .NuiDatePicker__calendar__sep {
        ${border.secondary}

        border-width: 0;
        border-bottom-width: 1px;
        border-style: solid;
        margin: 2px 0;
    }

    & .NuiDatePicker__calendar__weekdays {
        ${text.secondary}

        display: flex;
        justify-content: space-between;
    }

    & .NuiDatePicker__calendar__weekday {
        width: 100%;
        text-align: center;
    }

    & .NuiDatePicker__calendar {
        padding: 10px;
    }

    & .NuiDatePicker__calendar__days,
    & .NuiDatePicker__calendar__months,
    & .NuiDatePicker__calendar__years {
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }

    & .NuiDatePicker__calendar__days__day,
    & .NuiDatePicker__calendar__months__month,
    & .NuiDatePicker__calendar__years__year {
        ${background.primary}

        box-sizing: border-box;
        outline: none;
        border: none;
        padding: 5px 0;
        cursor: pointer;
        transition: background-color 0.2s;
        border-radius: 3px;

        &:hover {
            ${background.secondary}
        }
        &:active {
            ${background.dimmed}

            &.NuiDatePicker__calendar__days__day--selected,
            &.NuiDatePicker__calendar__months__month--selected,
            &.NuiDatePicker__calendar__years__year--selected {
                background-color: var(--nui-context-primaryDark);
            }
        }

        &.NuiDatePicker__calendar__days__day--outOfMonth {
            opacity: 0.6;
        }

        &.NuiDatePicker__calendar__days__day--selected,
        &.NuiDatePicker__calendar__months__month--selected,
        &.NuiDatePicker__calendar__years__year--selected {
            ${text.contrast}

            background-color: var(--nui-context-primary);
            font-weight: 600;
        }
    }

    & .NuiDatePicker__calendar__days__day {
        flex: 1 0 calc(100% / 7);
    }

    & .NuiDatePicker__calendar__months__month {
        flex: 1 0 calc(100% / 3);
    }

    & .NuiDatePicker__calendar__years__year {
        flex: 1 0 calc(100% / ${Math.sqrt(YEARS_PER_PAGE)});
    }

    &.NuiDatePicker--focused {
        & .NuiDatePicker__popover {
            opacity: 1;
            transform: scaleY(1);
            pointer-events: all;
        }
    }
`;

StyledDatePicker.displayName = createComponentName("StyledDatePicker");
DatePicker.displayName = createComponentName("DatePicker");

export default DatePicker;
