import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnContrastText = createContextTheme("warnContrastText");
export const varWarnContrastText = contextWarnContrastText.var;

export default css`
    ${contextWarnContrastText.varName}: ${contextWarnContrastText.getVarValue};
`;
