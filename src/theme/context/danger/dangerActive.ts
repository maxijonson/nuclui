import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerActive = createContextTheme("dangerActive");
export const varDangerActive = contextDangerActive.var;

export default css`
    ${contextDangerActive.varName}: ${contextDangerActive.getVarValue};
`;
