import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimaryVDark = createContextTheme("primaryVDark");
export const varPrimaryVDark = contextPrimaryVDark.var;

export default css`
    ${contextPrimaryVDark.varName}: ${contextPrimaryVDark.getVarValue};
`;
