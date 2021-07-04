import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoLight = createContextTheme("infoLight");
export const varInfoLight = contextInfoLight.var;

export default css`
    ${contextInfoLight.varName}: ${contextInfoLight.getVarValue};
`;
