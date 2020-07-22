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
export default (
    bp: string | undefined,
    under: Nui.Breakpoint,
    equal = true
) => {
    if (
        !bp ||
        !_.includes(["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[], bp)
    ) {
        return false;
    }
    return equal
        ? BP[bp as Nui.Breakpoint] <= BP[under]
        : BP[bp as Nui.Breakpoint] < BP[under];
};
