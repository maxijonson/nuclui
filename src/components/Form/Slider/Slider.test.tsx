import { createBasicTests } from "@utils/test";
import Slider from "./Slider";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Slider, {});

describe("Slider", () => {
    testRendering();
    testDisplayName("NuiSlider", "NuiStyledSlider");
    testRef("div");
    testClassName("div", "NuiSlider");
});
