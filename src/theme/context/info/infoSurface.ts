import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoSurface = createContextTheme("infoSurface");
export const varInfoSurface = contextInfoSurface.var;

export default css`
    ${contextInfoSurface.varName}: ${contextInfoSurface.getVarValue};
`;
