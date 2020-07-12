import React from "react";
import ReactDOM from "react-dom";
import Page from "./Page";

describe("Page", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Page />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Page.displayName).toEqual("NuiPage");
    });
});
