import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnActive = createContextTheme("warnActive");
export const varWarnActive = contextWarnActive.var;

export default css`
    ${contextWarnActive.varName}: ${contextWarnActive.getVarValue};
`;
