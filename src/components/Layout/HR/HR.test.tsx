import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import mockConsole from "jest-mock-console";
import HR from "./HR";
import "jest-styled-components";

describe("HR", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<HR />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(HR.displayName).toEqual("NuiHR");
    });

    describe("ref", () => {
        it("should use the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<HR ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<HR />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiHR")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<HR className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiHR")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("size", () => {
        it("should use the default size value", () => {
            const wrapper = mount(<HR />);
            const hr = wrapper.find(".NuiHR").first();

            expect(hr.prop("className")).not.toContain("NuiHR--size");
        });

        it.each(["sm", "md", "lg", "xl"] as Nui.Breakpoint[])(
            "should use the %s size value",
            (bp) => {
                const wrapper = mount(<HR size={bp} />);
                const hr = wrapper.find(".NuiHR").first();
                expect(hr.hasClass(`NuiHR--size-${bp}`)).toBeTruthy();
            }
        );

        it("should use the custom size value", () => {
            const wrapper = mount(<HR size={20} />);
            const hr = wrapper.find(".NuiHR").first();
            expect(hr.prop("style")).toHaveProperty("borderWidth", "20px");
        });

        it("should not warn when the size is equal to 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR size={0} />);
            const hr = wrapper.find(".NuiHR").first();
            expect(hr.prop("style")).toHaveProperty("borderWidth", "0px");
        });

        it("should warn when the size is under 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR size={-1} />);
            const hr = wrapper.find(".NuiHR").first();
            expect(hr.prop("style")).toHaveProperty("borderWidth", "-1px");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "HR size prop should not be below 0."
            );
        });
    });

    describe("spacing", () => {
        it("should use the default spacing value", () => {
            const wrapper = mount(<HR />);
            const hr = wrapper.find(".NuiHR").first();
            expect(hr.prop("className")).not.toContain("NuiHR--spacing");
        });

        it.each(["xs", "sm", "md", "xl"] as Nui.Breakpoint[])(
            "should use the %s spacing value",
            (bp) => {
                const wrapper = mount(<HR spacing={bp} />);
                const hr = wrapper.find(".NuiHR").first();
                expect(hr.hasClass(`NuiHR--spacing-${bp}`)).toBeTruthy();
            }
        );

        it("should use the custom spacing value", () => {
            const wrapper = mount(<HR spacing={20} />);
            const hr = wrapper.find(".NuiHR").first();
            const style = hr.prop("style");
            expect(style).toHaveProperty("marginTop", "20px");
            expect(style).toHaveProperty("marginBottom", "20px");
        });

        it("should not warn when the spacing is equal to 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR spacing={0} />);
            const hr = wrapper.find(".NuiHR").first();
            const style = hr.prop("style");
            expect(style).toHaveProperty("marginTop", "0px");
            expect(style).toHaveProperty("marginBottom", "0px");
            expect(console.warn).toHaveBeenCalledTimes(0);
        });

        it("should warn when the spacing is under 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR spacing={-1} />);
            const hr = wrapper.find(".NuiHR").first();
            const style = hr.prop("style");
            expect(style).toHaveProperty("marginTop", "-1px");
            expect(style).toHaveProperty("marginBottom", "-1px");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "HR spacing prop should not be below 0."
            );
        });
    });
});
