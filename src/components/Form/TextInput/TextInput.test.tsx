import { createBasicTests } from "@utils/test";
import TextInput from "./TextInput";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(TextInput, {});

describe("TextInput", () => {
    testRendering();
    testDisplayName("NuiTextInput");
    testRef("input");
    testClassName("div", "NuiTextInput");
});
