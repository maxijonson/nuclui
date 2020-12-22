import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { createComponentName, nuiLog, isBetween } from "@utils";
import { background, border, context, shadow, text } from "@theme";
import { InputContainer } from "../InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiDatePicker } from "./types";
import { HTMLButtonProps } from "../Select/types";
import { CycleSelect } from "../CycleSelect";

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
const DAY_MS = 86400000;

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
        const [view, setView] = React.useState<
            "days" | "months" | "years" | "time"
        >("days");

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

        const selectedDay = React.useMemo(() => {
            if (props.value == null) return null;
            const date = new Date(props.value);
            date.setHours(0, 0, 0, 0);
            return date.getTime();
        }, [props.value]);

        const selectedMonth = React.useMemo(() => {
            if (props.value == null) return null;
            const date = new Date(props.value);
            date.setHours(0, 0, 0, 0);
            date.setDate(1);
            return date.getTime();
        }, [props.value]);

        const selectedYear = React.useMemo(() => {
            if (props.value == null) return null;
            const date = new Date(props.value);
            date.setHours(0, 0, 0, 0);
            date.setMonth(0, 1);
            return date.getTime();
        }, [props.value]);

        const selectedHour = React.useMemo(() => {
            if (props.value == null) return null;
            return new Date(props.value).getHours();
        }, [props.value]);

        const selectedMinute = React.useMemo(() => {
            if (props.value == null) return null;
            return new Date(props.value).getMinutes();
        }, [props.value]);

        const selectedSecond = React.useMemo(() => {
            if (props.value == null) return null;
            return new Date(props.value).getSeconds();
        }, [props.value]);

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
            const date = new Date(prevYear, prevMonth, 1);
            for (
                let i = prevDaysAmount - prevDaysShown + 1;
                i <= prevDaysAmount;
                ++i
            ) {
                date.setDate(i);
                options.push({
                    label: `${i}`,
                    value: date.getTime(),
                    outOfMonth: true,
                });
            }

            // Current days
            date.setFullYear(year);
            date.setMonth(month);
            for (let i = 1; i <= daysAmount; ++i) {
                date.setDate(i);
                options.push({
                    label: `${i}`,
                    value: date.getTime(),
                    outOfMonth: false,
                });
            }

            // Next days
            date.setFullYear(nextYear);
            date.setMonth(nextMonth);
            for (let i = 1; i <= nextDaysShown; ++i) {
                date.setDate(i);
                options.push({
                    label: `${i}`,
                    value: date.getTime(),
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

        const dateStr = React.useMemo(() => {
            if (
                selectedYear == null ||
                selectedMonth == null ||
                selectedDay == null
            ) {
                return "";
            }

            const y = _.padStart(
                `${new Date(selectedYear).getFullYear()}`,
                4,
                "0"
            );
            const m = _.padStart(
                `${new Date(selectedMonth).getMonth() + 1}`,
                2,
                "0"
            );
            const d = _.padStart(`${new Date(selectedDay).getDate()}`, 2, "0");

            return `${y}/${m}/${d}`;
        }, [selectedDay, selectedMonth, selectedYear]);

        const timeStr = React.useMemo(() => {
            if (
                selectedHour == null ||
                selectedMinute == null ||
                selectedSecond == null
            ) {
                return "";
            }

            const h = _.padStart(`${selectedHour}`, 2, "0");
            const m = _.padStart(`${selectedMinute}`, 2, "0");
            const s = _.padStart(`${selectedSecond}`, 2, "0");

            return `${h}:${m}:${s}`;
        }, [selectedHour, selectedMinute, selectedSecond]);

        const inputValue = React.useMemo(() => {
            if (!dateStr || !timeStr) {
                return "";
            }

            return `${dateStr} ${timeStr}`;
        }, [dateStr, timeStr]);

        const timeToggleText = React.useMemo(() => {
            if (!dateStr || !timeStr) {
                return view == "time" ? "Calendar" : "Clock";
            }

            return view == "time" ? dateStr : timeStr;
        }, [dateStr, timeStr, view]);

        const errors = React.useMemo(() => props.errors || [], [props.errors]);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiDatePicker",
                    focused && "NuiDatePicker--focused",
                    [
                        view != "time" && "NuiDatePicker--view-calendar",
                        view != "time" && "NuiDatePicker--view-time",
                    ],
                    className,
                ]),
            [className, focused, view]
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

                    const date = new Date(v);
                    date.setHours(
                        selectedHour ?? 0,
                        selectedMinute ?? 0,
                        selectedSecond ?? 0
                    );
                    onChange(date.getTime(), e);

                    if (outOfMonth) {
                        setMonth(date.getMonth());
                        setYear(date.getFullYear());
                    }
                }
            },
            [onChange, selectedHour, selectedMinute, selectedSecond]
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
                setYearsOffset(0);
            },
            []
        );

        /** Fired when selecting an hour from the clock */
        const handleHourSelect = React.useCallback<HTMLButtonProps["onClick"]>(
            (e) => {
                const v = Number(e.currentTarget.value);

                if (isNaN(v)) {
                    return nuiLog.error(
                        `DatePicker (handleHourSelect): ${e.currentTarget.value} is not a number`
                    );
                }

                const date = props.value ? new Date(props.value) : new Date();
                date.setHours(v);

                if (onChange) {
                    onChange(date.getTime(), e);
                }
            },
            [onChange, props.value]
        );

        /** Fired when selecting a minute from the clock */
        const handleMinuteSelect = React.useCallback<
            HTMLButtonProps["onClick"]
        >(
            (e) => {
                const v = Number(e.currentTarget.value);

                if (isNaN(v)) {
                    return nuiLog.error(
                        `DatePicker (handleMinuteSelect): ${e.currentTarget.value} is not a number`
                    );
                }

                const date = props.value ? new Date(props.value) : new Date();
                date.setMinutes(v);

                if (onChange) {
                    onChange(date.getTime(), e);
                }
            },
            [onChange, props.value]
        );

        /** Fired when selecting a second from the clock */
        const handleSecondSelect = React.useCallback<
            HTMLButtonProps["onClick"]
        >(
            (e) => {
                const v = Number(e.currentTarget.value);

                if (isNaN(v)) {
                    return nuiLog.error(
                        `DatePicker (handleSecondSelect): ${e.currentTarget.value} is not a number`
                    );
                }

                const date = props.value ? new Date(props.value) : new Date();
                date.setSeconds(v);

                if (onChange) {
                    onChange(date.getTime(), e);
                }
            },
            [onChange, props.value]
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

        /** Toggles between the calendar view and the time view */
        const handleToggleTimeView = React.useCallback(() => {
            setView((v) => (v != "time" ? "time" : "days"));
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
                        {view != "time" && (
                            <div className="NuiDatePicker__calendar">
                                <div className="NuiDatePicker__calendar__header">
                                    {view == "days" && (
                                        <CycleSelect
                                            className="NuiDatePicker__calendar__header__month"
                                            fluid
                                            value={MONTHS[month]}
                                            variant="none"
                                            onPrevious={handlePrevMonth}
                                            onNext={handleNextMonth}
                                            onClick={handleMonthView}
                                            tabIndex={-1}
                                        />
                                    )}
                                    {view != "years" && (
                                        <CycleSelect
                                            className="NuiDatePicker__calendar__header__year"
                                            fluid
                                            value={year.toString()}
                                            variant="none"
                                            onPrevious={handlePrevYear}
                                            onNext={handleNextYear}
                                            onClick={handleYearView}
                                            size={view == "days" ? "xs" : "sm"}
                                            tabIndex={-1}
                                        />
                                    )}
                                    {view == "years" && (
                                        <CycleSelect
                                            className="NuiDatePicker__calendar__header__yearInterval"
                                            fluid
                                            value={`${
                                                _.first(yearsOptions)?.label
                                            } - ${_.last(yearsOptions)?.label}`}
                                            variant="none"
                                            onPrevious={handlePrevYearInterval}
                                            onNext={handleNextYearInterval}
                                            tabIndex={-1}
                                        />
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
                                                        props.value &&
                                                            isBetween(
                                                                props.value,
                                                                day.value - 1,
                                                                day.value +
                                                                    DAY_MS
                                                            ) &&
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
                                                        selectedMonth ==
                                                            m.value &&
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
                                                        selectedYear ==
                                                            y.value &&
                                                            "NuiDatePicker__calendar__years__year--selected",
                                                    ])}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleToggleTimeView}
                            className="NuiDatePicker__time-toggle"
                        >
                            {timeToggleText}
                        </button>
                        {view == "time" && (
                            <div className="NuiDatePicker__clock">
                                <div className="NuiDatePicker__dials">
                                    <div className="NuiDatePicker__dial">
                                        {_.times(24, (hour) => (
                                            <button
                                                key={hour}
                                                type="button"
                                                children={hour}
                                                value={hour}
                                                tabIndex={-1}
                                                onClick={handleHourSelect}
                                                className={clsx([
                                                    "NuiDatePicker__dial__hour",
                                                    selectedHour == hour &&
                                                        "NuiDatePicker__dial__hour--selected",
                                                ])}
                                            />
                                        ))}
                                    </div>
                                    <div className="NuiDatePicker__dial">
                                        {_.times(60, (minute) => (
                                            <button
                                                key={minute}
                                                type="button"
                                                children={minute}
                                                value={minute}
                                                tabIndex={-1}
                                                onClick={handleMinuteSelect}
                                                className={clsx([
                                                    "NuiDatePicker__dial__minute",
                                                    selectedMinute == minute &&
                                                        "NuiDatePicker__dial__minute--selected",
                                                ])}
                                            />
                                        ))}
                                    </div>
                                    <div className="NuiDatePicker__dial">
                                        {_.times(60, (second) => (
                                            <button
                                                key={second}
                                                type="button"
                                                children={second}
                                                value={second}
                                                tabIndex={-1}
                                                onClick={handleSecondSelect}
                                                className={clsx([
                                                    "NuiDatePicker__dial__second",
                                                    selectedSecond == second &&
                                                        "NuiDatePicker__dial__second--selected",
                                                ])}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </StyledDatePicker>
        );
    })
);

const StyledDatePicker = styled(InputContainer)`
    ${context}

    & .NuiDatePicker__container {
        width: 100%;
    }

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
        overflow: hidden;
        position: absolute;
        right: 0;
        top: calc(100% + 1px);
        transform-origin: top center;
        pointer-events: none;
        opacity: 0;
        transform: scaleY(0);
        transition: opacity 0.2s, transform 0.2s;
        z-index: 10;
    }

    & .NuiDatePicker__calendar__header {
        display: flex;
        flex-direction: column;
    }

    & .NuiCycleSelect {
        margin: 0;
    }

    & .NuiCycleSelect:not(.NuiDatePicker__calendar__header__yearInterval) .NuiCycleSelect__input {
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            ${background.secondary}
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

    & .NuiDatePicker__calendar__view--days,
    & .NuiDatePicker__calendar__months,
    & .NuiDatePicker__calendar__years {
        padding: 0 5px;
    }

    & .NuiDatePicker__calendar__days,
    & .NuiDatePicker__calendar__months,
    & .NuiDatePicker__calendar__years {
        position: relative;
        display: flex;
        flex-wrap: wrap;
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

    & .NuiDatePicker__time-toggle {
        width: 100%;
        border: none;
        margin: none;
        outline: none;
        background-color: transparent;
        transition: background-color 0.2s;
        cursor: pointer;

        &:hover {
            ${background.secondary}
        }
        &:active {
            ${background.dimmed}
        }
    }

    & .NuiDatePicker__clock {
        transform-origin: top center;
    }

    & .NuiDatePicker__dials {
        display: flex;
        justify-content: space-between;
    }

    & .NuiDatePicker__dial {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: center;
        max-height: 200px;
        overflow-y: auto;
    }

    & .NuiDatePicker__calendar__days__day,
    & .NuiDatePicker__calendar__months__month,
    & .NuiDatePicker__calendar__years__year,
    & .NuiDatePicker__dial__hour,
    & .NuiDatePicker__dial__minute,
    & .NuiDatePicker__dial__second {
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
            &.NuiDatePicker__calendar__years__year--selected,
            &.NuiDatePicker__dial__hour--selected,
            &.NuiDatePicker__dial__minute--selected,
            &.NuiDatePicker__dial__second--selected {
                background-color: var(--nui-context-primaryDark);
            }
        }

        &.NuiDatePicker__calendar__days__day--outOfMonth {
            opacity: 0.6;
        }

        &.NuiDatePicker__calendar__days__day--selected,
        &.NuiDatePicker__calendar__months__month--selected,
        &.NuiDatePicker__calendar__years__year--selected,
        &.NuiDatePicker__dial__hour--selected,
        &.NuiDatePicker__dial__minute--selected,
        &.NuiDatePicker__dial__second--selected {
            ${text.contrast}

            background-color: var(--nui-context-primary);
            font-weight: 600;
        }
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
