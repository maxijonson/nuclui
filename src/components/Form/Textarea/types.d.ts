import { StrictOmit } from "ts-essentials";
import { InputContainerPropsWithBase } from "../InputContainer/types";

interface TextareaProps {
    children?: never;

    /**
     * Value of the textarea
     */
    value?: string;

    /**
     * The defaultValue (or initial value) of the input. Used for uncontrolled inputs.
     */
    defaultValue?: string;

    /**
     * Called when the value changes. The second parameter is the textarea "onChange" event
     */
    onChange?: (
        v: string,
        e: Parameters<React.ChangeEventHandler<HTMLTextAreaElement>>[0]
    ) => void;

    /**
     * The direction in which the Textarea can be resized manually. Only vertical resize is supported at the moment.
     * Setting this to `true` disables the auto-resize behavior to prevent undesirable behavior (i.e: size resets when the user types after resizing the Textarea).
     *
     * @default false
     */
    resizeable?: boolean;

    /**
     * The minimum amount of rows the Textarea should have visible to the screen.
     *
     * @default 1
     */
    minRows?: number;

    /**
     * The maximum amount of rows the Textarea should have visible to the screen.
     */
    maxRows?: number;
}

/**
 * A large text input for entering larger amounts of text data.
 * It automatically resizes with the input data within the bounds specified `minRows` and `maxRows`
 */
export type NuiTextarea = Nui.FRCWC<
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        TextareaProps,
    "textarea"
>;
