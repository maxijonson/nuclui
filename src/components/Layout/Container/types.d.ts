export interface ContainerProps {
    /**
     * Max breakpoint width the container is allowed to reach. If the size of the Container is smaller than the max-width, it will take 100% of the space (unless the fixed prop is set to true)
     */
    maxWidth?: Nui.Breakpoint;

    /**
     * Max breakpoint the adjustable padding will reach. If "none" is specified, no padding will be applied.
     *
     * Note: "xl" has the same effect as undefined
     */
    maxPadding?: Nui.Breakpoint | "none";

    /**
     * Specifies if the max-width should have a fixed behaviour, meaning that the width will scale step by step according to the current breakpoint instead of filling 100% of its space.
     * @default false
     */
    fixed?: boolean;
}

/**
 * A responsive container for your main content
 */
export type NuiContainer = Nui.FRC<Nui.Props<ContainerProps>, "div">;
