import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "../../theme/defaultTheme";
import Root from "./Root";

describe("Root", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Root>
                <div />
            </Root>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Root.displayName).toEqual("NuiRoot");
    });

    it("should have default theme when none is provided", () => {
        const wrapper = shallow(
            <Root>
                <div />
            </Root>
        );
        expect(wrapper.find(ThemeProvider).prop("theme")).toEqual({
            nui: defaultTheme,
        });
    });

    it("should merge the default theme with the provided theme", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Root theme={{ background: { primary: color } }}>
                <div />
            </Root>
        );
        expect(wrapper.find(ThemeProvider).prop("theme")).toEqual({
            nui: {
                ...defaultTheme,
                background: { ...defaultTheme.background, primary: color },
            },
        });
    });
});
