import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import mockConsole from "jest-mock-console";
import FlexItem from "./FlexItem";
import "jest-styled-components";

describe("Flex", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<FlexItem />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(FlexItem.displayName).toEqual("NuiFlexItem");
    });

    describe("as", () => {
        it("should use button as root node", () => {
            const wrapper = mount(<FlexItem as="button" />);
            const root = wrapper.find("button").first();
            expect(root.length).toBe(1);
        });

        it("should use div as default root node", () => {
            const wrapper = mount(<FlexItem />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });

        it("should use div as root node", () => {
            const wrapper = mount(<FlexItem as="div" />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });
    });

    describe("ref", () => {
        it("should have the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<FlexItem ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });

        it("should have the ref forwarded to the overriden node", () => {
            const ref = React.createRef<HTMLButtonElement>();
            const wrapper = mount(<FlexItem as="button" ref={ref} />);
            const btn = wrapper.find("button").first().getDOMNode();
            expect(btn).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<FlexItem />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiFlexItem")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<FlexItem className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiFlexItem")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("grow", () => {
        it("should have the default grow value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("flex-grow", "1");
        });

        it("should have the grow value of 2", () => {
            const wrapper = shallow(<FlexItem grow={2} />);
            expect(wrapper).toHaveStyleRule("flex-grow", "2");
        });

        it("should warn when using the grow value of -1", () => {
            mockConsole("warn");
            const wrapper = mount(<FlexItem grow={-1} />);
            expect(wrapper).toHaveStyleRule("flex-grow", "-1");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem grow prop should not be below 0."
            );
        });
    });

    describe("order", () => {
        it("should have the default order value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("order", "0");
        });

        it("should have the order value of 1", () => {
            const wrapper = shallow(<FlexItem order={1} />);
            expect(wrapper).toHaveStyleRule("order", "1");
        });

        it("should have the order value of -1", () => {
            const wrapper = shallow(<FlexItem order={-1} />);
            expect(wrapper).toHaveStyleRule("order", "-1");
        });
    });

    describe("shrink", () => {
        it("should have the default shrink value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("flex-shrink", "1");
        });

        it("should have the shrink value of 2", () => {
            const wrapper = shallow(<FlexItem shrink={2} />);
            expect(wrapper).toHaveStyleRule("flex-shrink", "2");
        });

        it("should warn when using the shrink value of -1", () => {
            mockConsole("warn");
            const wrapper = mount(<FlexItem shrink={-1} />);
            expect(wrapper).toHaveStyleRule("flex-shrink", "-1");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem shrink prop should not be below 0."
            );
        });
    });

    describe("basis", () => {
        it("should use the default basis value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("flex-basis", "auto");
        });

        it("should use a custom basis value", () => {
            const wrapper = shallow(<FlexItem basis="25px" />);
            expect(wrapper).toHaveStyleRule("flex-basis", "25px");
        });
    });

    describe("align", () => {
        it("should use the default align value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("align-self", "auto");
        });

        it("should use the auto align value", () => {
            const wrapper = shallow(<FlexItem align="auto" />);
            expect(wrapper).toHaveStyleRule("align-self", "auto");
        });

        it("should use the flexStart align value", () => {
            const wrapper = shallow(<FlexItem align="flexStart" />);
            expect(wrapper).toHaveStyleRule("align-self", "flex-start");
        });

        it("should use the flexEnd align value", () => {
            const wrapper = shallow(<FlexItem align="flexEnd" />);
            expect(wrapper).toHaveStyleRule("align-self", "flex-end");
        });

        it("should use the center align value", () => {
            const wrapper = shallow(<FlexItem align="center" />);
            expect(wrapper).toHaveStyleRule("align-self", "center");
        });

        it("should use the baseline align value", () => {
            const wrapper = shallow(<FlexItem align="baseline" />);
            expect(wrapper).toHaveStyleRule("align-self", "baseline");
        });

        it("should use the stretch align value", () => {
            const wrapper = shallow(<FlexItem align="stretch" />);
            expect(wrapper).toHaveStyleRule("align-self", "stretch");
        });
    });
});
