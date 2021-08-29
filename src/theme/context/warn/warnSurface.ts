import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnSurface = createContextTheme("warnSurface");
export const varWarnSurface = contextWarnSurface.var;

export default css`
    ${contextWarnSurface.varName}: ${contextWarnSurface.getVarValue};
`;
