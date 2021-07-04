import "jest-styled-components";
import { createThemeTests } from "@utils/test";
import {
    infoVLight,
    infoLight,
    info,
    infoDark,
    infoVDark,
    warnVLight,
    warnLight,
    warn,
    warnDark,
    warnVDark,
    dangerVLight,
    dangerLight,
    danger,
    dangerDark,
    dangerVDark,
    successVLight,
    successLight,
    success,
    successDark,
    successVDark,
    secondaryVLight,
    secondaryLight,
    secondary,
    secondaryDark,
    secondaryVDark,
    primaryVLight,
    primaryLight,
    primary,
    primaryDark,
    primaryVDark,
} from "./index";

const testTheme = createThemeTests("context", "#FF00FF");

describe("theme/context", () => {
    testTheme("infoVLight", infoVLight);
    testTheme("infoLight", infoLight);
    testTheme("info", info);
    testTheme("infoDark", infoDark);
    testTheme("infoVDark", infoVDark);

    testTheme("warnVLight", warnVLight);
    testTheme("warnLight", warnLight);
    testTheme("warn", warn);
    testTheme("warnDark", warnDark);
    testTheme("warnVDark", warnVDark);

    testTheme("dangerVLight", dangerVLight);
    testTheme("dangerLight", dangerLight);
    testTheme("danger", danger);
    testTheme("dangerDark", dangerDark);
    testTheme("dangerVDark", dangerVDark);

    testTheme("successVLight", successVLight);
    testTheme("successLight", successLight);
    testTheme("success", success);
    testTheme("successDark", successDark);
    testTheme("successVDark", successVDark);

    testTheme("secondaryVLight", secondaryVLight);
    testTheme("secondaryLight", secondaryLight);
    testTheme("secondary", secondary);
    testTheme("secondaryDark", secondaryDark);
    testTheme("secondaryVDark", secondaryVDark);

    testTheme("primaryVLight", primaryVLight);
    testTheme("primaryLight", primaryLight);
    testTheme("primary", primary);
    testTheme("primaryDark", primaryDark);
    testTheme("primaryVDark", primaryVDark);
});
