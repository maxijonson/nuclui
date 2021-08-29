import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundSurface = createBackgroundTheme("surface");
export const varSurface = backgroundSurface.var;

export default css`
    ${backgroundSurface.varName}: ${backgroundSurface.getVarValue};
    background-color: ${varSurface};
`;
