/**
 * Name of this project
 */
export const PROJECT = "Nuclui" as const;

/**
 * Short name for the project name, can be useful to prefix components or other things to make it clear where it is coming from
 */
export const PROJECT_SHORT = "NUI" as const;

/**
 * Prefix of every components, so it is easy to see which components come from the package when debugging
 */
export const COMPONENT_PREFIX =
    PROJECT_SHORT[0] + PROJECT_SHORT.slice(1).toLocaleLowerCase();
