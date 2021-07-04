import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfo = createContextTheme("info");
export const varInfo = contextInfo.var;

export default css`
    ${contextInfo.varName}: ${contextInfo.getVarValue};
`;
