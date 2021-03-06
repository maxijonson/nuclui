import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    --nui-shadow: ${({ theme }) =>
        theme.nui?.shadow?.secondary ?? defaultTheme.shadow.secondary};
`;
