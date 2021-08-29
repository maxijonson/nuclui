import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimaryContrastText = createContextTheme("primaryContrastText");
export const varPrimaryContrastText = contextPrimaryContrastText.var;

export default css`
    ${contextPrimaryContrastText.varName}: ${contextPrimaryContrastText.getVarValue};
`;
