import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-text-contrast: ${({ theme }) =>
        theme.nui?.text?.contrast ?? defaultTheme.text.contrast};
    color: var(--nui-text-contrast);
`;
