import { StrictOmit } from "ts-essentials";
import { InputContainerProps } from "../InputContainer/types";

export interface CycleSelectProps {
    children?: never;
    type?: "text";

    /**
     * The options to cycle through
     */
    options?: { label: string; value: string }[];

    /**
     * The current selected value
     */
    value?: string;

    /**
     * Called when the value changes. The second parameter is either the MouseEvent (when clicking on the buttons) or a KeyboardEvent (when using the keyboard to select the value)
     */
    onChange?: (
        v: string,
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

/**
 * Selects a value by cycling through a defined array of options
 */
export type NuiCycleSelect = Nui.FRCWC<
    StrictOmit<InputContainerProps, "focused" | "touched"> & CycleSelectProps,
    "input"
>;
