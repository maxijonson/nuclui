import { SafeDictionary } from "ts-essentials";

/**
 * Creates a set of breakpoints. Default breakpoints are supplied when it isn't specified with value of 0
 */
export default (
    breakpoints: SafeDictionary<number, Nui.Breakpoint>
): {
    [bp in Nui.Breakpoint]: number;
} => ({
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
    ...breakpoints,
});
