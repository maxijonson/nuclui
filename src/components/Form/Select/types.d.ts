import React from "react";
import { StrictOmit } from "ts-essentials";
import { InputContainerPropsWithBase } from "../InputContainer/types";

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps {
    children?: never;

    /**
     * Forwarded ref to the inner input element of the `Select` component.
     *
     * Note: `ref.current.value` points to the value displayed to the user (label), **not** the actual `value` of the option from the `options` array.
     */
    ref?: React.ForwardedRef<HTMLInputElement>;

    /**
     * Options to choose from
     */
    options: SelectOption[];

    /**
     * The selected option value
     */
    value?: string;

    /**
     * The defaultValue (or initial value) of the input. Used for uncontrolled inputs.
     */
    defaultValue?: string;

    /**
     * Gets called when an option is selected. The first parameter is the `option.value` string, while the second parameter is the click MouseEvent or KeyDown event.
     *
     * Note: this prop is called `onChange` for convenience with `useForm`. However, this corresponds to an `onClick` OR an `onKeyDown` event.
     */
    onChange?: (
        v: string,
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
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
    ) => React.ReactNode;

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
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        SelectProps,
    "input"
>;

export type HTMLButtonProps = Required<
    React.ButtonHTMLAttributes<HTMLButtonElement>
>;
