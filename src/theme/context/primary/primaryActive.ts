import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimaryActive = createContextTheme("primaryActive");
export const varPrimaryActive = contextPrimaryActive.var;

export default css`
    ${contextPrimaryActive.varName}: ${contextPrimaryActive.getVarValue};
`;
