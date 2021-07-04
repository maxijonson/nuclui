import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarn = createContextTheme("warn");
export const varWarn = contextWarn.var;

export default css`
    ${contextWarn.varName}: ${contextWarn.getVarValue};
`;
