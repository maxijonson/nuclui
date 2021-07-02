import { createBasicTests } from "@utils/test";
import InputContainer from "./InputContainer";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(InputContainer, {});

describe("InputContainer", () => {
    testRendering();
    testDisplayName("NuiInputContainer", "NuiStyledInputContainer");
    testRef("div");
    testClassName("div", "NuiInputContainer");
});
