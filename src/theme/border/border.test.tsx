import React from "react";
import styled from "styled-components";
import { shallow } from "enzyme";
import { primary, secondary } from "./index";
import defaultTheme from "../defaultTheme";
import "jest-styled-components";

const varPrimary = "--nui-border-primary";
const Primary = styled.div`
    ${primary}
`;

const varSecondary = "--nui-border-secondary";
const Secondary = styled.div`
    ${secondary}
`;

describe("theme/border", () => {
    it("should use the default primary theme color", () => {
        const wrapper = shallow(<Primary />);
        expect(wrapper).toHaveStyleRule(
            varPrimary,
            defaultTheme.border.primary
        );
        expect(wrapper).toHaveStyleRule("border-color", `var(${varPrimary})`);
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Primary theme={{ nui: { border: { primary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule(varPrimary, color);
        expect(wrapper).toHaveStyleRule("border-color", `var(${varPrimary})`);
    });

    it("should use the default secondary theme color", () => {
        const wrapper = shallow(<Secondary />);
        expect(wrapper).toHaveStyleRule(
            varSecondary,
            defaultTheme.border.secondary
        );
        expect(wrapper).toHaveStyleRule("border-color", `var(${varSecondary})`);
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Secondary theme={{ nui: { border: { secondary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule(varSecondary, color);
        expect(wrapper).toHaveStyleRule("border-color", `var(${varSecondary})`);
    });
});
