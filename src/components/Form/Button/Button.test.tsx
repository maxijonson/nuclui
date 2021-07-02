import { createBasicTests } from "@utils/test";
import Button from "./Button";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Button, {});

describe("Button", () => {
    testRendering();
    testDisplayName("NuiStyledButton", "NuiButton");
    testRef("button");
    testClassName("button", "NuiButton");
});
