import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import RadioButton from "./RadioButton";
import "jest-styled-components";
import { RadioGroup } from "../RadioGroup";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(RadioButton, {});

describe("RadioButton", () => {
    testRendering();
    testDisplayName("NuiRadioButton", "NuiStyledRadioButton");
    testRef("input");
    testClassName("div", "NuiRadioButton");

    describe("checked", () => {
        it("should use the provided checked value", () => {
            const wrapper = mount(
                <RadioGroup value="first">
                    <RadioButton
                        value="first"
                        className="NuiRadioButton--test1"
                    />
                    <RadioButton
                        value="second"
                        className="NuiRadioButton--test2"
                    />
                </RadioGroup>
            );
            const radio1 = wrapper.find(
                ".NuiRadioButton--test1 .NuiRadioButton__input"
            );
            const radio2 = wrapper.find(
                ".NuiRadioButton--test2 .NuiRadioButton__input"
            );

            expect(radio1.prop("checked")).toBe(true);
            expect(radio2.prop("checked")).toBe(false);
        });

        it("should use its own given checked", () => {
            const wrapper = mount(
                <>
                    <RadioButton
                        checked
                        value="first"
                        className="NuiRadioButton--test1"
                    />
                    <RadioButton
                        checked={false}
                        value="second"
                        className="NuiRadioButton--test2"
                    />
                </>
            );
            const radio1 = wrapper.find(
                ".NuiRadioButton--test1 .NuiRadioButton__input"
            );
            const radio2 = wrapper.find(
                ".NuiRadioButton--test2 .NuiRadioButton__input"
            );

            expect(radio1.prop("checked")).toBe(true);
            expect(radio2.prop("checked")).toBe(false);
        });
    });

    describe("onFocus", () => {
        it("should call onFocus", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<RadioButton onFocus={onFocus} />);
            const input = wrapper.find("input");

            input.simulate("focus");
            input.simulate("change");
            input.simulate("blur");

            expect(onFocus).toHaveBeenCalledTimes(1);
        });
    });

    describe("onChange", () => {
        it("should call the provided onChange", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <RadioGroup value="first" onChange={onChange}>
                    <RadioButton value="first" />
                    <RadioButton value="second" />
                </RadioGroup>
            );
            const input = wrapper.find("input").at(1);

            input.simulate("change");

            expect(onChange).toHaveBeenCalledWith("second", expect.any(Object));
        });

        it("should call the given onChange", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <RadioButton value="first" onChange={onChange} />
            );
            const input = wrapper.find("input");

            input.simulate("change");

            expect(onChange).toHaveBeenCalledWith("first", expect.any(Object));
        });
    });

    describe("onBlur", () => {
        it("should call onBlur", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<RadioButton onBlur={onBlur} />);
            const input = wrapper.find("input");

            input.simulate("focus");
            input.simulate("change");
            input.simulate("blur");

            expect(onBlur).toHaveBeenCalledTimes(1);
        });
    });

    describe("size", () => {
        it("should use the provided size", () => {
            const wrapper = mount(
                <RadioGroup size="lg">
                    <RadioButton />
                </RadioGroup>
            );
            expect(wrapper.getDOMNode().className).toContain(
                "NuiInputBase--size-lg"
            );
        });

        it("should use the given size", () => {
            const wrapper = mount(<RadioButton size="lg" />);
            expect(wrapper.getDOMNode().className).toContain(
                "NuiInputBase--size-lg"
            );
        });
    });

    describe("name", () => {
        it("should use the provided name", () => {
            const wrapper = mount(
                <RadioGroup name="radiotest">
                    <RadioButton />
                </RadioGroup>
            );
            const input = wrapper.find("input");
            expect(input.prop("name")).toBe("radiotest");
        });

        it("should use the given name", () => {
            const wrapper = mount(<RadioButton name="radiotest" />);
            const input = wrapper.find("input");
            expect(input.prop("name")).toBe("radiotest");
        });
    });
});
