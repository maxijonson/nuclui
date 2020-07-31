export interface CardProps {
    /**
     * The padding size
     * @default "md"
     */
    padding?: Nui.Breakpoint | "none" | number;

    /**
     * If true, no box-shadow rule is applied
     * @default false
     */
    disableShadow?: boolean;

    /**
     * Style of the Card outline
     * @default solid
     */
    outline?:
        | "solid"
        | "dashed"
        | "dotted"
        | "double"
        | "groove"
        | "none"
        | "hidden"
        | "inset"
        | "outset"
        | "ridge";
}

/**
 * Groups content together in a distinct container
 */
export type NuiCard = Nui.FRC<CardProps, "div">;
