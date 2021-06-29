import { StrictOmit } from "ts-essentials";
import {
    InputContainerPropsWithBase,
    HTMLInputProps,
} from "../InputContainer/types";

export interface TextInputProps {
    children?: never;

    /**
     * Input type. Use NumberInput for type "number"
     */
    type?: "text" | "password" | "tel" | "url" | "search";

    /**
     * Value of the input
     */
    value?: string;

    /**
     * Called when the value changes. The second parameter is the input "onChange" event
     */
    onChange?: (
        v: string,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;
}

/**
 * A text input for entering string data
 */
export type NuiTextInput = Nui.FRCWC<
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        TextInputProps,
    "input"
>;
