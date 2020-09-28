export interface InputContainerProps {
    /**
     * Label to be shown over the InputContainer
     */
    label?: string;

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

    /**
     * Size of the input (number in ch or string for custom size type)
     */
    size?: number | string;

    /**
     * The errors associated with the field. Only the first one is shown.
     */
    errors?: string[];

    touched?: boolean;

    focused?: boolean;

    disabled?: boolean;
}

export type NuiInputContainer = Nui.FRCWC<InputContainerProps, "div">;
