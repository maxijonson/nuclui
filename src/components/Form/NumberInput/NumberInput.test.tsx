import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import NumberInput from "./NumberInput";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(NumberInput, {});

describe("NumberInput", () => {
    testRendering();
    testDisplayName("NuiNumberInput", "NuiStyledNumberInput");
    testRef("input");
    testClassName("div", "NuiNumberInput");

    describe("onFocus", () => {
        it("should call onFocus", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<NumberInput onFocus={onFocus} />);
            wrapper.find("input").simulate("focus");
            expect(onFocus).toHaveBeenCalled();
        });
    });

    describe("onBlur", () => {
        it("should call onBlur", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<NumberInput onBlur={onBlur} />);
            wrapper.find("input").simulate("blur");
            expect(onBlur).toHaveBeenCalled();
        });
    });

    describe("step", () => {
        it("should increment the value by the given step when a number value is available", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <NumberInput
                    step={2}
                    max={2}
                    defaultValue={0}
                    onChange={onChange}
                />
            );
            const arrowUp = wrapper.find(".NuiNumberInput__arrows__up");

            wrapper.find("input").simulate("focus");
            arrowUp.simulate("click");
            wrapper.find("input").simulate("blur");
            expect(onChange).toHaveBeenCalledWith(2, undefined);
        });

        it("should increment the value by the given step when a number value is not available (max only)", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <NumberInput step={2} max={2} onChange={onChange} />
            );
            const arrowUp = wrapper.find(".NuiNumberInput__arrows__up");

            arrowUp.simulate("click");
            expect(onChange).toHaveBeenCalledWith(2, undefined);
        });

        it("should increment the value by the given step when a number value is not available (min/max)", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <NumberInput step={2} max={2} min={0} onChange={onChange} />
            );
            const arrowUp = wrapper.find(".NuiNumberInput__arrows__up");

            arrowUp.simulate("click");
            expect(onChange).toHaveBeenCalledWith(2, undefined);
        });

        it("should decrement the value by the given step", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <NumberInput
                    step={2}
                    min={-2}
                    defaultValue={0}
                    onChange={onChange}
                />
            );
            const arrowDown = wrapper.find(".NuiNumberInput__arrows__down");

            arrowDown.simulate("click");
            expect(onChange).toHaveBeenCalledWith(-2, undefined);
        });
    });

    describe("min", () => {
        it("should use a minimum value", () => {
            const wrapper = mount(<NumberInput min={10} defaultValue={10} />);
            const input = wrapper.find("input");
            const downArrow = wrapper.find(".NuiNumberInput__arrows__down");
            const upArrow = wrapper.find(".NuiNumberInput__arrows__up");

            expect(input.prop("min")).toBe(10);
            expect(downArrow.props().disabled).toBe(true);
            expect(upArrow.props().disabled).toBe(false);
        });
    });

    describe("max", () => {
        it("should use a maximum value", () => {
            const wrapper = mount(<NumberInput max={10} defaultValue={10} />);
            const input = wrapper.find("input");
            const downArrow = wrapper.find(".NuiNumberInput__arrows__down");
            const upArrow = wrapper.find(".NuiNumberInput__arrows__up");

            expect(input.prop("max")).toBe(10);
            expect(downArrow.props().disabled).toBe(false);
            expect(upArrow.props().disabled).toBe(true);
        });
    });

    describe("strict", () => {
        it("should use the default strict mode", () => {
            const onChange = jest.fn();
            const wrapper = mount(<NumberInput onChange={onChange} />);
            const input = wrapper.find("input");
            expect(input.props().value).toBe("");
            input.simulate("change", { currentTarget: { value: NaN } });
            expect(onChange).toHaveBeenCalledWith(NaN, expect.any(Object));
        });

        it("should use the strict mode", () => {
            const onChange = jest.fn();
            const wrapper = mount(<NumberInput onChange={onChange} strict />);
            const input = wrapper.find("input");
            expect(input.props().value).toBe(0);
            input.simulate("change", { currentTarget: { value: NaN } });
            expect(onChange).toHaveBeenCalledWith(0, expect.any(Object));
        });
    });
});
