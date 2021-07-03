import { css } from "styled-components";
import { createShadowTheme } from "../defaultTheme";

const shadowSecondary = createShadowTheme("secondary");
export const varSecondary = shadowSecondary.var;

export default css`
    ${shadowSecondary.varName}: ${shadowSecondary.getVarValue};
`;
