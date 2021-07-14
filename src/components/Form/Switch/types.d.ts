import { StrictOmit } from "ts-essentials";
import { CheckboxContainerPropsWithBase } from "../CheckboxContainer/types";
import { HTMLInputProps } from "../InputContainer/types";

export interface SwitchProps {
    children?: never;

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event if it was triggered from the input itself.
     */
    onChange?: (
        v: boolean,
        e?: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * Checked state of the checkbox input.
     *
     * Note: For convenience with `useForm`, this is actually the `checked` prop of the input. Use `inputValue` to set the actual `input` prop of the input.
     */
    value?: boolean;

    /**
     * The defaultChecked (or initial value) of the input. Used for uncontrolled inputs.
     */
    defaultChecked?: boolean;

    /**
     * The prop that will be assigned to the actual input element `value` prop
     */
    inputValue?: HTMLInputProps["value"];

    /**
     * Text inside the switch when the toggle is on
     */
    onChildren?: React.ReactNode;

    /**
     * Text inside the switch when the toggle is off
     */
    offChildren?: React.ReactNode;
}

/**
 * Similar to `Checkbox`, but in the form of a switch (aka toggle)
 */
export type NuiSwitch = Nui.FRCWC<
    StrictOmit<CheckboxContainerPropsWithBase, "focused" | "touched"> &
        SwitchProps,
    "input"
>;
