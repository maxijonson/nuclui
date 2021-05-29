import { StrictOmit } from "ts-essentials";
import { CheckboxContainerPropsWithBase } from "../CheckboxContainer/types";
import { HTMLInputProps } from "../InputContainer/types";

export interface RadioButtonProps {
    children?: never;

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: string,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * The unique value associated with the RadioButton.
     *
     * Note: unlike the `Checkbox` component, this represents the actual `value` of the underlying input, **not** the `checked` prop. If `RadioButton` is used without `RadioGroup`, then the `checked` prop should be specified. It is recommended to wrap `RadioButton`s in a `RadioGroup` to handle this behaviour automatically.
     */
    value?: string;
}

/**
 * A form radio control for selecting a value
 */
export type NuiRadioButton = Nui.FRCWC<
    StrictOmit<CheckboxContainerPropsWithBase, "focused" | "touched"> &
        RadioButtonProps,
    "input"
>;
