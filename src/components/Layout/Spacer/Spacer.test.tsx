import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
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
            const wrapper = shallow(<Spacer />);
            expect(wrapper).toHaveStyleRule("height", "32px");
        });

        it("should use the xs size value", () => {
            const wrapper = shallow(<Spacer size="xs" />);
            expect(wrapper).toHaveStyleRule("height", "4px");
        });

        it("should use the sm size value", () => {
            const wrapper = shallow(<Spacer size="sm" />);
            expect(wrapper).toHaveStyleRule("height", "8px");
        });

        it("should use the md size value", () => {
            const wrapper = shallow(<Spacer size="md" />);
            expect(wrapper).toHaveStyleRule("height", "16px");
        });

        it("should use the lg size value", () => {
            const wrapper = shallow(<Spacer size="lg" />);
            expect(wrapper).toHaveStyleRule("height", "32px");
        });

        it("should use the xl size value", () => {
            const wrapper = shallow(<Spacer size="xl" />);
            expect(wrapper).toHaveStyleRule("height", "64px");
        });

        it("should use the custom size value", () => {
            const wrapper = shallow(<Spacer size={20} />);
            expect(wrapper).toHaveStyleRule("height", "20px");
        });

        it("should not warn when the size is equal to 0", () => {
            mockConsole("warn");
            const wrapper = mount(<Spacer size={0} />);
            expect(wrapper).toHaveStyleRule("height", "0px");
            expect(console.warn).toHaveBeenCalledTimes(0);
        });

        it("should warn when the size is under 0", () => {
            mockConsole("warn");
            const wrapper = mount(<Spacer size={-1} />);
            expect(wrapper).toHaveStyleRule("height", "-1px");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "Spacer size prop should not be below 0."
            );
        });
    });
});
