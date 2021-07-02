import { createBasicTests } from "@utils/test";
import DatePicker from "./DatePicker";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(DatePicker, {});

describe("DatePicker", () => {
    testRendering();
    testDisplayName("NuiDatePicker", "NuiStyledDatePicker");
    testRef("input");
    testClassName("div", "NuiDatePicker");
});
