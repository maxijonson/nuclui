import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import Checkbox from "./Checkbox";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Checkbox, {});

describe("Checkbox", () => {
    testRendering();
    testDisplayName("NuiCheckbox", "NuiStyledCheckbox");
    testRef("input");
    testClassName("div", "NuiCheckbox");

    describe("onFocus", () => {
        it("should call the onFocus handler", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<Checkbox onFocus={onFocus} />);
            const input = wrapper.find("input");

            input.simulate("focus");
            expect(onFocus).toHaveBeenCalled();
        });
    });

    describe("onChange", () => {
        it("should call the onChange handler", () => {
            const onChange = jest.fn();
            const wrapper = mount(<Checkbox onChange={onChange} />);
            const input = wrapper.find("input");

            input.simulate("focus");
            input.simulate("change");
            input.simulate("blur");
            expect(onChange).toHaveBeenCalled();
        });

        it("should not call the onChange handler when it is readOnly", () => {
            const onChange = jest.fn();
            const wrapper = mount(<Checkbox onChange={onChange} readOnly />);
            const input = wrapper.find("input");

            input.simulate("change");
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe("onBlur", () => {
        it("should call the onBlur handler", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<Checkbox onBlur={onBlur} />);
            const input = wrapper.find("input");

            input.simulate("blur");
            expect(onBlur).toHaveBeenCalled();
        });
    });

    describe("defaultChecked", () => {
        it("should use the default checked value", () => {
            const ref = React.createRef<HTMLInputElement>();
            mount(<Checkbox ref={ref} />);

            expect(ref.current?.checked).toBe(false);
        });

        it("should use the given defaultChecked value", () => {
            const ref = React.createRef<HTMLInputElement>();
            mount(<Checkbox ref={ref} defaultChecked />);

            expect(ref.current?.checked).toBe(true);
        });
    });
});
