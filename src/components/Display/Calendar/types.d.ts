export interface CalendarProps {
    /**
     * The year displayed
     */
    year?: number;

    /**
     * The month of the `year` displayed.
     *
     * This number is zero-based (January is `0` and December is `11`)
     */
    month?: number;

    /**
     * Custom day renderer for the days in the calendar.
     */
    renderDay?: (day: CalendarDay) => React.ReactNode;
}

export interface CalendarDay {
    /**
     * The number of the day in string
     */
    label: string;

    /**
     * The UNIX epoch timestamp of the day
     */
    value: number;

    /**
     * Wether or not this day is out of the current month's scope
     */
    outOfMonth: boolean;

    /**
     * The day's year
     */
    year: number;

    /**
     * The day's month
     */
    month: number;

    /**
     * The day in number
     */
    day: number;
}

/**
 * Displays the days of a month of a year in a calendar format.
 */
export type NuiCalendar = Nui.FRCWC<CalendarProps, "div">;
