import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoDark = createContextTheme("infoDark");
export const varInfoDark = contextInfoDark.var;

export default css`
    ${contextInfoDark.varName}: ${contextInfoDark.getVarValue};
`;
