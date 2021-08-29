import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundActive = createBackgroundTheme("active");
export const varActive = backgroundActive.var;

export default css`
    ${backgroundActive.varName}: ${backgroundActive.getVarValue};
    background-color: ${varActive};
`;
