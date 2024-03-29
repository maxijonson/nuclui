import React from "react";
import { mount, shallow } from "enzyme";
import { createBasicTests } from "@utils/test";
import Flex from "./Flex";
import "jest-styled-components";

const {
    testClassName,
    testComponent,
    testDisplayName,
    testRef,
    testRendering,
} = createBasicTests(Flex, {});

describe("Flex", () => {
    testRendering();
    testDisplayName("NuiStyledFlex", "NuiFlex");
    testComponent("div");
    testRef("div", "button");
    testClassName("div", "NuiFlex");

    describe("inline", () => {
        it("should use the default inline value", () => {
            const wrapper = shallow(<Flex />);
            expect(wrapper).toHaveStyleRule("display", "flex");
        });

        it("should use display flex", () => {
            const wrapper = shallow(<Flex inline={false} />);
            expect(wrapper).toHaveStyleRule("display", "flex");
        });

        it("should use display inline-flex", () => {
            const wrapper = shallow(<Flex inline />);
            expect(wrapper).toHaveStyleRule("display", "inline-flex");
        });
    });

    describe("direction", () => {
        it("should use the default direction", () => {
            const wrapper = mount(<Flex />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("className")).not.toContain("NuiHR--dir");
        });

        it("should use the row direction", () => {
            const wrapper = mount(<Flex direction="row" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("className")).not.toContain("NuiHR--dir");
        });

        it("should use the row-reverse direction", () => {
            const wrapper = mount(<Flex direction="rowReverse" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--dir-rr")).toBeTruthy();
        });

        it("should use the column direction", () => {
            const wrapper = mount(<Flex direction="column" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--dir-c")).toBeTruthy();
        });

        it("should use the column-reverse direction", () => {
            const wrapper = mount(<Flex direction="columnReverse" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--dir-cr")).toBeTruthy();
        });
    });

    describe("wrap", () => {
        it("should use the default wrap", () => {
            const wrapper = mount(<Flex />);
            const flex = wrapper.find(".NuiFlex");
            expect(flex.prop("className")).not.toContain("NuiHR--wrap");
        });

        it("should use the wrap wrap", () => {
            const wrapper = mount(<Flex wrap="wrap" />);
            const flex = wrapper.find(".NuiFlex");
            expect(flex.prop("className")).not.toContain("NuiHR--wrap");
        });

        it("should use the wrap-reverse wrap", () => {
            const wrapper = mount(<Flex wrap="wrapReverse" />);
            const flex = wrapper.find(".NuiFlex");
            expect(flex.hasClass("NuiFlex--wrap-wr")).toBeTruthy();
        });

        it("should use the nowrap wrap", () => {
            const wrapper = mount(<Flex wrap="nowrap" />);
            const flex = wrapper.find(".NuiFlex");
            expect(flex.hasClass("NuiFlex--wrap-no")).toBeTruthy();
        });
    });

    describe("justify", () => {
        it("should use the default justify", () => {
            const wrapper = mount(<Flex />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("className")).not.toContain("NuiHR--jc");
        });

        it("should use the center justify", () => {
            const wrapper = mount(<Flex justify="center" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("className")).not.toContain("NuiHR--jc");
        });

        it("should use the flexStart justify", () => {
            const wrapper = mount(<Flex justify="flexStart" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-fstart")).toBeTruthy();
        });

        it("should use the flexEnd justify", () => {
            const wrapper = mount(<Flex justify="flexEnd" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-fend")).toBeTruthy();
        });

        it("should use the start justify", () => {
            const wrapper = mount(<Flex justify="start" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-start")).toBeTruthy();
        });

        it("should use the end justify", () => {
            const wrapper = mount(<Flex justify="end" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-end")).toBeTruthy();
        });

        it("should use the left justify", () => {
            const wrapper = mount(<Flex justify="left" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-left")).toBeTruthy();
        });

        it("should use the right justify", () => {
            const wrapper = mount(<Flex justify="right" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-right")).toBeTruthy();
        });

        it("should use the spaceBetween justify", () => {
            const wrapper = mount(<Flex justify="spaceBetween" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-between")).toBeTruthy();
        });

        it("should use the spaceAround justify", () => {
            const wrapper = mount(<Flex justify="spaceAround" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-around")).toBeTruthy();
        });

        it("should use the spaceEvenly justify", () => {
            const wrapper = mount(<Flex justify="spaceEvenly" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--jc-even")).toBeTruthy();
        });
    });

    describe("align", () => {
        it("should use the default align", () => {
            const wrapper = mount(<Flex />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("className")).not.toContain("NuiHR--align");
        });

        it("should use the stretch align", () => {
            const wrapper = mount(<Flex />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("className")).not.toContain("NuiHR--align");
        });

        it("should use the flexStart align", () => {
            const wrapper = mount(<Flex align="flexStart" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-fstart")).toBeTruthy();
        });

        it("should use the start align", () => {
            const wrapper = mount(<Flex align="start" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-start")).toBeTruthy();
        });

        it("should use the selfStart align", () => {
            const wrapper = mount(<Flex align="selfStart" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-sstart")).toBeTruthy();
        });

        it("should use the flexEnd align", () => {
            const wrapper = mount(<Flex align="flexEnd" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-fend")).toBeTruthy();
        });

        it("should use the end align", () => {
            const wrapper = mount(<Flex align="end" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-end")).toBeTruthy();
        });

        it("should use the selfEnd align", () => {
            const wrapper = mount(<Flex align="selfEnd" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-send")).toBeTruthy();
        });

        it("should use the center align", () => {
            const wrapper = mount(<Flex align="center" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-center")).toBeTruthy();
        });

        it("should use the baseline align", () => {
            const wrapper = mount(<Flex align="baseline" />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.hasClass("NuiFlex--align-base")).toBeTruthy();
        });
    });

    describe("gap", () => {
        it("should use the default gap value", () => {
            const wrapper = mount(<Flex />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("className")).not.toContain("NuiFlex--gap");
            expect(flex.prop("style")).toHaveProperty("gap", undefined);
        });

        it.each(["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[])(
            "should use the %s gap value",
            (bp) => {
                const wrapper = mount(<Flex gap={bp} />);
                const flex = wrapper.find(".NuiFlex").first();
                expect(flex.hasClass(`NuiFlex--gap-${bp}`)).toBeTruthy();
            }
        );

        it("should use the custom gap value", () => {
            const wrapper = mount(<Flex gap={7} />);
            const flex = wrapper.find(".NuiFlex").first();
            expect(flex.prop("style")).toHaveProperty("gap", "7px");
        });
    });
});
