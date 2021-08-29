import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoActive = createContextTheme("infoActive");
export const varInfoActive = contextInfoActive.var;

export default css`
    ${contextInfoActive.varName}: ${contextInfoActive.getVarValue};
`;
