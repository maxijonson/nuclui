import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
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
        const wrapper = shallow(
            <Container as="button">A button container</Container>
        );
        expect(wrapper.getElements()[0].type).toBe("button");
    });
});
