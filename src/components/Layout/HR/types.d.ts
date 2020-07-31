export interface HRProps {
    children?: never;

    /**
     * The size of the HR
     * @default "sm"
     */
    size?: Nui.Breakpoint | number;

    /**
     * The spacing amount of the HR
     * @default "md"
     */
    spacing?: Nui.Breakpoint | number;
}

export type NuiHR = Nui.FRCWA<HRProps, "div">;
