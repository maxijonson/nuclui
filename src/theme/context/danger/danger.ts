import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDanger = createContextTheme("danger");
export const varDanger = contextDanger.var;

export default css`
    ${contextDanger.varName}: ${contextDanger.getVarValue};
`;
