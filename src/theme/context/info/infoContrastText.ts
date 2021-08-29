import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoContrastText = createContextTheme("infoContrastText");
export const varInfoContrastText = contextInfoContrastText.var;

export default css`
    ${contextInfoContrastText.varName}: ${contextInfoContrastText.getVarValue};
`;
