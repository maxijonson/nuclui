import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import RadioGroup, { RadioGroupContext } from "./RadioGroup";
import "jest-styled-components";

const {
    testClassName,
    testDisplayName,
    testRef,
    testRendering,
    testComponent,
} = createBasicTests(RadioGroup, {});

describe("RadioGroup", () => {
    testRendering();
    testComponent("div");
    testDisplayName("NuiStyledRadioGroup", "NuiRadioGroup");
    testRef("div", "button");
    testClassName("div", "NuiRadioGroup");

    describe("label", () => {
        it("should not have any label when none is given", () => {
            const wrapper = mount(<RadioGroup />);
            const label = wrapper.find(".NuiRadioGroup__label");
            expect(label.length).toBe(0);
        });

        it("should use the given label", () => {
            const labelText = "TestLabel";
            const wrapper = mount(<RadioGroup label={labelText} />);
            const label = wrapper.find(".NuiRadioGroup__label");
            expect(label.length).toBe(1);
            expect(label.text()).toBe(labelText);
        });
    });

    describe("name", () => {
        it("should use the default name value", () => {
            const wrapper = mount(<RadioGroup />);
            const group = wrapper.find(".NuiRadioGroup__group");
            expect(group.prop("data-group")).toBeUndefined();
        });

        it("should use the given name value", () => {
            const wrapper = mount(<RadioGroup name="test" />);
            const group = wrapper.find(".NuiRadioGroup__group");
            expect(group.prop("data-group")).toBe("test");
        });

        it("should provide the name value", () => {
            const Consumer = () => {
                const { name } = React.useContext(RadioGroupContext);
                return <div className="NuiRadioGroup--test" children={name} />;
            };
            const wrapper = mount(
                <RadioGroup children={<Consumer />} name="test" />
            );
            const test = wrapper.find(".NuiRadioGroup--test");
            expect(test.length).toBe(1);
            expect(test.text()).toBe("test");
        });
    });

    describe("size", () => {
        const modifier = "NuiRadioGroup--size";

        it("should use the default size", () => {
            const wrapper = mount(<RadioGroup />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each(["xs", "sm", "md", "lg", "xl"] as const)(
            "should use the %s size",
            (size) => {
                const wrapper = mount(<RadioGroup size={size} />);
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

        it("should provide the size value", () => {
            const Consumer = () => {
                const { size } = React.useContext(RadioGroupContext);
                return <div className="NuiRadioGroup--test" children={size} />;
            };
            const wrapper = mount(
                <RadioGroup children={<Consumer />} size="xs" />
            );
            const test = wrapper.find(".NuiRadioGroup--test");
            expect(test.length).toBe(1);
            expect(test.text()).toBe("xs");
        });
    });

    describe("direction", () => {
        const modifier = "NuiRadioGroup--direction";

        it("should use the default direction", () => {
            const wrapper = mount(<RadioGroup />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each(["row", "column", "row-reverse", "column-reverse"] as const)(
            "should use the %s direction",
            (direction) => {
                const wrapper = mount(<RadioGroup direction={direction} />);
                const { className } = wrapper.getDOMNode();

                if (direction === "row") {
                    expect(className).not.toContain(modifier);
                } else {
                    expect(
                        wrapper.render().hasClass(`${modifier}-${direction}`)
                    ).toBeTruthy();

                    expect(
                        className.split(" ").filter((c) => c.includes(modifier))
                            .length
                    ).toBe(1);
                }
            }
        );
    });

    describe("onChange", () => {
        it("should provide the onChange value", () => {
            const fn = jest.fn();
            const Consumer = () => {
                const { onChange } = React.useContext(RadioGroupContext);
                if (onChange) {
                    onChange("test", {} as any);
                }
                return <div className="NuiRadioGroup--test" />;
            };
            mount(<RadioGroup children={<Consumer />} onChange={fn} />);
            expect(fn).toHaveBeenCalledWith("test", {});
        });
    });

    describe("value", () => {
        it("should provide the value", () => {
            const Consumer = () => {
                const { value } = React.useContext(RadioGroupContext);
                return <div className="NuiRadioGroup--test" children={value} />;
            };
            const wrapper = mount(
                <RadioGroup children={<Consumer />} value="test" />
            );
            const test = wrapper.find(".NuiRadioGroup--test");
            expect(test.length).toBe(1);
            expect(test.text()).toBe("test");
        });
    });
});
