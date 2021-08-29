import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerSurface = createContextTheme("dangerSurface");
export const varDangerSurface = contextDangerSurface.var;

export default css`
    ${contextDangerSurface.varName}: ${contextDangerSurface.getVarValue};
`;
