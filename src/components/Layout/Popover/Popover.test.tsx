import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import Popover from "./Popover";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Popover, {});

describe("Popover", () => {
    testRendering();
    testDisplayName("NuiStyledPopover", "NuiPopover");
    testRef("div");
    testClassName("div", "NuiPopover");

    describe("position", () => {
        const modifier = "NuiPopover--position";

        it("should use the default position value", () => {
            const wrapper = mount(<Popover />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each(["top", "right", "bottom", "left", "center"] as const)(
            "should use the '%s' position value",
            (position) => {
                const wrapper = mount(<Popover position={position} />);

                if (position === "top") {
                    expect(wrapper.getDOMNode().className).not.toContain(
                        modifier
                    );
                } else {
                    expect(
                        wrapper.render().hasClass(`${modifier}-${position}`)
                    ).toBeTruthy();
                }
            }
        );
    });

    describe("spacing", () => {
        const modifier = "NuiPopover--spacing";

        it("should use the default spacing value", () => {
            const wrapper = mount(<Popover />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each(["none", "xs", "sm", "md", "lg", "xl"] as const)(
            "should use the '%s' spacing value",
            (spacing) => {
                const wrapper = mount(<Popover spacing={spacing} />);

                if (spacing === "xs") {
                    expect(wrapper.getDOMNode().className).not.toContain(
                        modifier
                    );
                } else {
                    expect(
                        wrapper.render().hasClass(`${modifier}-${spacing}`)
                    ).toBeTruthy();
                }
            }
        );
    });

    describe("open", () => {
        it("should use the default open value", () => {
            const wrapper = mount(<Popover />);
            expect(wrapper.getDOMNode().className).toContain(
                "NuiPopover--open"
            );
        });

        it("should use the true open value", () => {
            const wrapper = mount(<Popover open />);
            expect(wrapper.getDOMNode().className).toContain(
                "NuiPopover--open"
            );
        });

        it("should use the false open value", () => {
            const wrapper = mount(<Popover open={false} />);
            expect(wrapper.getDOMNode().className).not.toContain(
                "NuiPopover--open"
            );
        });
    });
});
