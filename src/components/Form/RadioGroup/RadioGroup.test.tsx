import { createBasicTests } from "@utils/test";
import RadioGroup from "./RadioGroup";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(RadioGroup, {});

describe("RadioGroup", () => {
    testRendering();
    testDisplayName("NuiStyledRadioGroup", "NuiRadioGroup");
    testRef("div", "button");
    testClassName("div", "NuiRadioGroup");
});
