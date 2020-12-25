import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { createComponentName } from "@utils";
import { background, text } from "@theme";
import { CalendarDay, CalendarProps, NuiCalendar } from "./types";

const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

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

const Calendar: NuiCalendar = React.forwardRef((props, ref) => {
    const [defaultMonth, defaultYear] = React.useMemo(() => {
        const date = new Date();

        return [date.getMonth(), date.getFullYear()] as const;
    }, []);

    const {
        className,
        year = defaultYear,
        month = defaultMonth,
        renderDay,
        ...restProps
    } = props;

    const classes = React.useMemo(() => clsx(["NuiCalendar", className]), [
        className,
    ]);

    const days = React.useMemo(() => {
        const daysAmount = getDays(year, month);

        const [prevYear, prevMonth] = getPrevMonth(year, month);
        const prevDaysAmount = getDays(prevYear, prevMonth);
        const prevDaysShown = new Date(year, month).getDay();

        const [nextYear, nextMonth] = getNextMonth(year, month);
        const nextDaysShown = 7 - ((prevDaysShown + daysAmount) % 7);

        const options: CalendarDay[] = [];

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

    const dayRenderer: CalendarProps["renderDay"] = React.useMemo(() => {
        if (renderDay) return renderDay;

        return (day) => day.label;
    }, [renderDay]);

    return (
        <div className={classes} ref={ref} {...restProps}>
            <div className="NuiCalendar__weekdays">
                {_.map(WEEKDAYS, (wd) => (
                    <div
                        key={wd}
                        children={wd}
                        className="NuiCalendar__weekday"
                    />
                ))}
            </div>
            <div className="NuiCalendar__days">
                {_.map(days, (day) => (
                    <div
                        key={day.value}
                        className={clsx([
                            "NuiCalendar__day",
                            day.outOfMonth && "NuiCalendar__day--out-of-month",
                        ])}
                    >
                        {dayRenderer(day)}
                    </div>
                ))}
            </div>
        </div>
    );
});

const StyledCalendar = styled(Calendar)`
    & .NuiCalendar__weekdays {
        ${text.secondary}

        padding: 0 5px;
        display: flex;
        justify-content: space-between;
    }

    & .NuiCalendar__weekday {
        width: 100%;
        text-align: center;
    }

    & .NuiCalendar__days {
        padding: 0 5px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }

    & .NuiCalendar__day {
        ${background.primary}

        flex: 1 0 calc(100% / 7);
        text-align: center;
        box-sizing: border-box;
        padding: 5px 0;
    }

    & .NuiCalendar__day--out-of-month {
        opacity: 0.6;
    }
`;

Calendar.displayName = createComponentName("Calendar");
StyledCalendar.displayName = createComponentName("StyledCalendar");

export default StyledCalendar as typeof Calendar;
