import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
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
            const wrapper = shallow(<HR />);
            expect(wrapper).toHaveStyleRule("border-width", "1px");
        });

        it("should use the xs size value", () => {
            const wrapper = shallow(<HR size="xs" />);
            expect(wrapper).toHaveStyleRule("border-width", "1px");
        });

        it("should use the sm size value", () => {
            const wrapper = shallow(<HR size="sm" />);
            expect(wrapper).toHaveStyleRule("border-width", "2px");
        });

        it("should use the md size value", () => {
            const wrapper = shallow(<HR size="md" />);
            expect(wrapper).toHaveStyleRule("border-width", "4px");
        });

        it("should use the lg size value", () => {
            const wrapper = shallow(<HR size="lg" />);
            expect(wrapper).toHaveStyleRule("border-width", "6px");
        });

        it("should use the xl size value", () => {
            const wrapper = shallow(<HR size="xl" />);
            expect(wrapper).toHaveStyleRule("border-width", "8px");
        });

        it("should use the custom size value", () => {
            const wrapper = shallow(<HR size={20} />);
            expect(wrapper).toHaveStyleRule("border-width", "20px");
        });

        it("should not warn when the size is equal to 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR size={0} />);
            expect(wrapper).toHaveStyleRule("border-width", "0px");
            expect(console.warn).toHaveBeenCalledTimes(0);
        });

        it("should warn when the size is under 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR size={-1} />);
            expect(wrapper).toHaveStyleRule("border-width", "-1px");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "HR size prop should not be below 0."
            );
        });
    });

    describe("spacing", () => {
        it("should use the default spacing value", () => {
            const wrapper = shallow(<HR />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "16px");
        });

        it("should use the xs spacing value", () => {
            const wrapper = shallow(<HR spacing="xs" />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "2px");
        });

        it("should use the sm spacing value", () => {
            const wrapper = shallow(<HR spacing="sm" />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "4px");
        });

        it("should use the md spacing value", () => {
            const wrapper = shallow(<HR spacing="md" />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "8px");
        });

        it("should use the lg spacing value", () => {
            const wrapper = shallow(<HR spacing="lg" />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "16px");
        });

        it("should use the xl spacing value", () => {
            const wrapper = shallow(<HR spacing="xl" />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "32px");
        });

        it("should use the custom spacing value", () => {
            const wrapper = shallow(<HR spacing={20} />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "20px");
        });

        it("should not warn when the spacing is equal to 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR spacing={0} />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "0px");
            expect(console.warn).toHaveBeenCalledTimes(0);
        });

        it("should warn when the spacing is under 0", () => {
            mockConsole("warn");
            const wrapper = mount(<HR spacing={-1} />);
            expect(wrapper).toHaveStyleRule("--nui-hr-spacing", "-1px");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "HR spacing prop should not be below 0."
            );
        });
    });
});
