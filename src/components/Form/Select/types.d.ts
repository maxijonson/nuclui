import { StrictOmit } from "ts-essentials";
import { HTMLInputProps, InputContainerProps } from "../InputContainer/types";

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps {
    children?: never;

    options: SelectOption[];

    /**
     * The selected option value
     */
    value?: string;

    /**
     * Gets called when an option is selected. The first parameter is the `option.value` string, while the second parameter is the click MouseEvent or KeyDown event.
     *
     * Note: this prop is called `onChange` for convenience with `useForm`. However, this corresponds to an `onClick` OR an `onKeyDown` event.
     */
    onChange?: (
        v: string,
        e:
            | Parameters<HTMLOptionProps["onClick"]>[0]
            | Parameters<HTMLInputProps["onKeyDown"]>[0]
    ) => void;
}

export type NuiSelect = Nui.FRCWC<
    SelectProps & StrictOmit<InputContainerProps, "focused" | "touched">,
    "input"
>;

export type HTMLOptionProps = Required<
    React.OptionHTMLAttributes<HTMLOptionElement>
>;
