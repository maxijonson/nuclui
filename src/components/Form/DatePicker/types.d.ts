import { StrictOmit } from "ts-essentials";
import { InputContainerPropsWithBase } from "../InputContainer/types";

export interface DatePickerProps {
    children?: never;

    /**
     * The type of the DatePicker.
     *
     * - `date` for date-only selection
     * - `time` for time-only selection
     * - `datetime` for both date and time selection
     *
     * Note: In order to produce a valid date number:
     * - When using `date`, the time is the one provided by the `value` prop or the current time if none is initially specified.
     * - When using `time`, the date is the one provided by the `value` prop or the current date if none is initially specified.
     *
     * @default "date"
     */
    type?: "datetime" | "date" | "time";

    /**
     * The current date
     */
    value?: number;

    /**
     * Fired when the date is changed. The event passed as second parameter is the MouseEvent of the clicked button
     */
    onChange?: (
        v: number,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

/**
 * A date input to pick a date
 */
export type NuiDatePicker = Nui.FRCWC<
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        DatePickerProps,
    "input"
>;
