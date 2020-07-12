import React from "react";
import ReactDOM from "react-dom";
import Fonts from "./Fonts";

describe("Fonts", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Fonts />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Fonts.displayName).toEqual("NuiFonts");
    });
});
