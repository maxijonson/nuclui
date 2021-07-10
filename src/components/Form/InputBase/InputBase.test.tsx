import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import InputBase, { extractInputBaseProps } from "./InputBase";
import "jest-styled-components";
import { InputBaseProps } from "./types";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(InputBase, {});

describe("InputBase", () => {
    testRendering();
    testDisplayName("NuiInputBase", "NuiStyledInputBase");
    testRef("div");
    testClassName("div", "NuiInputBase");

    describe("label", () => {
        it("should not have any label when none is given", () => {
            const wrapper = mount(<InputBase />);
            const label = wrapper.find(".NuiInputBase__label");
            expect(label.length).toBe(0);
        });

        it("should use the given label", () => {
            const labelText = "TestLabel";
            const wrapper = mount(<InputBase label={labelText} />);
            const label = wrapper.find(".NuiInputBase__label");
            expect(label.length).toBe(1);
            expect(label.text()).toBe(labelText);
        });
    });

    describe("size", () => {
        const modifier = "NuiInputBase--size";

        it("should use the default size", () => {
            const wrapper = mount(<InputBase />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each(["xs", "sm", "md", "lg", "xl"] as const)(
            "should use the %s size",
            (size) => {
                const wrapper = mount(<InputBase size={size} />);
                const { className } = wrapper.getDOMNode();

                if (size === "sm") {
                    expect(className).not.toContain(modifier);
                } else {
                    expect(
                        wrapper.render().hasClass(`${modifier}-${size}`)
                    ).toBeTruthy();

                    expect(
                        className.split(" ").filter((c) => c.includes(modifier))
                            .length
                    ).toBe(1);
                }
            }
        );
    });

    describe("fluid", () => {
        it("should use the default fluid value when none is given", () => {
            const wrapper = mount(<InputBase />);
            expect(
                wrapper.render().hasClass("NuiInputBase--fluid")
            ).toBeFalsy();
        });

        it("should make the input fluid", () => {
            const wrapper = mount(<InputBase fluid />);
            expect(
                wrapper.render().hasClass("NuiInputBase--fluid")
            ).toBeTruthy();
        });
    });

    describe("errors/touched", () => {
        it("should use the default errors prop", () => {
            const wrapper = mount(<InputBase />);
            const error = wrapper.find(".NuiInputBase__error");
            expect(
                wrapper.render().hasClass("NuiInputBase--invalid")
            ).toBeFalsy();
            expect(error.length).toBe(0);
        });

        it("should not show any error when the provided array is empty", () => {
            const wrapper = mount(<InputBase errors={[]} />);
            const error = wrapper.find(".NuiInputBase__error");
            expect(
                wrapper.render().hasClass("NuiInputBase--invalid")
            ).toBeFalsy();
            expect(error.length).toBe(0);
        });

        it("should not show any error when the input has not been touched", () => {
            const wrapper = mount(
                <InputBase errors={["error"]} touched={false} />
            );
            const error = wrapper.find(".NuiInputBase__error");
            expect(
                wrapper.render().hasClass("NuiInputBase--invalid")
            ).toBeFalsy();
            expect(error.length).toBe(0);
        });

        it("should show the error when the input has been touched", () => {
            const wrapper = mount(<InputBase errors={["error"]} touched />);
            const error = wrapper.find(".NuiInputBase__error");
            expect(
                wrapper.render().hasClass("NuiInputBase--invalid")
            ).toBeTruthy();
            expect(error.length).toBe(1);
        });
    });

    describe("focused", () => {
        it("should use the default focused prop", () => {
            const wrapper = mount(<InputBase />);
            expect(
                wrapper.render().hasClass("NuiInputBase--focused")
            ).toBeFalsy();
        });

        it("should not be focused when it is false", () => {
            const wrapper = mount(<InputBase focused={false} />);
            expect(
                wrapper.render().hasClass("NuiInputBase--focused")
            ).toBeFalsy();
        });

        it("should not be focused when it is false", () => {
            const wrapper = mount(<InputBase focused />);
            expect(
                wrapper.render().hasClass("NuiInputBase--focused")
            ).toBeTruthy();
        });
    });

    describe("disabled", () => {
        it("should use the default disabled prop", () => {
            const wrapper = mount(<InputBase />);
            expect(
                wrapper.render().hasClass("NuiInputBase--disabled")
            ).toBeFalsy();
        });

        it("should not be disabled when it is false", () => {
            const wrapper = mount(<InputBase disabled={false} />);
            expect(
                wrapper.render().hasClass("NuiInputBase--disabled")
            ).toBeFalsy();
        });

        it("should not be disabled when it is false", () => {
            const wrapper = mount(<InputBase disabled />);
            expect(
                wrapper.render().hasClass("NuiInputBase--disabled")
            ).toBeTruthy();
        });
    });

    describe("labelPosition", () => {
        const modifier = "NuiInputBase--position";

        it("should use the default labelPosition", () => {
            const wrapper = mount(<InputBase />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each(["top", "right", "bottom", "left"] as const)(
            "should use the %s labelPosition",
            (labelPosition) => {
                const wrapper = mount(
                    <InputBase labelPosition={labelPosition} />
                );
                const { className } = wrapper.getDOMNode();

                if (labelPosition === "top") {
                    expect(className).not.toContain(modifier);
                } else {
                    expect(
                        wrapper
                            .render()
                            .hasClass(`${modifier}-${labelPosition}`)
                    ).toBeTruthy();

                    expect(
                        className.split(" ").filter((c) => c.includes(modifier))
                            .length
                    ).toBe(1);
                }
            }
        );
    });
});

describe("extractInputBaseProps", () => {
    it("should extract the default InputBase props and put other props in the restProps", () => {
        const customProps = { test: true } as const;
        const { restProps, ...baseProps } = extractInputBaseProps({
            ...customProps,
            disabled: undefined,
        });
        expect(restProps).toEqual(customProps);
        expect(baseProps).toEqual({
            disabled: false,
            errors: [],
            fluid: false,
            focused: false,
            label: "",
            labelPosition: "top",
            size: "sm",
            touched: true,
        });
    });

    it("should extract the InputBase props and put other props in the restProps", () => {
        const inputBaseProps: Required<InputBaseProps> = {
            disabled: true,
            errors: ["test error"],
            fluid: true,
            focused: true,
            label: "test label",
            labelPosition: "bottom",
            size: "xs",
            touched: false,
        };
        const customProps = { test: true } as const;
        const props = { ...inputBaseProps, ...customProps };
        const { restProps, ...baseProps } = extractInputBaseProps(props);
        expect(restProps).toEqual(customProps);
        expect(baseProps).toEqual(inputBaseProps);
    });
});
