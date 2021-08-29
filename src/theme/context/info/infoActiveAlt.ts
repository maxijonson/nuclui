import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextInfoActiveAlt = createContextTheme("infoActiveAlt");
export const varInfoActiveAlt = contextInfoActiveAlt.var;

export default css`
    ${contextInfoActiveAlt.varName}: ${contextInfoActiveAlt.getVarValue};
`;
