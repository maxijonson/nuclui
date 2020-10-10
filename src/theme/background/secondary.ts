import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-background-secondary: ${({ theme }) =>
        theme.nui?.background?.secondary ?? defaultTheme.background.secondary};
    background-color: var(--nui-background-secondary);
`;
