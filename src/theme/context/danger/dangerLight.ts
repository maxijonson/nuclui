import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerLight = createContextTheme("dangerLight");
export const varDangerLight = contextDangerLight.var;

export default css`
    ${contextDangerLight.varName}: ${contextDangerLight.getVarValue};
`;
