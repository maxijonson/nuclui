import { StrictOmit } from "ts-essentials";
import { CheckboxContainerProps } from "../CheckboxContainer/types";
import { HTMLInputProps } from "../InputContainer/types";

export interface CheckboxProps {
    children?: never;

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: boolean,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;
}

/**
 * A form checkbox control for a boolean value
 */
export type NuiCheckbox = Nui.FRCWC<
    StrictOmit<CheckboxContainerProps, "focused" | "touched"> & CheckboxProps,
    "input"
>;
