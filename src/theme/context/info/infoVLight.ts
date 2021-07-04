import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoVLight = createContextTheme("infoVLight");
export const varInfoVLight = contextInfoVLight.var;

export default css`
    ${contextInfoVLight.varName}: ${contextInfoVLight.getVarValue};
`;
