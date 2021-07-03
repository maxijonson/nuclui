import { createThemeTests } from "@utils/test";
import { primary, secondary, dimmed, dark } from "./index";
import "jest-styled-components";

const testTheme = createThemeTests("background", "#FF00FF", "background-color");

describe("theme/background", () => {
    testTheme("primary", primary);
    testTheme("secondary", secondary);
    testTheme("dimmed", dimmed);
    testTheme("dark", dark);
});
