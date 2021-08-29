import { background } from "@theme";
import { css } from "styled-components";

export default css`
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        ${background.surfaceAlt}

        border-radius: 10px;
    }
`;
