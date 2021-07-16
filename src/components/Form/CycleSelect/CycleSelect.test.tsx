import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import CycleSelect from "./CycleSelect";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(CycleSelect, {});

describe("CycleSelect", () => {
    testRendering();
    testDisplayName("NuiCycleSelect", "NuiStyledCycleSelect");
    testRef("input");
    testClassName("div", "NuiCycleSelect");

    describe("options", () => {
        it("should display the label of a given value that appears in the options", () => {
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                    ]}
                    value="first"
                />
            );
            const input = wrapper.find("input");
            expect(input.props().value).toBe("First");
        });

        it("should display the given value when it does not appear in the given options", () => {
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                    ]}
                    value="third"
                />
            );
            const input = wrapper.find("input");
            expect(input.props().value).toBe("third");
        });

        it("should use the first option as next/previous option when the given value does not appear in the given options", () => {
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                    ]}
                    value="third"
                />
            );

            const prevButton = wrapper.find(".NuiCycleSelect__button--prev");
            const nextButton = wrapper.find(".NuiCycleSelect__button--next");

            expect(prevButton.props().value).toBe("first");
            expect(nextButton.props().value).toBe("first");
        });

        it("should use the second option as next/previous option when the first option is selected and there are only 2 options", () => {
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                    ]}
                    value="first"
                />
            );

            const prevButton = wrapper.find(".NuiCycleSelect__button--prev");
            const nextButton = wrapper.find(".NuiCycleSelect__button--next");

            expect(prevButton.props().value).toBe("second");
            expect(nextButton.props().value).toBe("second");
        });

        it("should use the first option as previous option and the third option as next option when the second is selected", () => {
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                />
            );

            const prevButton = wrapper.find(".NuiCycleSelect__button--prev");
            const nextButton = wrapper.find(".NuiCycleSelect__button--next");

            expect(prevButton.props().value).toBe("first");
            expect(nextButton.props().value).toBe("third");
        });

        it("should use the second option as previous option and the first option as next option when the last is selected", () => {
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Last", value: "last" },
                    ]}
                    value="last"
                />
            );

            const prevButton = wrapper.find(".NuiCycleSelect__button--prev");
            const nextButton = wrapper.find(".NuiCycleSelect__button--next");

            expect(prevButton.props().value).toBe("second");
            expect(nextButton.props().value).toBe("first");
        });

        it('should display "No Options" when no option or value is given', () => {
            const wrapper = mount(<CycleSelect />);
            const input = wrapper.find("input");
            expect(input.props().value).toBe("No Options");
        });

        it("should display the given value when no option is given", () => {
            const wrapper = mount(<CycleSelect value="option" />);
            const input = wrapper.find("input");
            expect(input.props().value).toBe("option");
        });
    });

    describe("onChange", () => {
        it("should call the given onChange handler with the previous option value when pressing on the previous button", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onChange={onChange}
                />
            );
            const prevButton = wrapper.find(".NuiCycleSelect__button--prev");
            prevButton.simulate("click");
            expect(onChange).toHaveBeenCalledWith("first", expect.any(Object));
        });

        it("should call the given onChange handler with the previous option value on the left arrow", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onChange={onChange}
                />
            );
            const input = wrapper.find("input");
            input.simulate("keydown", { key: "ArrowLeft" });
            expect(onChange).toHaveBeenCalledWith("first", expect.any(Object));
        });

        it("should call the given onChange handler with the next option value when pressing on the next button", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onChange={onChange}
                />
            );
            const prevButton = wrapper.find(".NuiCycleSelect__button--next");
            prevButton.simulate("click");
            expect(onChange).toHaveBeenCalledWith("third", expect.any(Object));
        });

        it("should call the given onChange handler with the next option value on the right arrow", () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onChange={onChange}
                />
            );
            const input = wrapper.find("input");
            input.simulate("keydown", { key: "ArrowRight" });
            expect(onChange).toHaveBeenCalledWith("third", expect.any(Object));
        });

        it("should not call the given onChange handler when another key is pressed", () => {
            const onChange = jest.fn();
            const onKeyDown = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            );
            const input = wrapper.find("input");
            input.simulate("keydown", { key: "ArrowUp" });
            expect(onChange).not.toHaveBeenCalled();
            expect(onKeyDown).toHaveBeenCalled();
        });
    });

    describe("onPrevious", () => {
        it("should call the given onPrevious handler when pressing on the previous button", () => {
            const onPrevious = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onPrevious={onPrevious}
                />
            );
            const prevButton = wrapper.find(".NuiCycleSelect__button--prev");
            prevButton.simulate("click");
            expect(onPrevious).toHaveBeenCalledWith(expect.any(Object));
        });

        it("should call the given onPrevious handler on the left arrow", () => {
            const onPrevious = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onPrevious={onPrevious}
                />
            );
            const input = wrapper.find("input");
            input.simulate("keydown", { key: "ArrowLeft" });
            expect(onPrevious).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    describe("onNext", () => {
        it("should call the given onNext handler when pressing on the next button", () => {
            const onNext = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onNext={onNext}
                />
            );
            const prevButton = wrapper.find(".NuiCycleSelect__button--next");
            prevButton.simulate("click");
            expect(onNext).toHaveBeenCalledWith(expect.any(Object));
        });

        it("should call the given onNext handler on the right arrow", () => {
            const onNext = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onNext={onNext}
                />
            );
            const input = wrapper.find("input");
            input.simulate("keydown", { key: "ArrowRight" });
            expect(onNext).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    describe("onFocus", () => {
        it("should call the onFocus handler when the input is focused", () => {
            const onFocus = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onFocus={onFocus}
                />
            );
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onFocus).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    describe("onBlur", () => {
        it("should call the onBlur handler when the input is focused", () => {
            const onBlur = jest.fn();
            const wrapper = mount(
                <CycleSelect
                    options={[
                        { label: "First", value: "first" },
                        { label: "Second", value: "second" },
                        { label: "Third", value: "third" },
                    ]}
                    value="second"
                    onBlur={onBlur}
                />
            );
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onBlur).toHaveBeenCalledWith(expect.any(Object));
        });
    });
});
