import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextWarnLight = createContextTheme("warnLight");
export const varWarnLight = contextWarnLight.var;

export default css`
    ${contextWarnLight.varName}: ${contextWarnLight.getVarValue};
`;
