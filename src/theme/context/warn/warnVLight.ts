import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnVLight = createContextTheme("warnVLight");
export const varWarnVLight = contextWarnVLight.var;

export default css`
    ${contextWarnVLight.varName}: ${contextWarnVLight.getVarValue};
`;
