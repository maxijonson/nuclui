import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundSecondary = createBackgroundTheme("secondary");
export const varSecondary = backgroundSecondary.var;

export default css`
    ${backgroundSecondary.varName}: ${backgroundSecondary.getVarValue};
    background-color: ${varSecondary};
`;
