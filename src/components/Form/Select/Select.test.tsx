import { createBasicTests } from "@utils/test";
import Select from "./Select";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Select, { options: [] });

describe("Select", () => {
    testRendering();
    testDisplayName("NuiSelect", "NuiStyledSelect");
    testRef("input");
    testClassName("div", "NuiSelect");
});
