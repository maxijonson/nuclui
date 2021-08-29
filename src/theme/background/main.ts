import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundMain = createBackgroundTheme("main");
export const varMain = backgroundMain.var;

export default css`
    ${backgroundMain.varName}: ${backgroundMain.getVarValue};
    background-color: ${varMain};
`;
