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
            | Parameters<HTMLButtonProps["onClick"]>[0]
            | Parameters<HTMLInputProps["onKeyDown"]>[0]
    ) => void;

    /**
     * Render prop used when rendering an option from the options list
     *
     * @param option the option being rendered
     * @param index the index of the option in the filtered options
     * @param options the options passed in `props.options` filtered by the search query (if any)
     */
    renderOption?: (
        option: SelectOption,
        index: number,
        options: SelectOption[]
    ) => JSX.Element;

    /**
     * Whether or not the user can create options. The label and value takes the exact value entered (as a string). The behaviour can be customized with `onCreate`
     *
     * @default false
     */
    creatable?: boolean;

    /**
     * Called when attempting to create a new option. Given the string entered by the user, you can
     *
     * 1. Return nothing - the value and label is taken as is
     * 2. Return a boolean - false prevents the option creation while true creates the options as is
     * 3. Return a SelectOption - creates the option with the one returned
     */
    onCreate?: (value: string) => void | boolean | SelectOption;
}

export type NuiSelect = Nui.FRCWC<
    SelectProps & StrictOmit<InputContainerProps, "focused" | "touched">,
    "input"
>;

export type HTMLButtonProps = Required<
    React.ButtonHTMLAttributes<HTMLButtonElement>
>;
