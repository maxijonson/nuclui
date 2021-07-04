import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondary = createContextTheme("secondary");
export const varSecondary = contextSecondary.var;

export default css`
    ${contextSecondary.varName}: ${contextSecondary.getVarValue};
`;
