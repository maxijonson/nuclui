import { InputBaseProps } from "../InputBase/types";
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
     * The type of the input
     *
     * @default "checkbox"
     */
    type?: "checkbox" | "radio";
}

export type CheckboxContainerPropsWithBase = InputBaseProps &
    CheckboxContainerProps;

/**
 * A container for checkbox-like inputs
 */
export type NuiCheckboxContainer = Nui.FRCWC<
    CheckboxContainerPropsWithBase,
    "input"
>;
