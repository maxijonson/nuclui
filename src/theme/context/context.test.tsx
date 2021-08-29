import "jest-styled-components";
import { createThemeTests } from "@utils/test";
import {
    info,
    infoActive,
    infoActiveAlt,
    infoContrastText,
    infoSurface,
    warn,
    warnActive,
    warnActiveAlt,
    warnContrastText,
    warnSurface,
    danger,
    dangerActive,
    dangerActiveAlt,
    dangerContrastText,
    dangerSurface,
    success,
    successActive,
    successActiveAlt,
    successContrastText,
    successSurface,
    secondary,
    secondaryActive,
    secondaryActiveAlt,
    secondaryContrastText,
    secondarySurface,
    primary,
    primaryActive,
    primaryActiveAlt,
    primaryContrastText,
    primarySurface,
} from "./index";

const testTheme = createThemeTests("context", "#FF00FF");

describe("theme/context", () => {
    testTheme("info", info);
    testTheme("infoActive", infoActive);
    testTheme("infoActiveAlt", infoActiveAlt);
    testTheme("infoContrastText", infoContrastText);
    testTheme("infoSurface", infoSurface);

    testTheme("warn", warn);
    testTheme("warnActive", warnActive);
    testTheme("warnActiveAlt", warnActiveAlt);
    testTheme("warnContrastText", warnContrastText);
    testTheme("warnSurface", warnSurface);

    testTheme("danger", danger);
    testTheme("dangerActive", dangerActive);
    testTheme("dangerActiveAlt", dangerActiveAlt);
    testTheme("dangerContrastText", dangerContrastText);
    testTheme("dangerSurface", dangerSurface);

    testTheme("success", success);
    testTheme("successActive", successActive);
    testTheme("successActiveAlt", successActiveAlt);
    testTheme("successContrastText", successContrastText);
    testTheme("successSurface", successSurface);

    testTheme("secondary", secondary);
    testTheme("secondaryActive", secondaryActive);
    testTheme("secondaryActiveAlt", secondaryActiveAlt);
    testTheme("secondaryContrastText", secondaryContrastText);
    testTheme("secondarySurface", secondarySurface);

    testTheme("primary", primary);
    testTheme("primaryActive", primaryActive);
    testTheme("primaryActiveAlt", primaryActiveAlt);
    testTheme("primaryContrastText", primaryContrastText);
    testTheme("primarySurface", primarySurface);
});
