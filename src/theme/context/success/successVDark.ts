import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessVDark = createContextTheme("successVDark");
export const varSuccessVDark = contextSuccessVDark.var;

export default css`
    ${contextSuccessVDark.varName}: ${contextSuccessVDark.getVarValue};
`;
