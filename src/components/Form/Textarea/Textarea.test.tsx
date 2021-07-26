import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import Textarea from "./Textarea";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Textarea, {});

describe("Textarea", () => {
    testRendering();
    testDisplayName("NuiTextarea", "NuiStyledTextarea");
    testRef("textarea");
    testClassName("div", "NuiTextarea");

    describe("onFocus", () => {
        it("should call onFocus", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<Textarea onFocus={onFocus} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            textarea.simulate("focus");
            textarea.simulate("blur");
            expect(onFocus).toHaveBeenCalled();
        });
    });

    describe("onChange", () => {
        it("should call the onChange handler", () => {
            const onChange = jest.fn();
            const wrapper = mount(<Textarea onChange={onChange} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            textarea.simulate("change", { target: { value: "test" } });
            expect(onChange).toHaveBeenCalledWith("test", expect.any(Object));
        });
    });

    describe("onBlur", () => {
        it("should call onBlur", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<Textarea onBlur={onBlur} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            textarea.simulate("focus");
            textarea.simulate("blur");
            expect(onBlur).toHaveBeenCalled();
        });
    });

    describe("defaultValue", () => {
        it("should use the given defaultValue", () => {
            const wrapper = mount(<Textarea defaultValue="test" />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("value")).toBe("test");
        });
    });

    describe("resizeable", () => {
        it("should use the default resizeable value", () => {
            const wrapper = mount(<Textarea />);
            expect(wrapper.render().hasClass("NuiTextarea--resizeable")).toBe(
                false
            );
        });

        it("should use the true resizeable value", () => {
            const wrapper = mount(<Textarea resizeable />);
            expect(wrapper.render().hasClass("NuiTextarea--resizeable")).toBe(
                true
            );
        });

        it("should use the false resizeable value", () => {
            const wrapper = mount(<Textarea resizeable={false} />);
            expect(wrapper.render().hasClass("NuiTextarea--resizeable")).toBe(
                false
            );
        });
    });

    describe("minRows", () => {
        it("should use the default minRows value", () => {
            const wrapper = mount(<Textarea />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("rows")).toBe(1);
        });

        it("should use the given minRows value", () => {
            const wrapper = mount(<Textarea minRows={2} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("rows")).toBe(2);
        });

        it("should use a fallback value when minRows is under 1", () => {
            const wrapper = mount(<Textarea minRows={0} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("rows")).toBe(1);
        });

        it("should use the minimum value between minRows/maxRows", () => {
            const wrapper = mount(<Textarea maxRows={2} minRows={3} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("rows")).toBe(2);
        });
    });

    describe("maxRows", () => {
        it("should use the default maxRows value", () => {
            const wrapper = mount(<Textarea minRows={10} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("rows")).toBe(10);
        });

        it("should use the given maxRows value", () => {
            const wrapper = mount(<Textarea minRows={10} maxRows={2} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("rows")).toBe(2);
        });

        it("should use a fallback value when maxRows is under 1", () => {
            const wrapper = mount(<Textarea minRows={0} maxRows={0} />);
            const textarea = wrapper.find(".NuiTextarea__textarea");
            expect(textarea.prop("rows")).toBe(1);
        });
    });
});
