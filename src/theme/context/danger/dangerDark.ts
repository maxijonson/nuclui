import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerDark = createContextTheme("dangerDark");
export const varDangerDark = contextDangerDark.var;

export default css`
    ${contextDangerDark.varName}: ${contextDangerDark.getVarValue};
`;
