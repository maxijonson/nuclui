import React from "react";
import { mount } from "enzyme";
import mockConsole from "jest-mock-console";
import { createBasicTests } from "@utils/test";
import Spacer from "./Spacer";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Spacer, {});

describe("Spacer", () => {
    testRendering();
    testDisplayName("NuiStyledSpacer", "NuiSpacer");
    testRef("div");
    testClassName("div", "NuiSpacer");

    describe("size", () => {
        it("should use the default size value", () => {
            const wrapper = mount(<Spacer />);
            const spacer = wrapper.find(".NuiSpacer").first();
            expect(spacer.prop("className")).not.toContain("NuiSpacer--size");
        });

        it.each(["xs", "sm", "md", "xl"] as Nui.Breakpoint[])(
            "should use the %s size value",
            (bp) => {
                const wrapper = mount(<Spacer size={bp} />);
                const spacer = wrapper.find(".NuiSpacer").first();
                expect(spacer.hasClass(`NuiSpacer--size-${bp}`)).toBeTruthy();
            }
        );

        it("should not warn when the size is equal to 0", () => {
            mockConsole("warn");
            const wrapper = mount(<Spacer size={0} />);
            const spacer = wrapper.find(".NuiSpacer").first();
            expect(spacer.prop("style")).toHaveProperty("height", "0px");
            expect(console.warn).toHaveBeenCalledTimes(0);
        });

        it("should warn when the size is under 0", () => {
            mockConsole("warn");
            const wrapper = mount(<Spacer size={-1} />);
            const spacer = wrapper.find(".NuiSpacer").first();
            expect(spacer.prop("style")).toHaveProperty("height", "-1px");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "Spacer size prop should not be below 0."
            );
        });
    });
});
