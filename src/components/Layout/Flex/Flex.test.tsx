import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import Flex from "./Flex";
import "jest-styled-components";

describe("Flex", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Flex />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Flex.displayName).toEqual("NuiFlex");
    });

    describe("as", () => {
        it("should use button as root node", () => {
            const wrapper = mount(<Flex as="button" />);
            const root = wrapper.find("button").first();
            expect(root.length).toBe(1);
        });

        it("should use div as default root node", () => {
            const wrapper = mount(<Flex />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });

        it("should use div as root node", () => {
            const wrapper = mount(<Flex as="div" />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });
    });

    describe("ref", () => {
        it("should have the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<Flex ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });

        it("should have the ref forwarded to the overriden node", () => {
            const ref = React.createRef<HTMLButtonElement>();
            const wrapper = mount(<Flex as="button" ref={ref} />);
            const btn = wrapper.find("button").first().getDOMNode();
            expect(btn).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<Flex />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiFlex")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<Flex className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiFlex")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("inline", () => {
        it("should use the default inline value", () => {
            const wrapper = shallow(<Flex />);
            expect(wrapper).toHaveStyleRule("display", "flex");
        });

        it("should use display flex", () => {
            const wrapper = shallow(<Flex inline={false} />);
            expect(wrapper).toHaveStyleRule("display", "flex");
        });

        it("should use display inline-flex", () => {
            const wrapper = shallow(<Flex inline />);
            expect(wrapper).toHaveStyleRule("display", "inline-flex");
        });
    });

    describe("direction", () => {
        it("should use the default direction", () => {
            const wrapper = shallow(<Flex />);
            expect(wrapper).toHaveStyleRule("flex-direction", "row");
        });

        it("should use the row direction", () => {
            const wrapper = shallow(<Flex direction="row" />);
            expect(wrapper).toHaveStyleRule("flex-direction", "row");
        });

        it("should use the row-reverse direction", () => {
            const wrapper = shallow(<Flex direction="rowReverse" />);
            expect(wrapper).toHaveStyleRule("flex-direction", "row-reverse");
        });

        it("should use the column direction", () => {
            const wrapper = shallow(<Flex direction="column" />);
            expect(wrapper).toHaveStyleRule("flex-direction", "column");
        });

        it("should use the column-reverse direction", () => {
            const wrapper = shallow(<Flex direction="columnReverse" />);
            expect(wrapper).toHaveStyleRule("flex-direction", "column-reverse");
        });
    });

    describe("wrap", () => {
        it("should use the default wrap", () => {
            const wrapper = shallow(<Flex />);
            expect(wrapper).toHaveStyleRule("flex-wrap", "wrap");
        });

        it("should use the wrap wrap", () => {
            const wrapper = shallow(<Flex wrap="wrap" />);
            expect(wrapper).toHaveStyleRule("flex-wrap", "wrap");
        });

        it("should use the wrap-reverse wrap", () => {
            const wrapper = shallow(<Flex wrap="wrapReverse" />);
            expect(wrapper).toHaveStyleRule("flex-wrap", "wrap-reverse");
        });

        it("should use the nowrap wrap", () => {
            const wrapper = shallow(<Flex wrap="nowrap" />);
            expect(wrapper).toHaveStyleRule("flex-wrap", "nowrap");
        });
    });

    describe("justify", () => {
        it("should use the default justify", () => {
            const wrapper = shallow(<Flex />);
            expect(wrapper).toHaveStyleRule("justify-content", "center");
        });

        it("should use the center justify", () => {
            const wrapper = shallow(<Flex justify="center" />);
            expect(wrapper).toHaveStyleRule("justify-content", "center");
        });

        it("should use the flexStart justify", () => {
            const wrapper = shallow(<Flex justify="flexStart" />);
            expect(wrapper).toHaveStyleRule("justify-content", "flex-start");
        });

        it("should use the flexEnd justify", () => {
            const wrapper = shallow(<Flex justify="flexEnd" />);
            expect(wrapper).toHaveStyleRule("justify-content", "flex-end");
        });

        it("should use the start justify", () => {
            const wrapper = shallow(<Flex justify="start" />);
            expect(wrapper).toHaveStyleRule("justify-content", "start");
        });

        it("should use the left justify", () => {
            const wrapper = shallow(<Flex justify="left" />);
            expect(wrapper).toHaveStyleRule("justify-content", "left");
        });

        it("should use the right justify", () => {
            const wrapper = shallow(<Flex justify="right" />);
            expect(wrapper).toHaveStyleRule("justify-content", "right");
        });

        it("should use the spaceBetween justify", () => {
            const wrapper = shallow(<Flex justify="spaceBetween" />);
            expect(wrapper).toHaveStyleRule("justify-content", "space-between");
        });

        it("should use the spaceAround justify", () => {
            const wrapper = shallow(<Flex justify="spaceAround" />);
            expect(wrapper).toHaveStyleRule("justify-content", "space-around");
        });

        it("should use the spaceEvenly justify", () => {
            const wrapper = shallow(<Flex justify="spaceEvenly" />);
            expect(wrapper).toHaveStyleRule("justify-content", "space-evenly");
        });
    });

    describe("align", () => {
        it("should use the default align", () => {
            const wrapper = shallow(<Flex />);
            expect(wrapper).toHaveStyleRule("align-items", "stretch");
        });

        it("should use the stretch align", () => {
            const wrapper = shallow(<Flex align="stretch" />);
            expect(wrapper).toHaveStyleRule("align-items", "stretch");
        });

        it("should use the flexStart align", () => {
            const wrapper = shallow(<Flex align="flexStart" />);
            expect(wrapper).toHaveStyleRule("align-items", "flex-start");
        });

        it("should use the start align", () => {
            const wrapper = shallow(<Flex align="start" />);
            expect(wrapper).toHaveStyleRule("align-items", "start");
        });

        it("should use the selfStart align", () => {
            const wrapper = shallow(<Flex align="selfStart" />);
            expect(wrapper).toHaveStyleRule("align-items", "self-start");
        });

        it("should use the flexEnd align", () => {
            const wrapper = shallow(<Flex align="flexEnd" />);
            expect(wrapper).toHaveStyleRule("align-items", "flex-end");
        });

        it("should use the end align", () => {
            const wrapper = shallow(<Flex align="end" />);
            expect(wrapper).toHaveStyleRule("align-items", "end");
        });

        it("should use the selfEnd align", () => {
            const wrapper = shallow(<Flex align="selfEnd" />);
            expect(wrapper).toHaveStyleRule("align-items", "self-end");
        });

        it("should use the center align", () => {
            const wrapper = shallow(<Flex align="center" />);
            expect(wrapper).toHaveStyleRule("align-items", "center");
        });

        it("should use the baseline align", () => {
            const wrapper = shallow(<Flex align="baseline" />);
            expect(wrapper).toHaveStyleRule("align-items", "baseline");
        });
    });
});
