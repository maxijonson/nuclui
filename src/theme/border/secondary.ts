import { css } from "styled-components";
import { createBorderTheme } from "../defaultTheme";

const borderSecondary = createBorderTheme("secondary");
export const varSecondary = borderSecondary.var;

export default css`
    ${borderSecondary.varName}: ${borderSecondary.getVarValue};
    border-color: ${varSecondary};
`;
