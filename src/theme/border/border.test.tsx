import "jest-styled-components";
import { createThemeTests } from "@utils/test";
import { primary, secondary } from "./index";

const testTheme = createThemeTests("border", "#FF00FF", "border-color");

describe("theme/border", () => {
    testTheme("primary", primary);
    testTheme("secondary", secondary);
});
