import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimaryDark = createContextTheme("primaryDark");
export const varPrimaryDark = contextPrimaryDark.var;

export default css`
    ${contextPrimaryDark.varName}: ${contextPrimaryDark.getVarValue};
`;
