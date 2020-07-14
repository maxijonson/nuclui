/**
 * Same as React.FunctionComponent, but with className as an optional prop (for Styled-Components)
 */
type NuiFunctionalComponent<P = Record<string, unknown>> = import("react").FC<
    { className?: string } & P
>;

type NuiFC<P = Record<string, unknown>> = NuiFunctionalComponent<P>;
