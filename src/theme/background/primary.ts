import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    background-color: ${({ theme }) =>
        theme.nui?.background?.primary ?? defaultTheme.background.primary};
`;
