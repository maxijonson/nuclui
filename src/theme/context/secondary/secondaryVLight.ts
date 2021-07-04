import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondaryVLight = createContextTheme("secondaryVLight");
export const varSecondaryVLight = contextSecondaryVLight.var;

export default css`
    ${contextSecondaryVLight.varName}: ${contextSecondaryVLight.getVarValue};
`;
