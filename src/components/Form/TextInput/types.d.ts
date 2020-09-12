import MaskedInput, { MaskedInputProps } from "react-text-mask";

export interface TextInputProps2 {
    children?: never;
    type?: "text" | "password" | "tel" | "url" | "search";

    /**
     * Field name
     */
    name: string;

    /**
     * The label to display with the input
     */
    label?: string;

    /**
     * Initial text value
     *
     * @default ""
     */
    initial?: string;

    /**
     * The initial touched state of the input. Touched represents when the input has been focused at least once.
     *
     * @default false
     */
    initialTouched?: boolean;

    /**
     * Validation function.
     * Return false if the value is invalid or a string for a custom error message.
     *
     * @param value the value entered
     */
    validate?: (value: string) => void | boolean | string;

    /**
     * Validates if a value is required. An empty string is considered invalid.
     *
     * @default false
     */
    required?: boolean;

    /**
     * When to run validation
     *
     * @default "blur"
     */
    validateWhen?: "blur" | "change";

    /**
     * Custom transformer function to change the value of the text field based on the given value.
     */
    transform?: (prevValue: string, value: string) => string;

    /**
     * When to run the transform function
     *
     * @default "change"
     */
    transformWhen?: "blur" | "change";

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
}

export interface TextInputProps {
    children?: never;
    type?: "text" | "password" | "tel" | "url" | "search";
    name?: string;
    label?: string;

    /**
     * Gets called when the value of the input changes. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: string,
        e?: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * The errors associated with the field. Only the first one is shown.
     */
    errors?: string[];

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

    /**
     * If the input should be displayed as inline-block
     *
     * @default false
     */
    inline?: boolean;
}

/**
 * A text input for entering string data
 */
export type NuiTextInput = Nui.FRCWC<
    Nui.Props<TextInputProps>,
    typeof MaskedInput
>;

export type HTMLInputProps = Required<
    React.InputHTMLAttributes<HTMLInputElement>
>;
