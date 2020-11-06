import { StrictOmit } from "ts-essentials";
import { InputContainerProps, HTMLInputProps } from "../InputContainer/types";

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps {
    children?: never;

    options?: SelectOption[];

    /**
     * The selected option value
     */
    value?: string;

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: string,
        e?: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;
}

export type NuiSelect = Nui.FRCWC<
    SelectProps & StrictOmit<InputContainerProps, "focused" | "touched">,
    "input"
>;
