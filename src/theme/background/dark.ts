import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-background-dark: ${({ theme }) =>
        theme.nui?.background?.dark ?? defaultTheme.background.dark};
    background-color: var(--nui-background-dark);
`;
