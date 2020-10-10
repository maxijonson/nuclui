import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-background-dimmed: ${({ theme }) =>
        theme.nui?.background?.dimmed ?? defaultTheme.background.dimmed};
    background-color: var(--nui-background-dimmed);
`;
