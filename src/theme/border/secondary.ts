import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    border-color: ${({ theme }) =>
        theme.nui?.border?.secondary ?? defaultTheme.border.secondary};
`;
