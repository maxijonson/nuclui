export interface InputBaseProps {
    /**
     * Label to be shown over the input
     */
    label?: string;

    /**
     * Size of the input
     *
     * @default "sm"
     */
    size?: Nui.Breakpoint;

    /**
     * Specifies if the input should take 100% of its parent width
     *
     * @default false
     */
    fluid?: boolean;

    /**
     * If true, removes the margin from the input.
     *
     * @default false
     */
    noGutters?: boolean;

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

    /**
     * Where the label appears relative to the contianer
     *
     * @default top
     */
    labelPosition?: "top" | "right" | "bottom" | "left";
}

/**
 * Base container for input components
 */
export type NuiInputBase = Nui.FRCWC<InputBaseProps, "div">;

export type HTMLInputProps = Required<
    React.InputHTMLAttributes<HTMLInputElement>
>;
