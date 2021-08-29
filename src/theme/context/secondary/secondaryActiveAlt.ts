import { css } from "styled-components";
import { createContextTheme } from "../../defaultTheme";

const contextSecondaryActiveAlt = createContextTheme("secondaryActiveAlt");
export const varSecondaryActiveAlt = contextSecondaryActiveAlt.var;

export default css`
    ${contextSecondaryActiveAlt.varName}: ${contextSecondaryActiveAlt.getVarValue};
`;
