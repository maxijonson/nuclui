import { StrictOmit } from "ts-essentials";
import { InputContainerPropsWithBase } from "../InputContainer/types";

export interface CycleSelectProps {
    children?: never;
    type?: "text";

    /**
     * Forwarded ref to the inner input element of the `CycleSelect` component.
     *
     * Note: `ref.current.value` points to the value displayed to the user (label), **not** the actual `value` of the option from the `options` array.
     */
    ref?: React.ForwardedRef<HTMLInputElement>;

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

    /**
     * Called when the next button is clicked
     */
    onNext?: (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;

    /**
     * Called when the previous button is clicked
     */
    onPrevious?: (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

/**
 * Selects a value by cycling through a defined array of options
 */
export type NuiCycleSelect = Nui.FRCWC<
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        CycleSelectProps,
    "input"
>;
