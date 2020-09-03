import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-context-primary: ${({ theme }) =>
        theme.nui?.context?.primary ?? defaultTheme.context.primary};
    --nui-context-secondary: ${({ theme }) =>
        theme.nui?.context?.secondary ?? defaultTheme.context.secondary};
    --nui-context-success: ${({ theme }) =>
        theme.nui?.context?.success ?? defaultTheme.context.success};
    --nui-context-warn: ${({ theme }) =>
        theme.nui?.context?.warn ?? defaultTheme.context.warn};
    --nui-context-danger: ${({ theme }) =>
        theme.nui?.context?.danger ?? defaultTheme.context.danger};
`;
