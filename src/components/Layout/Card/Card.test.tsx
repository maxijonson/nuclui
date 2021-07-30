import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { createBasicTests } from "@utils/test";
import Card from "./Card";
import "jest-styled-components";
import { CardProps } from "./types";

const {
    testClassName,
    testComponent,
    testDisplayName,
    testRef,
    testRendering,
} = createBasicTests(Card, {});

describe("Card", () => {
    testRendering();
    testDisplayName("NuiStyledCard", "NuiCard");
    testComponent("div", "span");
    testRef("div", "button");
    testClassName("div", "NuiCard");

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
