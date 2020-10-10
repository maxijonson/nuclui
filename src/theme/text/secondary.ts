import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-text-secondary: ${({ theme }) =>
        theme.nui?.text?.secondary ?? defaultTheme.text.secondary};
    color: var(--nui-text-secondary);
`;
