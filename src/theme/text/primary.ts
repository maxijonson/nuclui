import { css } from "styled-components";
import { createTextTheme } from "../defaultTheme";

const textPrimary = createTextTheme("primary");
export const varPrimary = textPrimary.var;

export default css`
    ${textPrimary.varName}: ${textPrimary.getVarValue};
    color: ${varPrimary};
`;
