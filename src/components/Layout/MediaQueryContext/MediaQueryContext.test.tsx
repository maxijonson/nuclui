import { createBasicTests } from "@utils/test";
import MediaQueryContext from "./MediaQueryContext";
import "jest-styled-components";

const { testDisplayName, testRendering } = createBasicTests(
    MediaQueryContext,
    {}
);

describe("MediaQueryContext", () => {
    testRendering();
    testDisplayName("NuiMediaQueryContext");
});
