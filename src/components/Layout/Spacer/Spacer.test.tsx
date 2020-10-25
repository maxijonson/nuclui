import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import _ from "lodash";
import mockConsole from "jest-mock-console";
import Spacer from "./Spacer";
import "jest-styled-components";

describe("Spacer", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Spacer />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Spacer.displayName).toEqual("NuiSpacer");
    });

    describe("ref", () => {
        it("should use the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<Spacer ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<Spacer />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiSpacer")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<Spacer className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiSpacer")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("size", () => {
        it("should use the default size value", () => {
            const wrapper = mount(<Spacer />);
            const spacer = wrapper.find(".NuiSpacer").first();
            expect(spacer.hasClass("NuiSpacer--size-lg")).toBeTruthy();
        });

        _.forEach(["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[], (bp) => {
            it(`should use the ${bp} size value`, () => {
                const wrapper = mount(<Spacer size={bp} />);
                const spacer = wrapper.find(".NuiSpacer").first();
                expect(spacer.hasClass(`NuiSpacer--size-${bp}`)).toBeTruthy();
            });
        });

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
