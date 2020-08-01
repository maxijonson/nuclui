import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import Card from "./Card";
import "jest-styled-components";

describe("Card", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Card />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Card.displayName).toEqual("NuiCard");
    });

    describe("component", () => {
        it("should use button as root node", () => {
            const wrapper = mount(<Card component="button" />);
            const root = wrapper.find("button").first();
            expect(root.length).toBe(1);
        });

        it("should use div as default root node", () => {
            const wrapper = mount(<Card />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });

        it("should use div as root node", () => {
            const wrapper = mount(<Card component="div" />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });
    });

    describe("ref", () => {
        it("should have the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<Card ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });

        it("should have the ref forwarded to the overriden node", () => {
            const ref = React.createRef<HTMLButtonElement>();
            const wrapper = mount(<Card component="button" ref={ref} />);
            const btn = wrapper.find("button").first().getDOMNode();
            expect(btn).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<Card />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiCard")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<Card className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiCard")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("padding", () => {
        it("should have the default padding value", () => {
            const wrapper = shallow(<Card />);
            expect(wrapper).toHaveStyleRule("padding", "21px");
        });

        it("should have the xs padding value", () => {
            const wrapper = shallow(<Card padding="xs" />);
            expect(wrapper).toHaveStyleRule("padding", "4px");
        });

        it("should have the sm padding value", () => {
            const wrapper = shallow(<Card padding="sm" />);
            expect(wrapper).toHaveStyleRule("padding", "12px");
        });

        it("should have the md padding value", () => {
            const wrapper = shallow(<Card padding="md" />);
            expect(wrapper).toHaveStyleRule("padding", "21px");
        });

        it("should have the lg padding value", () => {
            const wrapper = shallow(<Card padding="lg" />);
            expect(wrapper).toHaveStyleRule("padding", "32px");
        });

        it("should have the xl padding value", () => {
            const wrapper = shallow(<Card padding="xl" />);
            expect(wrapper).toHaveStyleRule("padding", "64px");
        });

        it("should have the none padding value", () => {
            const wrapper = shallow(<Card padding="none" />);
            expect(wrapper).toHaveStyleRule("padding", undefined);
        });

        it("should have the custom padding value", () => {
            const wrapper = shallow(<Card padding={1337} />);
            expect(wrapper).toHaveStyleRule("padding", "1337px");
        });
    });

    describe("disableShadow", () => {
        it("should have the default disableShadow value", () => {
            const wrapper = shallow(<Card />);
            expect(wrapper).not.toHaveStyleRule("box-shadow", undefined);
        });

        it("should have the false disableShadow value", () => {
            const wrapper = shallow(<Card disableShadow={false} />);
            expect(wrapper).not.toHaveStyleRule("box-shadow", undefined);
        });

        it("should have the true disableShadow value", () => {
            const wrapper = shallow(<Card disableShadow />);
            expect(wrapper).not.toHaveStyleRule("box-shadow");
        });
    });
    describe("outline", () => {
        it("should have the default outline value", () => {
            const wrapper = shallow(<Card />);
            expect(wrapper).toHaveStyleRule("border-style", "solid");
        });

        it("should have the solid outline value", () => {
            const wrapper = shallow(<Card outline="solid" />);
            expect(wrapper).toHaveStyleRule("border-style", "solid");
        });

        it("should have the dashed outline value", () => {
            const wrapper = shallow(<Card outline="dashed" />);
            expect(wrapper).toHaveStyleRule("border-style", "dashed");
        });

        it("should have the dotted outline value", () => {
            const wrapper = shallow(<Card outline="dotted" />);
            expect(wrapper).toHaveStyleRule("border-style", "dotted");
        });

        it("should have the double outline value", () => {
            const wrapper = shallow(<Card outline="double" />);
            expect(wrapper).toHaveStyleRule("border-style", "double");
        });

        it("should have the groove outline value", () => {
            const wrapper = shallow(<Card outline="groove" />);
            expect(wrapper).toHaveStyleRule("border-style", "groove");
        });

        it("should have the none outline value", () => {
            const wrapper = shallow(<Card outline="none" />);
            expect(wrapper).toHaveStyleRule("border-style", "none");
        });

        it("should have the hidden outline value", () => {
            const wrapper = shallow(<Card outline="hidden" />);
            expect(wrapper).toHaveStyleRule("border-style", "hidden");
        });

        it("should have the inset outline value", () => {
            const wrapper = shallow(<Card outline="inset" />);
            expect(wrapper).toHaveStyleRule("border-style", "inset");
        });

        it("should have the outset outline value", () => {
            const wrapper = shallow(<Card outline="outset" />);
            expect(wrapper).toHaveStyleRule("border-style", "outset");
        });

        it("should have the ridge outline value", () => {
            const wrapper = shallow(<Card outline="ridge" />);
            expect(wrapper).toHaveStyleRule("border-style", "ridge");
        });
    });
});
