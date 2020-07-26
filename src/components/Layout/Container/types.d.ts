export interface ContainerProps {
    maxWidth?: Nui.Breakpoint;
    maxPadding?: Nui.Breakpoint | "none";
    fixed?: boolean;
}

export type NuiContainer = Nui.FRC<Nui.Props<ContainerProps>, "div">;
