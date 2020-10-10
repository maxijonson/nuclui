import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-border-primary: ${({ theme }) =>
        theme.nui?.border?.primary ?? defaultTheme.border.primary};
    border-color: var(--nui-border-primary);
`;
