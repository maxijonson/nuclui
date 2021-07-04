import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimary = createContextTheme("primary");
export const varPrimary = contextPrimary.var;

export default css`
    ${contextPrimary.varName}: ${contextPrimary.getVarValue};
`;
