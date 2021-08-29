import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundSurfaceAlt = createBackgroundTheme("surfaceAlt");
export const varSurfaceAlt = backgroundSurfaceAlt.var;

export default css`
    ${backgroundSurfaceAlt.varName}: ${backgroundSurfaceAlt.getVarValue};
    background-color: ${varSurfaceAlt};
`;
