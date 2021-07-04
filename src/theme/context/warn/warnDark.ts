import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnDark = createContextTheme("warnDark");
export const varWarnDark = contextWarnDark.var;

export default css`
    ${contextWarnDark.varName}: ${contextWarnDark.getVarValue};
`;
