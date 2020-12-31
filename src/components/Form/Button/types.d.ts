export interface ButtonProps {
    /**
     * Icon to show alongside the button
     */
    icon?: React.ReactNode;

    /**
     * The position of the icon
     *
     * @default "left"
     */
    iconPosition?: "left" | "right";

    /**
     * The size of the button
     *
     * @default sm
     */
    size?: Nui.Breakpoint;

    /**
     * The button style
     *
     * Note: "round", "round-outline" and "round-empty" are intended for icon-only buttons
     *
     * @default "filled"
     */
    variant?:
        | "filled"
        | "outline"
        | "empty"
        | "round"
        | "round-outline"
        | "round-empty";

    /**
     * The color of the button
     *
     * @default "default"
     */
    color?: Nui.Context | "default";

    /**
     * Removes the shadow under the button
     *
     * @default false
     */
    disableShadow?: boolean;
}

export type NuiButton = Nui.FRCWC<ButtonProps, "button">;
