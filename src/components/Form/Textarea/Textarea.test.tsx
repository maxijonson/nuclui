import { createBasicTests } from "@utils/test";
import Textarea from "./Textarea";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Textarea, {});

describe("Textarea", () => {
    testRendering();
    testDisplayName("NuiTextarea", "NuiStyledTextarea");
    testRef("textarea");
    testClassName("div", "NuiTextarea");
});
