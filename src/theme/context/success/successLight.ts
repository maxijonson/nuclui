import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccessLight = createContextTheme("successLight");
export const varSuccessLight = contextSuccessLight.var;

export default css`
    ${contextSuccessLight.varName}: ${contextSuccessLight.getVarValue};
`;
