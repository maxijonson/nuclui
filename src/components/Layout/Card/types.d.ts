export interface CardProps {
    /**
     * The padding size
     * @default "md"
     */
    padding?: Nui.Breakpoint | "none";

    /**
     * If true, no box-shadow rule is applied
     * @default false
     */
    disableShadow?: boolean;
}

/**
 * Groups content together in a distinct container
 */
export type NuiCard = Nui.FRC<CardProps, "div">;
