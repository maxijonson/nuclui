import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnActiveAlt = createContextTheme("warnActiveAlt");
export const varWarnActiveAlt = contextWarnActiveAlt.var;

export default css`
    ${contextWarnActiveAlt.varName}: ${contextWarnActiveAlt.getVarValue};
`;
