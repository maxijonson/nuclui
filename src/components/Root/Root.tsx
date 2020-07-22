import React from "react";
import _ from "lodash";
import { createComponentName } from "@utils";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@theme/defaultTheme";
import { Normalize } from "./Normalize";
import { Fonts } from "./Fonts";
import { RootProps } from "./types";

/**
 * Root of Nuclui. Ideally, this component should not be necessary, but can be helpful for setting up:
 * - Theming (manually done by adding the "nui" property to a styled-component ThemeProvider with your theme overrides)
 * - CSS Reset (manually done by adding your own reset or using the Normalize component)
 * - Fonts (manually done by importing the used fonts into your app)
 */
const Root: Nui.FC<RootProps> = ({ theme = {}, children }) => {
    const mergedTheme = React.useMemo(
        () => _.merge({ nui: { ...defaultTheme } }, { nui: theme }),
        [theme]
    );

    return (
        <ThemeProvider theme={mergedTheme}>
            <Normalize />
            <Fonts />
            {children}
        </ThemeProvider>
    );
};

Root.displayName = createComponentName("Root");

export default Root;
