import { createBasicTests } from "@utils/test";
import RadioButton from "./RadioButton";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(RadioButton, {});

describe("RadioButton", () => {
    testRendering();
    testDisplayName("NuiRadioButton", "NuiStyledRadioButton");
    testRef("input");
    testClassName("div", "NuiRadioButton");
});
