import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import TextInput from "./TextInput";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(TextInput, {});

describe("TextInput", () => {
    testRendering();
    testDisplayName("NuiTextInput");
    testRef("input");
    testClassName("div", "NuiTextInput");

    describe("onFocus", () => {
        it("should call onFocus", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<TextInput onFocus={onFocus} />);
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onFocus).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    describe("onChange", () => {
        it("should call the onChange handler", () => {
            const onChange = jest.fn();
            const wrapper = mount(<TextInput onChange={onChange} />);
            const input = wrapper.find("input");
            input.simulate("change", { target: { value: "test" } });
            expect(onChange).toHaveBeenCalledWith("test", expect.any(Object));
        });
    });

    describe("onBlur", () => {
        it("should call onBlur", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<TextInput onBlur={onBlur} />);
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onBlur).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    describe("defaultValue", () => {
        it("should use the given defaultValue", () => {
            const wrapper = mount(<TextInput defaultValue="test" />);
            const input = wrapper.find("input");
            expect(input.prop("value")).toBe("test");
        });
    });

    describe("type", () => {
        it("should use the default type", () => {
            const wrapper = mount(<TextInput />);
            const input = wrapper.find("input");
            expect(input.prop("type")).toBe("text");
        });

        it("should use the given type", () => {
            const wrapper = mount(<TextInput type="password" />);
            const input = wrapper.find("input");
            expect(input.prop("type")).toBe("password");
        });
    });
});
