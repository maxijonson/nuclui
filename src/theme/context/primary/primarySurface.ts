import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimarySurface = createContextTheme("primarySurface");
export const varPrimarySurface = contextPrimarySurface.var;

export default css`
    ${contextPrimarySurface.varName}: ${contextPrimarySurface.getVarValue};
`;
