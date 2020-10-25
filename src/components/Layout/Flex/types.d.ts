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
     * Similar to `itemSpacing`, except that it takes advantage of the CSS "gap" property. This is useful when there should be spacing between items but not on the edges.
     * A common combinaison would be to set `itemSpacing` to "none" and `gap` to something.
     *
     * @note When specified as a number, the number is the amount of pixels
     */
    gap?: Nui.Breakpoint | number;

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

    /**
     * Gives a default "xs" value for the children FlexItem
     */
    itemXs?: FlexItemProps["xs"];

    /**
     * Gives a default "sm" value for the children FlexItem
     */
    itemSm?: FlexItemProps["sm"];

    /**
     * Gives a default "md" value for the children FlexItem
     */
    itemMd?: FlexItemProps["md"];

    /**
     * Gives a default "lg" value for the children FlexItem
     */
    itemLg?: FlexItemProps["lg"];

    /**
     * Gives a default "xl" value for the children FlexItem
     */
    itemXl?: FlexItemProps["xl"];
}

/**
 * A flex container for displaying items one after the other
 * @reference https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type NuiFlex = Nui.FRC<FlexProps, "div">;

export interface FlexContextType {
    itemGrow?: FlexItemProps["grow"];
    itemShrink?: FlexItemProps["shrink"];
    itemBasis?: FlexItemProps["basis"];
    itemSpacing?: FlexItemProps["spacing"];
    itemXs?: FlexItemProps["xs"];
    itemSm?: FlexItemProps["sm"];
    itemMd?: FlexItemProps["md"];
    itemLg?: FlexItemProps["lg"];
    itemXl?: FlexItemProps["xl"];
}
