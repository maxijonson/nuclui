import { createBasicTests } from "@utils/test";
import Popover from "./Popover";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Popover, {});

describe("Popover", () => {
    testRendering();
    testDisplayName("NuiStyledPopover", "NuiPopover");
    testRef("div");
    testClassName("div", "NuiPopover");
});
