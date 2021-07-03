import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundDimmed = createBackgroundTheme("dimmed");
export const varDimmed = backgroundDimmed.var;

export default css`
    ${backgroundDimmed.varName}: ${backgroundDimmed.getVarValue};
    background-color: ${varDimmed};
`;
