import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextPrimaryActiveAlt = createContextTheme("primaryActiveAlt");
export const varPrimaryActiveAlt = contextPrimaryActiveAlt.var;

export default css`
    ${contextPrimaryActiveAlt.varName}: ${contextPrimaryActiveAlt.getVarValue};
`;
