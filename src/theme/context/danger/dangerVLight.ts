import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerVLight = createContextTheme("dangerVLight");
export const varDangerVLight = contextDangerVLight.var;

export default css`
    ${contextDangerVLight.varName}: ${contextDangerVLight.getVarValue};
`;
