import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Container from "./Container";

describe("Container", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Container />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Container.displayName).toEqual("NuiContainer");
    });

    it("should use button as root node", () => {
        const text = "A button container";
        const wrapper = mount(<Container component="button">{text}</Container>);
        const root = wrapper.find("button").first();
        expect(root.length).toBe(1);
        expect(root.children().text()).toBe(text);
    });

    it("should use div as default root node", () => {
        const text = "A default container";
        const wrapper = mount(<Container>{text}</Container>);
        const root = wrapper.find("div").first();
        expect(root.length).toBe(1);
        expect(root.children().text()).toBe(text);
    });
});
