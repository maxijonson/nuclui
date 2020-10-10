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
     * If the input is disabled. When true, the style of the input is changed to reflect this state.
     */
    disabled?: boolean;
}

export type NuiInputContainer = Nui.FRCWC<InputContainerProps, "div">;

export type HTMLInputProps = Required<
    React.InputHTMLAttributes<HTMLInputElement>
>;
