import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSuccess = createContextTheme("success");
export const varSuccess = contextSuccess.var;

export default css`
    ${contextSuccess.varName}: ${contextSuccess.getVarValue};
`;
