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

    /**
     * The time the button must be held for the click event to fire (in ms). The user still needs to release the button after this, but the event won't fire until the button was held for the duration specified.
     *
     * @default 0 (no confirm)
     */
    confirmDuration?: number;

    /**
     * The click event fired when the button is pressed
     */
    onClick?: (
        event:
            | React.MouseEvent<HTMLButtonElement>
            | React.TouchEvent<HTMLButtonElement>
    ) => void;

    /**
     * When `false`, ensures that the button press animation is played fully, even if the user releases the button before it completes.
     * Setting it to `true` will cancel the animation if the user releases the button early.
     *
     * @default false
     */
    disableFullAnimation?: boolean;
}

/**
 * A button that can perform actions when clicked
 */
export type NuiButton = Nui.FRCWC<ButtonProps, "button">;
