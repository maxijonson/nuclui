import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondaryActive = createContextTheme("secondaryActive");
export const varSecondaryActive = contextSecondaryActive.var;

export default css`
    ${contextSecondaryActive.varName}: ${contextSecondaryActive.getVarValue};
`;
