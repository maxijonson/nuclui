import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoVDark = createContextTheme("infoVDark");
export const varInfoVDark = contextInfoVDark.var;

export default css`
    ${contextInfoVDark.varName}: ${contextInfoVDark.getVarValue};
`;
