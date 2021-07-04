import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondaryDark = createContextTheme("secondaryDark");
export const varSecondaryDark = contextSecondaryDark.var;

export default css`
    ${contextSecondaryDark.varName}: ${contextSecondaryDark.getVarValue};
`;
