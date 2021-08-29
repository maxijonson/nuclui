import { css } from "styled-components";
import { createBackgroundTheme } from "../defaultTheme";

const backgroundActiveAlt = createBackgroundTheme("activeAlt");
export const varActiveAlt = backgroundActiveAlt.var;

export default css`
    ${backgroundActiveAlt.varName}: ${backgroundActiveAlt.getVarValue};
    background-color: ${varActiveAlt};
`;
