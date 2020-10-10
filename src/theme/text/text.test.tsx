import React from "react";
import styled from "styled-components";
import { shallow } from "enzyme";
import { primary, secondary } from "./index";
import defaultTheme from "../defaultTheme";
import "jest-styled-components";

const varPrimary = "--nui-text-primary";
const Primary = styled.div`
    ${primary}
`;

const varSecondary = "--nui-text-secondary";
const Secondary = styled.div`
    ${secondary}
`;

describe("theme/text", () => {
    it("should use the default primary theme color", () => {
        const wrapper = shallow(<Primary />);
        expect(wrapper).toHaveStyleRule(varPrimary, defaultTheme.text.primary);
        expect(wrapper).toHaveStyleRule("color", `var(${varPrimary})`);
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Primary theme={{ nui: { text: { primary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule(varPrimary, color);
        expect(wrapper).toHaveStyleRule("color", `var(${varPrimary})`);
    });

    it("should use the default secondary theme color", () => {
        const wrapper = shallow(<Secondary />);
        expect(wrapper).toHaveStyleRule(
            varSecondary,
            defaultTheme.text.secondary
        );
        expect(wrapper).toHaveStyleRule("color", `var(${varSecondary})`);
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Secondary theme={{ nui: { text: { secondary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule(varSecondary, color);
        expect(wrapper).toHaveStyleRule("color", `var(${varSecondary})`);
    });
});
