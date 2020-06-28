import { COMPONENT_PREFIX } from "@config";

export default (name = "unnamed") =>
    COMPONENT_PREFIX + name[0].toUpperCase() + name.slice(1);
