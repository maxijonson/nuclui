import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import Switch from "./Switch";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Switch, {});

describe("Switch", () => {
    testRendering();
    testDisplayName("NuiSwitch", "NuiStyledSwitch");
    testRef("input");
    testClassName("div", "NuiSwitch");

    describe("onFocus", () => {
        it("should call the onFocus handler", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<Switch onFocus={onFocus} />);
            const input = wrapper.find("input");

            input.simulate("focus");
            input.simulate("blur");
            expect(onFocus).toHaveBeenCalled();
        });
    });

    describe("onChange", () => {
        it("should call the onChange handler", () => {
            const onChange = jest.fn();
            const wrapper = mount(<Switch onChange={onChange} />);
            const input = wrapper.find("input");

            input.simulate("change");
            expect(onChange).toHaveBeenCalled();
        });

        it("should not call the onChange handler when it is readOnly", () => {
            const onChange = jest.fn();
            const wrapper = mount(<Switch onChange={onChange} readOnly />);
            const input = wrapper.find("input");

            input.simulate("change");
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe("onBlur", () => {
        it("should call the onBlur handler", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<Switch onBlur={onBlur} />);
            const input = wrapper.find("input");

            input.simulate("focus");
            input.simulate("blur");
            expect(onBlur).toHaveBeenCalled();
        });
    });

    describe("defaultChecked", () => {
        it("should use the default checked value", () => {
            const ref = React.createRef<HTMLInputElement>();
            mount(<Switch ref={ref} />);

            expect(ref.current?.checked).toBe(false);
        });

        it("should use the given defaultChecked value", () => {
            const ref = React.createRef<HTMLInputElement>();
            mount(<Switch ref={ref} defaultChecked />);

            expect(ref.current?.checked).toBe(true);
        });
    });

    describe("onChildren", () => {
        it("should use the given on children", () => {
            const wrapper = mount(<Switch value onChildren="On" />);
            const text = wrapper.find(".NuiSwitch__text");
            expect(text.text()).toBe("On");
        });
    });

    describe("offChildren", () => {
        it("should use the given off children", () => {
            const wrapper = mount(<Switch value={false} offChildren="Off" />);
            const text = wrapper.find(".NuiSwitch__text");
            expect(text.text()).toBe("Off");
        });
    });
});
