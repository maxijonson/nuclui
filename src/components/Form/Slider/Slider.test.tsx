import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import Slider from "./Slider";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Slider, {});

describe("Slider", () => {
    testRendering();
    testDisplayName("NuiSlider", "NuiStyledSlider");
    testRef("div");
    testClassName("div", "NuiSlider");

    describe("min", () => {
        it("should use the default min value", () => {
            const wrapper = mount(<Slider />);
            const handle = wrapper.find(".NuiSlider__handle");
            expect(handle.prop("aria-valuemin")).toBe(0);
        });

        it("should use the given min value", () => {
            const wrapper = mount(<Slider min={10} />);
            const handle = wrapper.find(".NuiSlider__handle");
            expect(handle.prop("aria-valuemin")).toBe(10);
        });

        it("should use the smallest min/max value when both are given", () => {
            const wrapper = mount(<Slider min={20} max={10} />);
            const handle = wrapper.find(".NuiSlider__handle");
            expect(handle.prop("aria-valuemin")).toBe(10);
        });
    });

    describe("max", () => {
        it("should use the default max value", () => {
            const wrapper = mount(<Slider />);
            const handle = wrapper.find(".NuiSlider__handle");
            expect(handle.prop("aria-valuemax")).toBe(100);
        });

        it("should use the given max value", () => {
            const wrapper = mount(<Slider max={10} />);
            const handle = wrapper.find(".NuiSlider__handle");
            expect(handle.prop("aria-valuemax")).toBe(10);
        });

        it("should use the biggest min/max value when both are given", () => {
            const wrapper = mount(<Slider min={20} max={10} />);
            const handle = wrapper.find(".NuiSlider__handle");
            expect(handle.prop("aria-valuemax")).toBe(20);
        });
    });

    describe("name", () => {
        it("should use the given name for a single value", () => {
            const wrapper = mount(
                <Slider value={1} step={5} shiftStep={10} name="test" />
            );
            const input = wrapper.find(".NuiSlider__input-1");
            expect(input.prop("name")).toBe("test");
        });

        it("should use the given name for a dual value", () => {
            const wrapper = mount(
                <Slider value={[1, 2]} name={["test1", "test2"]} />
            );
            const input1 = wrapper.find(".NuiSlider__input-1");
            const input2 = wrapper.find(".NuiSlider__input-2");
            expect(input1.prop("name")).toBe("test1");
            expect(input2.prop("name")).toBe("test2");
        });
    });

    describe("onFocus", () => {
        it("should call the given onFocus function", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<Slider onFocus={onFocus} />);
            const handle = wrapper.find(".NuiSlider__handle");
            handle.simulate("focus");
            handle.simulate("blur");
            expect(onFocus).toHaveBeenCalled();
        });
    });

    describe("onBlur", () => {
        it("should call the given onBlur function", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<Slider onBlur={onBlur} />);
            const handle = wrapper.find(".NuiSlider__handle");
            handle.simulate("focus");
            handle.simulate("blur");
            expect(onBlur).toHaveBeenCalled();
        });
    });

    describe("hideHandlePopover", () => {
        it("should use the default hideHandlePopover value", () => {
            const wrapper = mount(<Slider />);
            const handle = wrapper.find(".NuiSlider__handle-1");

            const popoverBefore = wrapper.find(
                ".NuiSlider__handle-1 > .NuiSlider__handle__popover-1"
            );
            expect(popoverBefore.prop("open")).toBe(false);

            handle.simulate("mousedown");
            const popoverAfter = wrapper.find(
                ".NuiSlider__handle-1 > .NuiSlider__handle__popover-1"
            );
            expect(popoverAfter.prop("open")).toBe(true);

            handle.simulate("mouseup");
            const popoverEnd = wrapper.find(
                ".NuiSlider__handle-1 > .NuiSlider__handle__popover-1"
            );
            expect(popoverEnd.prop("open")).toBe(false);
        });

        it("should use hideHandlePopover", () => {
            const wrapper = mount(<Slider hideHandlePopover />);
            const handle = wrapper.find(".NuiSlider__handle-1");

            const popoverBefore = wrapper.find(
                ".NuiSlider__handle-1 > .NuiSlider__handle__popover-1"
            );

            expect(popoverBefore.prop("open")).toBe(false);
            handle.simulate("mousedown");

            const popoverAfter = wrapper.find(
                ".NuiSlider__handle-1 > .NuiSlider__handle__popover-1"
            );
            expect(popoverAfter.prop("open")).toBe(false);
        });
    });
});
