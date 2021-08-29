import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessContrastText = createContextTheme("successContrastText");
export const varSuccessContrastText = contextSuccessContrastText.var;

export default css`
    ${contextSuccessContrastText.varName}: ${contextSuccessContrastText.getVarValue};
`;
