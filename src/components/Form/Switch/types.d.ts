import { StrictOmit } from "ts-essentials";
import { CheckboxContainerPropsWithBase } from "../CheckboxContainer/types";
import { HTMLInputProps } from "../InputContainer/types";

export interface SwitchProps {
    children?: never;

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: boolean,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * Text inside the switch when the toggle is on
     */
    onChildren?: React.ReactNode;

    /**
     * Text inside the switch when the toggle is off
     */
    offChildren?: React.ReactNode;

    /**
     * The size of the switch
     *
     * @default "sm"
     */
    size?: Nui.Breakpoint;
}

/**
 * Similar to `Checkbox`, but in the form of a switch (aka toggle)
 */
export type NuiSwitch = Nui.FRCWC<
    StrictOmit<CheckboxContainerPropsWithBase, "focused" | "touched"> &
        SwitchProps,
    "input"
>;
