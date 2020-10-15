import _ from "lodash";

/**
 * Returns whether or not the parameter is a breakpoint ("xs" | "sm" | "md" | "lg" | "xl")
 */
export default (value: any): value is Nui.Breakpoint =>
    _.includes(["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[], value);
