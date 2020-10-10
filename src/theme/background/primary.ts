import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-background-primary: ${({ theme }) =>
        theme.nui?.background?.primary ?? defaultTheme.background.primary};
    background-color: var(--nui-background-primary);
`;
