import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextDangerVDark = createContextTheme("dangerVDark");
export const varDangerVDark = contextDangerVDark.var;

export default css`
    ${contextDangerVDark.varName}: ${contextDangerVDark.getVarValue};
`;
