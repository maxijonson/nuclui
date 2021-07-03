import { css } from "styled-components";
import { createTextTheme } from "../defaultTheme";

const textContrast = createTextTheme("contrast");
export const varContrast = textContrast.var;

export default css`
    ${textContrast.varName}: ${textContrast.getVarValue};
    color: ${varContrast};
`;
