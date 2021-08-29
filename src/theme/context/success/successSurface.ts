import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessSurface = createContextTheme("successSurface");
export const varSuccessSurface = contextSuccessSurface.var;

export default css`
    ${contextSuccessSurface.varName}: ${contextSuccessSurface.getVarValue};
`;
