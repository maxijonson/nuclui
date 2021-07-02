import { createBasicTests } from "@utils/test";
import NumberInput from "./NumberInput";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(NumberInput, {});

describe("NumberInput", () => {
    testRendering();
    testDisplayName("NuiNumberInput", "NuiStyledNumberInput");
    testRef("input");
    testClassName("div", "NuiNumberInput");
});
