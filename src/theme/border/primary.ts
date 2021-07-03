import { css } from "styled-components";
import { createBorderTheme } from "../defaultTheme";

const borderPrimary = createBorderTheme("primary");
export const varPrimary = borderPrimary.var;

export default css`
    ${borderPrimary.varName}: ${borderPrimary.getVarValue};
    border-color: ${varPrimary};
`;
