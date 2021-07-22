import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import Select from "./Select";
import "jest-styled-components";
import { SelectOption } from "./types";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Select, { options: [] });

describe("Select", () => {
    testRendering();
    testDisplayName("NuiSelect", "NuiStyledSelect");
    testRef("input");
    testClassName("div", "NuiSelect");

    describe("options", () => {
        it("should render no option when no value is given", () => {
            const wrapper = mount(
                <Select
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");
            expect(input.props().value).toBe("");
        });

        it("should render the selected option", () => {
            const wrapper = mount(
                <Select
                    value="1"
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");
            expect(input.props().value).toBe("One");
        });

        it("should render the given value when it doesn't match any option", () => {
            const wrapper = mount(
                <Select
                    value="4"
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");
            expect(input.props().value).toBe("4");
        });

        it("should render the searched values", () => {
            const ref = React.createRef<HTMLInputElement>();
            const wrapper = mount(
                <Select
                    ref={ref}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("change", {
                target: { value: "T" },
            });
            expect(ref.current?.value).toBe("T");

            const options = wrapper.find(".NuiSelect__options__list__item");
            expect(options.length).toBe(2);
            expect(options.at(0).text()).toBe("Two");
            expect(options.at(1).text()).toBe("Three");
        });
    });

    describe("defaultValue", () => {
        it("should render the default value label", () => {
            const wrapper = mount(
                <Select
                    defaultValue="1"
                    options={[{ value: "1", label: "One" }]}
                />
            );
            const input = wrapper.find("input");
            expect(input.props().value).toBe("One");
        });

        it("should render the default value", () => {
            const wrapper = mount(
                <Select
                    defaultValue="42"
                    options={[{ value: "1", label: "One" }]}
                />
            );
            const input = wrapper.find("input");
            expect(input.props().value).toBe("42");
        });
    });

    describe("onFocus", () => {
        it("should call onFocus when focused", () => {
            const onFocus = jest.fn();
            const wrapper = mount(
                <Select
                    onFocus={onFocus}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onFocus).toHaveBeenCalledTimes(1);
        });
    });

    describe("onChange", () => {
        it("should call the onChange handler with the selected option", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <Select
                    onChange={onChange}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            wrapper.find(".NuiSelect__popover").first().simulate("mousedown");
            input.simulate("focus");
            input.simulate("keydown", { key: "ArrowDown" });

            const options = wrapper.find(".NuiSelect__options__list__item");
            expect(options.length).toBe(3);

            expect(options.at(0).text()).toBe("One");
            expect(options.at(1).text()).toBe("Two");
            expect(options.at(2).text()).toBe("Three");

            options.at(1).simulate("click");
            expect(onChange).toHaveBeenCalledWith("2", expect.any(Object));
        });

        it("should call the onChange handler with a keyboard selected option", () => {
            const onChange = jest.fn();
            const onKeyDown = jest.fn();
            const wrapper = mount(
                <Select
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            input.simulate("focus");
            input.simulate("keydown", { key: "Enter" }); // Enter with highlight index of -1
            input.simulate("keydown", { key: "ArrowLeft" }); // ArrowLeft is useless
            input.simulate("keydown", { key: "ArrowDown" }); // Go to the first option
            input.simulate("keydown", { key: "ArrowUp" }); // Stay on the first option
            input.simulate("keydown", { key: "ArrowDown" }); // Go down to the second option
            input.simulate("keydown", { key: "ArrowDown" }); // Go down to the third option
            input.simulate("keydown", { key: "ArrowDown" }); // Stay on the third option
            input.simulate("keydown", { key: "ArrowUp" }); // Go up to the second option
            input.simulate("keydown", { key: "Enter" }); // Enter with highlight index of 1

            expect(onChange).toHaveBeenCalledWith("2", expect.any(Object));
        });
    });

    describe("creatable", () => {
        it("should not render a creatable option when typing an existing option label", () => {
            const ref = React.createRef<HTMLInputElement>();
            const wrapper = mount(
                <Select
                    creatable
                    ref={ref}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            input.simulate("focus");

            input.simulate("change", {
                target: { value: "One" },
            });
            expect(ref.current?.value).toBe("One");

            const creatable = wrapper.find(".NuiSelect__options__list__create");
            expect(creatable.length).toBe(0);
        });

        it("should not render a creatable option when typing an existing option value", () => {
            const ref = React.createRef<HTMLInputElement>();
            const wrapper = mount(
                <Select
                    creatable
                    ref={ref}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            input.simulate("focus");

            input.simulate("change", {
                target: { value: "1" },
            });
            expect(ref.current?.value).toBe("1");

            const creatable = wrapper.find(".NuiSelect__options__list__create");
            expect(creatable.length).toBe(0);
        });

        it("should call onChange with a created option", () => {
            const onChange = jest.fn();
            const ref = React.createRef<HTMLInputElement>();
            const wrapper = mount(
                <Select
                    creatable
                    onChange={onChange}
                    ref={ref}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            input.simulate("focus");

            input.simulate("change", {
                target: { value: "Createable" },
            });
            expect(ref.current?.value).toBe("Createable");

            const creatable = wrapper.find(".NuiSelect__options__list__create");
            expect(creatable.length).toBe(1);

            creatable.simulate("click");
            expect(onChange).toHaveBeenCalledWith(
                "Createable",
                expect.any(Object)
            );
        });

        it("should call onChange with a created option when onCreate is true", () => {
            const onChange = jest.fn();
            const onCreate = jest.fn(() => true);
            const ref = React.createRef<HTMLInputElement>();
            const wrapper = mount(
                <Select
                    creatable
                    onCreate={onCreate}
                    onChange={onChange}
                    ref={ref}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            input.simulate("focus");

            input.simulate("change", {
                target: { value: "Createable" },
            });
            expect(ref.current?.value).toBe("Createable");

            const creatable = wrapper.find(".NuiSelect__options__list__create");
            expect(creatable.length).toBe(1);

            creatable.simulate("click");
            expect(onChange).toHaveBeenCalledWith(
                "Createable",
                expect.any(Object)
            );
        });

        it("should not call onChange with a created option when onCreate is false", () => {
            const onChange = jest.fn();
            const onCreate = jest.fn(() => false);
            const ref = React.createRef<HTMLInputElement>();
            const wrapper = mount(
                <Select
                    creatable
                    onCreate={onCreate}
                    onChange={onChange}
                    ref={ref}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            input.simulate("focus");

            input.simulate("change", {
                target: { value: "Createable" },
            });
            expect(ref.current?.value).toBe("Createable");

            const creatable = wrapper.find(".NuiSelect__options__list__create");
            expect(creatable.length).toBe(1);

            creatable.simulate("click");
            expect(onChange).not.toHaveBeenCalled();
        });

        it("should call onChange with a created option given by onCreate", () => {
            const obj = { value: "created", label: "Created" };
            const onChange = jest.fn();
            const onCreate = jest.fn(() => obj);
            const ref = React.createRef<HTMLInputElement>();
            const wrapper = mount(
                <Select
                    creatable
                    onCreate={onCreate}
                    onChange={onChange}
                    ref={ref}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");

            input.simulate("focus");

            input.simulate("change", {
                target: { value: "Createable" },
            });
            expect(ref.current?.value).toBe("Createable");

            const creatable = wrapper.find(".NuiSelect__options__list__create");
            expect(creatable.length).toBe(1);

            creatable.simulate("click");
            expect(onChange).toHaveBeenCalledWith(
                obj.value,
                expect.any(Object)
            );
        });
    });

    describe("renderOption", () => {
        it("should render the option accordingly when given a custom renderOption prop", () => {
            const renderOption = (option: SelectOption) =>
                option.label.toUpperCase();
            const wrapper = mount(
                <Select
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                    renderOption={renderOption}
                />
            );

            const options = wrapper.find(".NuiSelect__options__list__item");
            expect(options.length).toBe(3);

            expect(options.at(0).text()).toBe("ONE");
            expect(options.at(1).text()).toBe("TWO");
            expect(options.at(2).text()).toBe("THREE");
        });
    });

    describe("onBlur", () => {
        it("should call onBlur when blurred", () => {
            const onBlur = jest.fn();
            const wrapper = mount(
                <Select
                    onBlur={onBlur}
                    options={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                />
            );
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onBlur).toHaveBeenCalledTimes(1);
        });
    });
});
