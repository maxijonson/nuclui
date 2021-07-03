import "jest-styled-components";
import { createThemeTests } from "@utils/test";
import { primary, secondary, contrast } from "./index";

const testTheme = createThemeTests("text", "#FF00FF", "color");

describe("theme/text", () => {
    testTheme("primary", primary);
    testTheme("secondary", secondary);
    testTheme("contrast", contrast);
});
