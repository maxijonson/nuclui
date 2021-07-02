import { createBasicTests } from "@utils/test";
import FilePicker from "./FilePicker";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(FilePicker, {});

describe("FilePicker", () => {
    testRendering();
    testDisplayName("NuiFilePicker", "NuiStyledFilePicker");
    testRef("input");
    testClassName("div", "NuiFilePicker");
});
