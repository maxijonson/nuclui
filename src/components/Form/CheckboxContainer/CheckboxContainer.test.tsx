import { createBasicTests } from "@utils/test";
import CheckboxContainer from "./CheckboxContainer";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(CheckboxContainer, {});

describe("CheckboxContainer", () => {
    testRendering();
    testDisplayName("NuiCheckboxContainer", "NuiStyledCheckboxContainer");
    testRef("div");
    testClassName("div", "NuiCheckboxContainer");
});
