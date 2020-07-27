import { COMPONENT_PREFIX } from "@config";

/**
 * Creates a prefixed component name.
 * @param name the component name
 */
export default (name = "unnamed") =>
    COMPONENT_PREFIX + name[0].toUpperCase() + name.slice(1);
