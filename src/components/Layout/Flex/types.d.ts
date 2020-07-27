export interface FlexProps {
    /**
     * If the flex container be inline
     * @default false
     */
    inline?: boolean;

    /**
     * The direction of the flex children
     * @default "row"
     */
    direction?: "row" | "rowReverse" | "column" | "columnReverse";

    /**
     * How the items should behave when overflowing their line
     * @default "wrap"
     */
    wrap?: "nowrap" | "wrap" | "wrapReverse";

    /**
     * The item alignment along the horizontal axis
     * ***NOTE***: the only browser-safe values are flexStart, center and flexEnd. The others may be incompatible by some browsers.
     * @default "center"
     */
    justify?:
        | "flexStart"
        | "flexEnd"
        | "start"
        | "end"
        | "left"
        | "right"
        | "center"
        | "spaceBetween"
        | "spaceAround"
        | "spaceEvenly";

    /**
     * The item alignment along the vertical axis
     * @default "stretch"
     */
    align?:
        | "stretch"
        | "flexStart"
        | "start"
        | "selfStart"
        | "flexEnd"
        | "end"
        | "selfEnd"
        | "center"
        | "baseline";
}

/**
 * A flex container for displaying items one after the other
 * @reference https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type NuiFlex = Nui.FRC<FlexProps, "div">;
