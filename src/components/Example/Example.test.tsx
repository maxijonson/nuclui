import React from "react";
import ReactDOM from "react-dom";
import Example from "./Example";

describe("App", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Example />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Example.displayName).toEqual("NuiExample");
    });
});
