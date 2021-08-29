import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessActiveAlt = createContextTheme("successActiveAlt");
export const varSuccessActiveAlt = contextSuccessActiveAlt.var;

export default css`
    ${contextSuccessActiveAlt.varName}: ${contextSuccessActiveAlt.getVarValue};
`;
