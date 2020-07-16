import React from "react";
import styled from "styled-components";
import { createComponentName } from "@utils";
import { background, text } from "@theme";
import { quicksand } from "@fonts";
import { NuiContainerProps } from "./types";

const Container: NuiFC<NuiContainerProps & NuiCustomRootProp> = ({
    children,
    className,
    as: Component = "div",
}) => {
    return (
        <Component
            children={children}
            className={`nui-container ${className}`}
        />
    );
};

/**
 * A responsive container for your content
 */
const StyledContainer = styled(Container)`
    ${background.primary}
    ${text.primary}
    ${quicksand}

    display: block;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 1rem;
    font-weight: 400;

    @media (min-width: 620px) {
        padding-left: 24px;
        padding-right: 24px;
    }

    @media (min-width: 980px) {
        max-width: 980px;
        padding-left: 38px;
        padding-right: 38px;
    }

    @media (min-width: 1280px) {
        padding-left: 50px;
        padding-right: 50px;
    }
`;

StyledContainer.displayName = createComponentName("Container");

export default StyledContainer as typeof Container;
