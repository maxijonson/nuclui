import { css } from "styled-components";
import { createTextTheme } from "../defaultTheme";

const textSecondary = createTextTheme("secondary");
export const varSecondary = textSecondary.var;

export default css`
    ${textSecondary.varName}: ${textSecondary.getVarValue};
    color: ${varSecondary};
`;
