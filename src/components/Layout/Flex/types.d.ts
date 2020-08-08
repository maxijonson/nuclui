import { FlexItemProps } from "./FlexItem/types";

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
     * The item alignment along the main axis
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
     * The item alignment along the cross axis
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

    /**
     * Overrides the child FlexItems' default `grow` value
     */
    itemGrow?: FlexItemProps["grow"];

    /**
     * Overrides the child FlexItems' default `shrink` value
     */
    itemShrink?: FlexItemProps["shrink"];

    /**
     * Overrides the child FlexItems' default `basis` value
     */
    itemBasis?: FlexItemProps["basis"];

    /**
     * Overrides the child FlexItems' default `spacing` value
     */
    itemSpacing?: FlexItemProps["spacing"];
}

/**
 * A flex container for displaying items one after the other
 * @reference https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type NuiFlex = Nui.FRC<FlexProps, "div">;
