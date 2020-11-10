import { HTMLInputProps } from "../InputContainer/types";

export interface CheckboxContainerProps {
    /**
     * Checked state of the checkbox input.
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
     * Where the label appears relative to the contianer
     *
     * @default right
     */
    labelPosition?: "top" | "right" | "bottom" | "left";

    /**
     * The errors associated with the field. Only the first one is shown.
     */
    errors?: string[];

    /**
     * If the input has been touched (interacted with at least once). When false, prevents displaying errors (for example: on the initial input)
     *
     * @default true
     */
    touched?: boolean;

    /**
     * If the input is being focused at the moment. When true, the style of the input is changed to reflect this state.
     *
     * @default false
     */
    focused?: boolean;

    /**
     * The size of the input
     *
     * @default "sm"
     */
    size?: Nui.Breakpoint;
}

/**
 * A container for checkbox-like inputs
 */
export type NuiCheckboxContainer = Nui.FRCWC<CheckboxContainerProps, "input">;
