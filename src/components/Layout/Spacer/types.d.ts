export interface SpacerProps {
    children?: never;

    /**
     * Specifies the size of the spacer
     * @default "lg"
     */
    size?: Nui.Breakpoint | number;
}

/**
 * Adds space between content
 */
export type NuiSpacer = Nui.FRCWC<SpacerProps, "div">;
