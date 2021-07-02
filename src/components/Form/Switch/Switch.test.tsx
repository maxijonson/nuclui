import { createBasicTests } from "@utils/test";
import Switch from "./Switch";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Switch, {});

describe("Switch", () => {
    testRendering();
    testDisplayName("NuiSwitch", "NuiStyledSwitch");
    testRef("input");
    testClassName("div", "NuiSwitch");
});
