import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondarySurface = createContextTheme("secondarySurface");
export const varSecondarySurface = contextSecondarySurface.var;

export default css`
    ${contextSecondarySurface.varName}: ${contextSecondarySurface.getVarValue};
`;
