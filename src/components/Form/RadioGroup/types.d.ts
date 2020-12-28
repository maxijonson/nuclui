import { HTMLInputProps } from "../InputContainer/types";

export interface RadioGroupProps {
    /**
     * Label of the RadioGroup
     */
    label?: string;

    /**
     * The name of the group. This will be affected to the Radio(s) contained inside the group.
     */
    name?: string;

    /**
     * The size of the group. This will be affected to the Radio(s) contained inside the group.
     *
     * @default "sm"
     */
    size?: Nui.Breakpoint;

    /**
     * The (flex) direction and order of the RadioButtons contained inside the group.
     *
     * @default "row"
     */
    direction?: "row" | "column" | "row-reverse" | "column-reverse";

    /**
     * Gets called when a contained RadioButton is selected. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: string,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * The value of the current RadioButton checked
     */
    value?: string;

    /**
     * The errors associated with the field. Only the first one is shown.
     */
    errors?: string[];
}

export interface RadioGroupContextValue {
    /**
     * Name of the RadioButtons contained in the RadioGroup
     */
    name?: string;

    /**
     * Size of the RadioButtons contained in the RadioGroup
     */
    size?: Nui.Breakpoint;

    /**
     * Gets called when a contained RadioButton is selected. The first parameter is the next value and the second is the input change event.
     */
    onChange?: (
        v: string,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * The value of the current RadioButton checked
     */
    value?: string;
}

/**
 * A group to handle multiple RadioButtons and their behaviour
 */
export type NuiRadioGroup = Nui.FRCWC<RadioGroupProps, "div">;
