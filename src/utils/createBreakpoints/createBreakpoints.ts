import { SafeDictionary } from "ts-essentials";

/**
 * Creates a set of breakpoints. Default breakpoints are supplied when it isn't specified:
 * - xs: 0
 * - sm: 620
 * - md: 980
 * - lg: 1280
 * - xl: 1920
 */
export default (
    breakpoints: SafeDictionary<number, Nui.Breakpoint>
): {
    [bp in Nui.Breakpoint]: number;
} => ({
    xs: 0,
    sm: 620,
    md: 980,
    lg: 1280,
    xl: 1920,
    ...breakpoints,
});
