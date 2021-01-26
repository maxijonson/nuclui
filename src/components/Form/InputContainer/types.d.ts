import { InputBaseProps, NuiInputBase } from "../InputBase/types";

export interface InputContainerProps {
    /**
     * The style variant of the input \
     * **outline** - the input is surrounded by a border \
     * **underline** - the input is underlined \
     * **none** - only the input is shown with no special styling around it \
     * **filled** - like outline but with a background color \
     * **filled-underline** - like underline but with a background color \
     * **filled-none** - like none but with a background color \
     *
     * @default outline
     */
    variant?:
        | "outline"
        | "underline"
        | "filled"
        | "filled-underline"
        | "filled-none"
        | "none";

    /**
     * Prepend a component in the InputContainer (before the input)
     */
    prepend?: React.ReactNode;

    /**
     * Append a component in the InputContainer (after the input)
     */
    append?: React.ReactNode;
}

export type InputContainerPropsWithBase = InputBaseProps & InputContainerProps;

export type NuiInputContainer = Nui.FRCWC<
    InputContainerPropsWithBase,
    NuiInputBase
>;

export type HTMLInputProps = Required<
    React.InputHTMLAttributes<HTMLInputElement>
>;
