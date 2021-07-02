import { createBasicTests } from "@utils/test";
import Checkbox from "./Checkbox";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Checkbox, {});

describe("Checkbox", () => {
    testRendering();
    testDisplayName("NuiCheckbox", "NuiStyledCheckbox");
    testRef("input");
    testClassName("div", "NuiCheckbox");
});
