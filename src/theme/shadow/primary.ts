import { css } from "styled-components";
import { createShadowTheme } from "../defaultTheme";

const shadowPrimary = createShadowTheme("primary");
export const varPrimary = shadowPrimary.var;

export default css`
    ${shadowPrimary.varName}: ${shadowPrimary.getVarValue};
`;
