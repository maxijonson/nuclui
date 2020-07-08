import React from "react";
import ReactDOM from "react-dom";
import Normalize from "./Normalize";

describe("Normalize", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Normalize />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Normalize.displayName).toEqual("NuiNormalize");
    });
});
