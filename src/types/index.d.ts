/**
 * Nuclui's main namespace for typing utils
 */
declare namespace Nui {
    /**
     * Base component props
     */
    type Props<P = {}> = {
        children?: React.ReactNode;
        className?: string;
    } & P;

    /**
     * Same as React.FunctionComponent, but with className as an optional prop (for Styled-Components)
     * @generic P Type of component props
     */
    type FunctionalComponent<P = {}> = React.FC<Props<P>>;

    /**
     * Short for FunctionalComponent
     * @generic P Type of component props
     */
    type FC<P = {}> = FunctionalComponent<P>;

    /**
     * Type of a functionnal component with forwarded ref which the root node can be overriden with the "component" prop.
     * - The ref is typed based on the `component` prop.
     * - The HTML attributes are typed based on the `component` prop
     * @generic P Type of component props
     * @generic D default root node component (should match the default props)
     */
    interface FowardedRefComponent<
        P extends object,
        D extends React.ElementType
    > {
        <C extends React.ElementType = D>(
            props: P & { component?: C } & Omit<
                    React.ComponentPropsWithRef<C>,
                    keyof P
                >
        ): React.ReactElement | null;
        readonly $$typeof: symbol;
        defaultProps?: Partial<
            P & { component?: React.ElementType } & Omit<
                    React.ComponentPropsWithRef<D>,
                    keyof P
                >
        >;
        propTypes?: React.WeakValidationMap<
            P & { component?: React.ElementType } & Omit<
                    React.ComponentPropsWithRef<D>,
                    keyof P
                >
        >;
        displayName?: string;
    }

    /**
     * Type of a functionnal component with forwarded ref.
     * - The HTML attributes are typed based on the `D` template
     * @generic P Type of component props
     * @generic D The element type of the root node
     */
    interface FowardedRefComponentWithoutComponent<
        P extends object,
        D extends React.ElementType
    > {
        (
            props: P & Omit<React.ComponentPropsWithRef<D>, keyof P>
        ): React.ReactElement | null;
        readonly $$typeof: symbol;
        defaultProps?: Partial<
            P & Omit<React.ComponentPropsWithRef<D>, keyof P>
        >;
        propTypes?: React.WeakValidationMap<
            P & Omit<React.ComponentPropsWithRef<D>, keyof P>
        >;
        displayName?: string;
    }

    /**
     * Short for FowardedRefComponent
     */
    type FRC<P extends {}, D extends React.ElementType> = FowardedRefComponent<
        P,
        D
    >;

    /**
     * Short for FowardedRefComponentWithoutComponent
     */
    type FRCWC<
        P extends {},
        D extends React.ElementType
    > = FowardedRefComponentWithoutComponent<P, D>;

    /**
     * Breakpoint names
     */
    type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

    /**
     * Shortcut for casting a component into a StyledComponent
     *
     * ***WARNING***: This is meant to be used with StyledComponents that were casted into a non-StyledComponent. It should never be used if the component you are casting is not actually a StyledComponent.
     */
    type Styled<
        C extends React.ElementType,
        T = any,
        O = {},
        A = never
    > = import("styled-components").StyledComponent<C, T, O, A>;
}

export = Nui;
export as namespace Nui;
