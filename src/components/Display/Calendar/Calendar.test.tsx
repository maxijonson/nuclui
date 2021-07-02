import { createBasicTests } from "@utils/test";
import Calendar from "./Calendar";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Calendar, {});

describe("Calendar", () => {
    testRendering();
    testDisplayName("NuiStyledCalendar", "NuiCalendar");
    testRef("div");
    testClassName("div", "NuiCalendar");
});
