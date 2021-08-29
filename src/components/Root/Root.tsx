import React from "react";
import _ from "lodash";
import { createComponentName } from "@utils";
import MediaQueryContext from "@components/Layout/MediaQueryContext/MediaQueryContext";
import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "@theme/defaultTheme";
import { background } from "@theme";
import { Normalize } from "./Normalize";
import { Fonts } from "./Fonts";
import { RootProps } from "./types";

/**
 * Root of Nuclui. Ideally, this component should not be necessary, but can be helpful for setting up:
 * - Theming (manually done by adding the "nui" property to a styled-component ThemeProvider with your theme overrides)
 * - CSS Reset (manually done by adding your own reset or using the Normalize component)
 * - Fonts (manually done by importing the used fonts into your app)
 * - MediaQueryContext (manually done by adding this component at the root of your app or wherever it is necessary to optimize components that use `useMediaQuery`)
 */
const Root: Nui.FC<RootProps> = ({ theme = {}, children }) => {
    const mergedTheme = React.useMemo(
        () => _.defaultsDeep({ nui: theme }, { nui: { ...defaultTheme } }),
        [theme]
    );

    return (
        <ThemeProvider theme={mergedTheme}>
            <StyledRoot className="NuiRoot">
                <Normalize />
                <Fonts />
                <MediaQueryContext>{children}</MediaQueryContext>
            </StyledRoot>
        </ThemeProvider>
    );
};

const StyledRoot = styled.div`
    ${background.main}
    min-height: 100vh;

    * {
        box-sizing: border-box;
    }
`;

Root.displayName = createComponentName("Root");

export default Root;
