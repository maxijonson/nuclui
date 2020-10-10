import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-text-primary: ${({ theme }) =>
        theme.nui?.text?.primary ?? defaultTheme.text.primary};
    color: var(--nui-text-primary);
`;
