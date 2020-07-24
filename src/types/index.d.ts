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
     * Type of a functionnal component (with ref) which the root node can be overriden with the "component" prop.
     * - The ref is typed based on the "component" prop.
     * - The HTML attributes are typed based on the "component" prop
     * @generic P Type of component props
     * @generic D default root node component (should match the default props)
     */
    interface CustomComponent<P extends object, D extends React.ElementType> {
        <C extends React.ElementType = D>(
            props: P & { component?: C } & Omit<
                    React.ComponentPropsWithRef<C>,
                    keyof P
                >
        ): JSX.Element;
        propTypes?: React.WeakValidationMap<P>;
        contextTypes?: React.ValidationMap<any>;
        defaultProps?: Partial<
            P & { component?: D } & Omit<
                    React.ComponentPropsWithRef<D>,
                    keyof P
                >
        >;
        displayName?: string;
    }

    type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
}

export = Nui;
export as namespace Nui;
