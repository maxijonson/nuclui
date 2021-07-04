import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimaryVLight = createContextTheme("primaryVLight");
export const varPrimaryVLight = contextPrimaryVLight.var;

export default css`
    ${contextPrimaryVLight.varName}: ${contextPrimaryVLight.getVarValue};
`;
