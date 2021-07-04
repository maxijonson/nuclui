import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessDark = createContextTheme("successDark");
export const varSuccessDark = contextSuccessDark.var;

export default css`
    ${contextSuccessDark.varName}: ${contextSuccessDark.getVarValue};
`;
