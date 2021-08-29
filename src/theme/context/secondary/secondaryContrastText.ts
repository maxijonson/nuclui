import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondaryContrastText = createContextTheme(
    "secondaryContrastText"
);
export const varSecondaryContrastText = contextSecondaryContrastText.var;

export default css`
    ${contextSecondaryContrastText.varName}: ${contextSecondaryContrastText.getVarValue};
`;
