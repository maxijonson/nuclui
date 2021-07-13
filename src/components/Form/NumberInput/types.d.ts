import { StrictOmit } from "ts-essentials";
import {
    InputContainerPropsWithBase,
    HTMLInputProps,
} from "../InputContainer/types";

interface NumberInputProps {
    children?: never;
    type?: "number";

    /**
     * Value of the input
     */
    value?: number;

    /**
     * The defaultValue (or initial value) of the input. Used for uncontrolled inputs.
     */
    defaultValue?: number;

    /**
     * To replicate a native number input as much as possible, it's possible to empty the input by deleting its contents.
     * When it is empty, the `NaN` value is used (and also given to the `onChange` handler).
     * Under `strict` mode, the input guarantees it won't use `NaN` **ever**. It will use `0` instead.
     *
     * @default false
     */
    strict?: boolean;

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event.
     *
     * Note: the event is optionnal, because it will not be given when the user updates the number from the arrow buttons
     */
    onChange?: (
        v: number,
        e?: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * The minimum value allowed
     *
     * Note: this does not prevent the user from writing a lower value, but their browser will prevent submits. This prop is the equivalent of the native "min" prop on the input.
     */
    min?: number;

    /**
     * The maximum value allowed
     *
     * Note: this does not prevent the user from writing a higher value, but their browser will prevent submits. This prop is the equivalent of the native "max" prop on the input.
     */
    max?: number;

    /**
     * The step amount when using the arrows to change the value
     */
    step?: number;
}

/**
 * A number input for entering string data
 */
export type NuiNumberInput = Nui.FRCWC<
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        NumberInputProps,
    "input"
>;
