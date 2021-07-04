import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondaryVDark = createContextTheme("secondaryVDark");
export const varSecondaryVDark = contextSecondaryVDark.var;

export default css`
    ${contextSecondaryVDark.varName}: ${contextSecondaryVDark.getVarValue};
`;
