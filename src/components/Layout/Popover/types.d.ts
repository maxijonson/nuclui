export interface PopoverProps {
    /**
     * The position of the Popover relative to its relative parent.
     *
     * @default "top"
     */
    position?: "top" | "right" | "bottom" | "left" | "center";

    /**
     * Wether or not the popover is opened
     *
     * @default true
     */
    open?: boolean;

    /**
     * Spacing between the popover and its parent
     *
     * @default "xs"
     */
    spacing?: "none" | Nui.Breakpoint;
}

/**
 * A container that pops over or around a relative parent element when opened.
 */
export type NuiPopover = Nui.FRCWC<PopoverProps, "div">;
