/**
 * This file contains utility types, most of which are just shortcuts to other third party types.
 * DO NOT IMPORT OR EXPORT. Doing so would make this file a module instead of a declarations file, which would make its types no longer global. If you need to import, use inline import() instead
 */

/**
 * Safe equivalent of "{}"
 */
type NuiObject = Record<string, unknown>;

/**
 * Base component props
 */
type NuiProps<P = NuiObject> = {
    children?: React.ReactNode;
    className?: string;
} & P;

/**
 * Adds props for custom root component node
 */
type NuiCustomRootProp = { as?: React.ElementType };

/**
 * Same as React.FunctionComponent, but with className as an optional prop (for Styled-Components)
 */
type NuiFunctionalComponent<P = NuiObject> = React.FC<NuiProps<P>>;

/**
 * Short for NuiFunctionalComponent
 */
type NuiFC<P = NuiObject> = NuiFunctionalComponent<P>;
