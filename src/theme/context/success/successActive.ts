import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessActive = createContextTheme("successActive");
export const varSuccessActive = contextSuccessActive.var;

export default css`
    ${contextSuccessActive.varName}: ${contextSuccessActive.getVarValue};
`;
