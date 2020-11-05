import { HTMLInputProps } from "../InputContainer/types";

export interface CheckboxProps {
    children?: never;

    /**
     * Checked state of the checkbox.
     *
     * Note: For convenience with `useForm`, this is actually the `checked` prop of the input. Use `inputValue` to set the actual `input` prop of the input.
     */
    value?: boolean;

    /**
     * The prop that will be assigned to the input `value` prop
     */
    inputValue?: HTMLInputProps["value"];

    /**
     * Text label associated with the input
     */
    label?: string;

    /**
     * Where the label appears relative to the checkbox
     *
     * @default right
     */
    labelPosition?: "top" | "right" | "bottom" | "left";

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: boolean,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    errors?: string[];
}

/**
 * TODO: Description
 */
export type NuiCheckbox = Nui.FRCWC<CheckboxProps, "input">;
