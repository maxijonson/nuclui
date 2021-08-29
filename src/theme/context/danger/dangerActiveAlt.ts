import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerActiveAlt = createContextTheme("dangerActiveAlt");
export const varDangerActiveAlt = contextDangerActiveAlt.var;

export default css`
    ${contextDangerActiveAlt.varName}: ${contextDangerActiveAlt.getVarValue};
`;
