import { StrictOmit } from "ts-essentials";
import { InputContainerProps } from "../InputContainer/types";

export interface DatePickerProps {
    children?: never;
    type?: "text";

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
    StrictOmit<InputContainerProps, "focused" | "touched"> & DatePickerProps,
    "input"
>;
