import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundDark = createBackgroundTheme("dark");
export const varDark = backgroundDark.var;

export default css`
    ${backgroundDark.varName}: ${backgroundDark.getVarValue};
    background-color: ${varDark};
`;
