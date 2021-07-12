import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import InputContainer, { extractInputContainerProps } from "./InputContainer";
import "jest-styled-components";
import { InputContainerPropsWithBase } from "./types";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(InputContainer, {});

describe("InputContainer", () => {
    testRendering();
    testDisplayName("NuiInputContainer", "NuiStyledInputContainer");
    testRef("div");
    testClassName("div", "NuiInputContainer");

    describe("variant", () => {
        const modifier = "NuiInputContainer--variant";

        it("should use the default variant value", () => {
            const wrapper = mount(<InputContainer />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each([
            "outline",
            "underline",
            "filled",
            "filled-underline",
            "filled-none",
            "none",
        ] as const)("should use the '%s' variant", (variant) => {
            const wrapper = mount(<InputContainer variant={variant} />);
            const { className } = wrapper.getDOMNode();

            if (variant == "outline") {
                expect(className).not.toContain(modifier);
            } else {
                expect(
                    wrapper.render().hasClass(`${modifier}-${variant}`)
                ).toBeTruthy();

                expect(
                    className.split(" ").filter((c) => c.includes(modifier))
                        .length
                ).toBe(1);
            }
        });
    });

    describe("prepend", () => {
        it("should not have a prepend container when none is given", () => {
            const wrapper = mount(<InputContainer />);
            expect(wrapper.find(".NuiInputContainer__prepend").length).toBe(0);
        });

        it("should use the given prepend value", () => {
            const className = "NuiInputContainer--test";
            const wrapper = mount(
                <InputContainer prepend={<div className={className} />} />
            );
            expect(wrapper.find(`.${className}`).length).toBe(1);
        });
    });

    describe("append", () => {
        it("should not have a append container when none is given", () => {
            const wrapper = mount(<InputContainer />);
            expect(wrapper.find(".NuiInputContainer__append").length).toBe(0);
        });

        it("should use the given append value", () => {
            const className = "NuiInputContainer--test";
            const wrapper = mount(
                <InputContainer append={<div className={className} />} />
            );
            expect(wrapper.find(`.${className}`).length).toBe(1);
        });
    });
});

describe("extractInputContainerProps", () => {
    it("should extract the default InputContainer props and put other props in the restProps", () => {
        const customProps = { test: true } as const;
        const { restProps, ...baseProps } = extractInputContainerProps({
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
            variant: "outline",
            prepend: null,
            append: null,
        });
    });

    it("should extract the InputContainer props and put other props in the restProps", () => {
        const inputContainerProps: Required<InputContainerPropsWithBase> = {
            disabled: true,
            errors: ["test error"],
            fluid: true,
            focused: true,
            label: "test label",
            labelPosition: "bottom",
            size: "xs",
            touched: false,
            variant: "filled",
            prepend: <div className="prepend" />,
            append: <div className="append" />,
        };
        const customProps = { test: true } as const;
        const props = { ...inputContainerProps, ...customProps };
        const { restProps, ...baseProps } = extractInputContainerProps(props);
        expect(restProps).toEqual(customProps);
        expect(baseProps).toEqual(inputContainerProps);
    });
});
