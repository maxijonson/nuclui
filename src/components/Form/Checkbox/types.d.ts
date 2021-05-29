import { StrictOmit } from "ts-essentials";
import { CheckboxContainerPropsWithBase } from "../CheckboxContainer/types";
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

    /**
     * Checked state of the checkbox input.
     *
     * Note: For convenience with `useForm`, this is actually the `checked` prop of the input. Use `inputValue` to set the actual `input` prop of the input.
     */
    value?: boolean;

    /**
     * The prop that will be assigned to the actual input element `value` prop
     */
    inputValue?: HTMLInputProps["value"];
}

/**
 * A form checkbox control for a boolean value
 */
export type NuiCheckbox = Nui.FRCWC<
    StrictOmit<CheckboxContainerPropsWithBase, "focused" | "touched"> &
        CheckboxProps,
    "input"
>;
