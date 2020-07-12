import React from "react";
import styled from "styled-components";
import { shallow } from "enzyme";
import { primary, secondary } from "./index";
import defaultTheme from "../defaultTheme";
import "jest-styled-components";

const Primary = styled.div`
    ${primary}
`;

const Secondary = styled.div`
    ${secondary}
`;

describe("theme/background", () => {
    it("should use the default primary theme color", () => {
        const wrapper = shallow(<Primary />);
        expect(wrapper).toHaveStyleRule(
            "background-color",
            defaultTheme.background.primary
        );
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Primary theme={{ nui: { background: { primary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule("background-color", color);
    });

    it("should use the default secondary theme color", () => {
        const wrapper = shallow(<Secondary />);
        expect(wrapper).toHaveStyleRule(
            "background-color",
            defaultTheme.background.secondary
        );
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Secondary theme={{ nui: { background: { secondary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule("background-color", color);
    });
});
