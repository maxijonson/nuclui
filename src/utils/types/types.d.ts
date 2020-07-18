/**
 * This file contains utility types, most of which are just shortcuts to other third party types.
 * DO NOT IMPORT OR EXPORT. Doing so would make this file a module instead of a declarations file, which would make its types no longer global. If you need to import, use inline import() instead
 */

/**
 * Base component props
 */
type NuiProps<P = {}> = {
    children?: React.ReactNode;
    className?: string;
} & P;

/**
 * Same as React.FunctionComponent, but with className as an optional prop (for Styled-Components)
 * @generic P Type of component props
 */
type NuiFunctionalComponent<P = {}> = React.FC<NuiProps<P>>;

/**
 * Short for NuiFunctionalComponent
 * @generic P Type of component props
 */
type NuiFC<P = {}> = NuiFunctionalComponent<P>;

/**
 * Type of a functionnal component (with ref) which the root node can be overriden with the "as" prop.
 * - The ref is typed based on the "as" prop.
 * - The HTML attributes are typed based on the "as" prop
 * @generic P Type of component props
 * @generic D default root node component (should match the default props)
 */
interface NuiCustomComponent<P extends object, D extends React.ElementType> {
    <C extends React.ElementType = D>(
        props: P & { as?: C } & Omit<React.ComponentPropsWithRef<C>, keyof P>
    ): JSX.Element;
}
