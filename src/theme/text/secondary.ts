import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    color: ${({ theme }) =>
        theme.nui?.text?.secondary ?? defaultTheme.text.secondary};
`;
