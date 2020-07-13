import React from "react";
import ReactDOM from "react-dom";
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
});
