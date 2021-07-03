import "jest-styled-components";
import { createThemeTests } from "@utils/test";
import { primary, secondary } from "./index";

const testTheme = createThemeTests("shadow", "#FF00FF");

describe("theme/box-shadow", () => {
    testTheme("primary", primary);
    testTheme("secondary", secondary);
});
