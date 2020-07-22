import _ from "lodash";

enum BP {
    xs = 0,
    sm,
    md,
    lg,
    xl,
}

/**
 * Checks if the given `bp` is smaller or equal to `under`.
 * @param bp the breakpoint to check
 * @param under the breakpoint to compare `bp` against
 * @param equal If it is false, then only breakpoints under `under` will return true.
 */
export default (bp: string | undefined, under: NuiBreakpoint, equal = true) => {
    if (
        !bp ||
        !_.includes(["xs", "sm", "md", "lg", "xl"] as NuiBreakpoint[], bp)
    ) {
        return false;
    }
    return equal
        ? BP[bp as NuiBreakpoint] <= BP[under]
        : BP[bp as NuiBreakpoint] < BP[under];
};
