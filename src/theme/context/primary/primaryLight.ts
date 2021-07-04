import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimaryLight = createContextTheme("primaryLight");
export const varPrimaryLight = contextPrimaryLight.var;

export default css`
    ${contextPrimaryLight.varName}: ${contextPrimaryLight.getVarValue};
`;
