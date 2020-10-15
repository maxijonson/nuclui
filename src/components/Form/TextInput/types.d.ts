import MaskedInput, { MaskedInputProps } from "react-text-mask";
import { StrictOmit } from "ts-essentials";
import { InputContainerProps, HTMLInputProps } from "../InputContainer/types";

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
     */
    onChange?: (
        v: string,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * React-Text-Mask: An array or a function that defines how the user input is going to be masked
     *
     * @reference [react-text-mask - mask](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask)
     * @default false
     */
    mask?: MaskedInputProps["mask"];

    /**
     * React-Text-Mask: Tells the component whether to be in guide or no guide mode.
     *
     * @reference [react-text-mask - guide](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#guide)
     * @default true
     */
    guide?: MaskedInputProps["guide"];

    /**
     * React-Text-Mask: The placeholder character represents the fillable spot in the mask.
     *
     * @reference [react-text-mask - placeholderChar](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#placeholderchar)
     * @default "_"
     */
    placeholderChar?: MaskedInputProps["placeholderChar"];

    /**
     * React-Text-Mask: Changes the general behavior of the Text Mask component.
     *
     * @reference [react-text-mask - keepCharPositions](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#keepcharpositions)
     * @default false
     */
    keepCharPositions?: MaskedInputProps["keepCharPositions"];

    /**
     * React-Text-Mask: Function that will give you the opportunity to modify the conformed value before it is displayed on the screen.
     *
     * **NOTE**: this prop has no effect without `mask` prop defined, use the `transform` prop instead.
     * @reference [react-text-mask - pipe](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#pipe)
     */
    pipe?: MaskedInputProps["pipe"];

    /**
     * React-Text-Mask: boolean that tells the Text Mask component to display the mask as a placeholder in place of the regular placeholder when the input element value is empty.
     *
     * @reference [react-text-mask - showMask](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#showmask)
     * @default false
     */
    showMask?: MaskedInputProps["showMask"];

    /**
     * Custom transformer function to change the value of the text field based on the given value.
     *
     * **NOTE**: If you are using the `mask` prop, use the `pipe` prop instead of this one
     */
    transform?: (value: string) => string;
}

/**
 * A text input for entering string data
 */
export type NuiTextInput = Nui.FRCWC<
    Nui.Props<
        TextInputProps & StrictOmit<InputContainerProps, "focused" | "touched">
    >,
    typeof MaskedInput
>;
