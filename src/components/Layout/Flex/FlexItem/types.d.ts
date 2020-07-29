export interface FlexItemProps {
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
     * The initial size of the size item
     * @default auto
     */
    basis?: string;

    /**
     * Overrides the alignment of the container defined by its `align` (align-items) property
     * @default auto
     */
    align?:
        | "auto"
        | "flexStart"
        | "flexEnd"
        | "center"
        | "baseline"
        | "stretch";
}

/**
 * A flex item designed to be the children of the Flex component
 */
export type NuiFlexItem = Nui.FRC<FlexItemProps, "div">;
