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
     * - The ref is typed based on the "component" prop.
     * - The HTML attributes are typed based on the "component" prop
     * @generic P Type of component props
     * @generic D default root node component (should match the default props)
     */
    interface FowardedRefComponent<
        P extends object,
        D extends React.ElementType
    > {
        <C extends React.ElementType = D>(
            props: P & { as?: C } & Omit<
                    React.ComponentPropsWithRef<C>,
                    keyof P
                >
        ): React.ReactElement | null;
        readonly $$typeof: symbol;
        defaultProps?: Partial<
            P & { as?: React.ElementType } & Omit<
                    React.ComponentPropsWithRef<D>,
                    keyof P
                >
        >;
        propTypes?: React.WeakValidationMap<
            P & { as?: React.ElementType } & Omit<
                    React.ComponentPropsWithRef<D>,
                    keyof P
                >
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

    type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
}

export = Nui;
export as namespace Nui;
