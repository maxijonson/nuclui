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

describe("theme/box-shadow", () => {
    it("should use the default primary theme color", () => {
        const wrapper = shallow(<Primary />);
        expect(wrapper).toHaveStyleRule(
            "--nui-shadow",
            defaultTheme.shadow.primary
        );
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Primary theme={{ nui: { shadow: { primary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule("--nui-shadow", color);
    });

    it("should use the default secondary theme color", () => {
        const wrapper = shallow(<Secondary />);
        expect(wrapper).toHaveStyleRule(
            "--nui-shadow",
            defaultTheme.shadow.secondary
        );
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Secondary theme={{ nui: { shadow: { secondary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule("--nui-shadow", color);
    });
});
