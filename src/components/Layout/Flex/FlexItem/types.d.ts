export type FlexItemProps = {
    /**
     * The flex-grow property to be applied
     * @default 1
     */
    grow?: number;

    /**
     * The order the item should appear next to other FlexItems
     * @default 0
     */
    order?: number;

    /**
     * The ability for the item to shrink based on its basis
     * @default 1
     */
    shrink?: number;

    /**
     * Overrides the cross-axis alignment of the container's `align` (align-items) property
     * @default auto
     */
    align?:
        | "auto"
        | "flexStart"
        | "flexEnd"
        | "center"
        | "baseline"
        | "stretch";

    /**
     * Spacing around the `FlexItem`.
     *
     * @default "sm" or the `itemSpacing` value given to the parent Flex
     */
    spacing?: Nui.Breakpoint | "none" | number;

    /**
     * The flex-basis to use for a breakpoint is not defined
     */
    basis?: number | string;

    /**
     * Flex-basis for the xs breakpoint
     */
    xs?: number | string;

    /**
     * Flex-basis for the sm breakpoint
     */
    sm?: number | string;

    /**
     * Flex-basis for the md breakpoint
     */
    md?: number | string;

    /**
     * Flex-basis for the lg breakpoint
     */
    lg?: number | string;

    /**
     * Flex-basis for the xl breakpoint
     */
    xl?: number | string;
};

/**
 * A flex item designed to be the children of the Flex component
 */
export type NuiFlexItem = Nui.FRC<FlexItemProps, "div">;
