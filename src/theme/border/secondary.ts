import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-border-secondary: ${({ theme }) =>
        theme.nui?.border?.secondary ?? defaultTheme.border.secondary};
    border-color: var(--nui-border-secondary);
`;
