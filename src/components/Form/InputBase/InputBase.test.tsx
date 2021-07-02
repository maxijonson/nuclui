import { createBasicTests } from "@utils/test";
import InputBase from "./InputBase";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(InputBase, {});

describe("InputBase", () => {
    testRendering();
    testDisplayName("NuiInputBase", "NuiStyledInputBase");
    testRef("div");
    testClassName("div", "NuiInputBase");
});
