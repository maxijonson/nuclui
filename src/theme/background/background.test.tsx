import React from "react";
import styled from "styled-components";
import { shallow } from "enzyme";
import { primary, secondary, dimmed } from "./index";
import defaultTheme from "../defaultTheme";
import "jest-styled-components";

const varPrimary = "--nui-background-primary";
const Primary = styled.div`
    ${primary}
`;

const varSecondary = "--nui-background-secondary";
const Secondary = styled.div`
    ${secondary}
`;

const varDimmed = "--nui-background-dimmed";
const Dimmed = styled.div`
    ${dimmed}
`;

describe("theme/background", () => {
    it("should use the default primary theme color", () => {
        const wrapper = shallow(<Primary />);
        expect(wrapper).toHaveStyleRule(
            varPrimary,
            defaultTheme.background.primary
        );
        expect(wrapper).toHaveStyleRule(
            "background-color",
            `var(${varPrimary})`
        );
    });

    it("should use the provided primary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Primary theme={{ nui: { background: { primary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule(varPrimary, color);
        expect(wrapper).toHaveStyleRule(
            "background-color",
            `var(${varPrimary})`
        );
    });

    it("should use the default secondary theme color", () => {
        const wrapper = shallow(<Secondary />);
        expect(wrapper).toHaveStyleRule(
            varSecondary,
            defaultTheme.background.secondary
        );
        expect(wrapper).toHaveStyleRule(
            "background-color",
            `var(${varSecondary})`
        );
    });

    it("should use the provided secondary theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Secondary theme={{ nui: { background: { secondary: color } } }} />
        );
        expect(wrapper).toHaveStyleRule(varSecondary, color);
        expect(wrapper).toHaveStyleRule(
            "background-color",
            `var(${varSecondary})`
        );
    });

    it("should use the default dimmed theme color", () => {
        const wrapper = shallow(<Dimmed />);
        expect(wrapper).toHaveStyleRule(
            varDimmed,
            defaultTheme.background.dimmed
        );
        expect(wrapper).toHaveStyleRule(
            "background-color",
            `var(${varDimmed})`
        );
    });

    it("should use the provided dimmed theme color", () => {
        const color = "#FF00FF";
        const wrapper = shallow(
            <Dimmed theme={{ nui: { background: { dimmed: color } } }} />
        );
        expect(wrapper).toHaveStyleRule(varDimmed, color);
        expect(wrapper).toHaveStyleRule(
            "background-color",
            `var(${varDimmed})`
        );
    });
});
