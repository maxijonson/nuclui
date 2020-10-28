import React from "react";
import ReactDOM from "react-dom";
import { mount, ReactWrapper } from "enzyme";
import Card from "./Card";
import "jest-styled-components";
import { CardProps } from "./types";

describe("Card", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Card />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Card.displayName).toEqual("NuiCard");
    });

    describe("component", () => {
        it("should use button as root node", () => {
            const wrapper = mount(<Card component="button" />);
            const root = wrapper.find("button").first();
            expect(root.length).toBe(1);
        });

        it("should use div as default root node", () => {
            const wrapper = mount(<Card />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });

        it("should use div as root node", () => {
            const wrapper = mount(<Card component="div" />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });
    });

    describe("ref", () => {
        it("should have the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<Card ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });

        it("should have the ref forwarded to the overriden node", () => {
            const ref = React.createRef<HTMLButtonElement>();
            const wrapper = mount(<Card component="button" ref={ref} />);
            const btn = wrapper.find("button").first().getDOMNode();
            expect(btn).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<Card />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiCard")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<Card className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiCard")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("padding", () => {
        const assertPadding = (
            padding: CardProps["padding"],
            wrapper: ReactWrapper
        ) => {
            const card = wrapper.find(".NuiCard").first();
            if (!padding) {
                return expect(card.prop("className")).not.toContain(
                    "NuiCard--padding"
                );
            }
            expect(card.hasClass(`NuiCard--padding-${padding}`)).toBeTruthy();
        };

        it("should have the default padding value", () => {
            assertPadding(undefined, mount(<Card />));
        });

        it("should have the xs padding value", () => {
            assertPadding("xs", mount(<Card padding="xs" />));
        });

        it("should have the sm padding value", () => {
            assertPadding("sm", mount(<Card padding="sm" />));
        });

        it("should have the md padding value", () => {
            assertPadding(undefined, mount(<Card padding="md" />));
        });

        it("should have the lg padding value", () => {
            assertPadding("lg", mount(<Card padding="lg" />));
        });

        it("should have the xl padding value", () => {
            assertPadding("xl", mount(<Card padding="xl" />));
        });

        it("should have the none padding value", () => {
            assertPadding("none", mount(<Card padding="none" />));
        });
    });

    describe("disableShadow", () => {
        const assertShadow = (
            shadow: CardProps["disableShadow"],
            wrapper: ReactWrapper
        ) => {
            const card = wrapper.find(".NuiCard").first();
            if (!shadow) {
                return expect(card.prop("className")).not.toContain(
                    "NuiCard--no-shadow"
                );
            }
            expect(card.hasClass("NuiCard--no-shadow")).toBeTruthy();
        };

        it("should have the default disableShadow value", () => {
            assertShadow(undefined, mount(<Card />));
        });

        it("should have the false disableShadow value", () => {
            assertShadow(false, mount(<Card disableShadow={false} />));
        });

        it("should have the true disableShadow value", () => {
            assertShadow(true, mount(<Card disableShadow />));
        });
    });
});
