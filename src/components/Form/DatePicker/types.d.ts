import { StrictOmit } from "ts-essentials";
import { InputContainerProps, HTMLInputProps } from "../InputContainer/types";

export interface DatePickerProps {
    children?: never;
    type?: "text";

    /**
     * The current date
     */
    value?: number;

    /**
     * Fired when the date is changed.
     */
    onChange?: (
        v: number,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;
}

/**
 * A date input to pick a date
 */
export type NuiDatePicker = Nui.FRCWC<
    StrictOmit<InputContainerProps, "focused" | "touched"> & DatePickerProps,
    "input"
>;
