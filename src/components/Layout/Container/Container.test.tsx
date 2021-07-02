import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { createBasicTests } from "@utils/test";
import Container from "./Container";
import "jest-styled-components";
import { ContainerProps } from "./types";

const {
    testClassName,
    testComponent,
    testDisplayName,
    testRef,
    testRendering,
} = createBasicTests(Container, {});

describe("Container", () => {
    testRendering();
    testDisplayName("NuiStyledContainer", "NuiContainer");
    testComponent("div");
    testRef("div", "button");
    testClassName("div", "NuiContainer");

    describe("maxWidth", () => {
        const assertMaxWidth = (
            maxWidth: ContainerProps["maxWidth"],
            wrapper: ReactWrapper
        ) => {
            const container = wrapper.find(".NuiContainer").first();
            if (!maxWidth) {
                return expect(container.prop("className")).not.toContain(
                    "NuiContainer--maxWidth"
                );
            }
            expect(
                container.hasClass(`NuiContainer--maxWidth-${maxWidth}`)
            ).toBeTruthy();
        };

        it("should use the default maxWidth", () => {
            assertMaxWidth(undefined, mount(<Container />));
        });

        it("should use the xs maxWidth", () => {
            assertMaxWidth("xs", mount(<Container maxWidth="xs" />));
        });

        it("should use the sm maxWidth", () => {
            assertMaxWidth("sm", mount(<Container maxWidth="sm" />));
        });

        it("should use the md maxWidth", () => {
            assertMaxWidth("md", mount(<Container maxWidth="md" />));
        });

        it("should use the lg maxWidth", () => {
            assertMaxWidth("lg", mount(<Container maxWidth="lg" />));
        });

        it("should use the xl maxWidth", () => {
            assertMaxWidth("xl", mount(<Container maxWidth="xl" />));
        });
    });

    describe("maxPadding", () => {
        const assertMaxPadding = (
            maxPadding: ContainerProps["maxPadding"],
            wrapper: ReactWrapper
        ) => {
            const container = wrapper.find(".NuiContainer").first();
            if (!maxPadding) {
                return expect(container.prop("className")).not.toContain(
                    "NuiContainer--maxPadding"
                );
            }
            expect(
                container.hasClass(`NuiContainer--maxPadding-${maxPadding}`)
            ).toBeTruthy();
        };

        it("should use the default padding", () => {
            assertMaxPadding(undefined, mount(<Container />));
        });

        it("should use no padding", () => {
            assertMaxPadding("none", mount(<Container maxPadding="none" />));
        });

        it("should use the xs maxPadding", () => {
            assertMaxPadding("xs", mount(<Container maxPadding="xs" />));
        });

        it("should use the sm maxPadding", () => {
            assertMaxPadding("sm", mount(<Container maxPadding="sm" />));
        });

        it("should use the md maxPadding", () => {
            assertMaxPadding("md", mount(<Container maxPadding="md" />));
        });

        it("should use the lg maxPadding", () => {
            assertMaxPadding("lg", mount(<Container maxPadding="lg" />));
        });

        it("should use the xl maxPadding", () => {
            assertMaxPadding("xl", mount(<Container maxPadding="xl" />));
        });
    });

    describe("fixed", () => {
        const assertFixed = (
            fixed: ContainerProps["fixed"],
            wrapper: ReactWrapper
        ) => {
            const container = wrapper.find(".NuiContainer").first();
            if (!fixed) {
                return expect(container.prop("className")).not.toContain(
                    "NuiContainer--fixed"
                );
            }
            expect(container.hasClass("NuiContainer--fixed")).toBeTruthy();
        };

        it("should use the default fixed prop", () => {
            assertFixed(undefined, mount(<Container />));
        });

        it("should use the true fixed prop", () => {
            assertFixed(true, mount(<Container fixed />));
        });

        it("should use the false fixed prop", () => {
            assertFixed(false, mount(<Container fixed={false} />));
        });
    });
});
