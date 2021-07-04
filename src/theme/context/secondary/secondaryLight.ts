import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondaryLight = createContextTheme("secondaryLight");
export const varSecondaryLight = contextSecondaryLight.var;

export default css`
    ${contextSecondaryLight.varName}: ${contextSecondaryLight.getVarValue};
`;
