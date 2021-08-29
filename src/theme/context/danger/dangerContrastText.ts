import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerContrastText = createContextTheme("dangerContrastText");
export const varDangerContrastText = contextDangerContrastText.var;

export default css`
    ${contextDangerContrastText.varName}: ${contextDangerContrastText.getVarValue};
`;
