import { createThemeTests } from "@utils/test";
import { surfaceAlt, activeAlt, main, active, surface } from "./index";
import "jest-styled-components";

const testTheme = createThemeTests("background", "#FF00FF", "background-color");

describe("theme/background", () => {
    testTheme("main", main);
    testTheme("surface", surface);
    testTheme("surfaceAlt", surfaceAlt);
    testTheme("active", active);
    testTheme("activeAlt", activeAlt);
});
