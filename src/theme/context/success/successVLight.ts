import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessVLight = createContextTheme("successVLight");
export const varSuccessVLight = contextSuccessVLight.var;

export default css`
    ${contextSuccessVLight.varName}: ${contextSuccessVLight.getVarValue};
`;
