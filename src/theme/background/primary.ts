import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundPrimary = createBackgroundTheme("primary");
export const varPrimary = backgroundPrimary.var;

export default css`
    ${backgroundPrimary.varName}: ${backgroundPrimary.getVarValue};
    background-color: ${varPrimary};
`;
