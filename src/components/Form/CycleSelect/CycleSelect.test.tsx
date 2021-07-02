import { createBasicTests } from "@utils/test";
import CycleSelect from "./CycleSelect";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(CycleSelect, {});

describe("CycleSelect", () => {
    testRendering();
    testDisplayName("NuiCycleSelect", "NuiStyledCycleSelect");
    testRef("input");
    testClassName("div", "NuiCycleSelect");
});
