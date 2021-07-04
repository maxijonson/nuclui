import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnVDark = createContextTheme("warnVDark");
export const varWarnVDark = contextWarnVDark.var;

export default css`
    ${contextWarnVDark.varName}: ${contextWarnVDark.getVarValue};
`;
