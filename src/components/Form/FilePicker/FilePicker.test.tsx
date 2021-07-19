import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import FilePicker from "./FilePicker";
import "jest-styled-components";

/** FIXME: FilePicker has been excluded from test coverage because it is too hard (or impossible?) to test file inputs */

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(FilePicker, {});

describe("FilePicker", () => {
    testRendering();
    testDisplayName("NuiFilePicker", "NuiStyledFilePicker");
    testRef("input");
    testClassName("div", "NuiFilePicker");

    describe("onFocus", () => {
        it("should call onFocus", () => {
            const onFocus = jest.fn();
            const wrapper = mount(<FilePicker onFocus={onFocus} />);
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onFocus).toHaveBeenCalledTimes(1);
        });
    });

    describe("onBlur", () => {
        it("should call onBlur", () => {
            const onBlur = jest.fn();
            const wrapper = mount(<FilePicker onBlur={onBlur} />);
            const input = wrapper.find("input");
            input.simulate("focus");
            input.simulate("blur");
            expect(onBlur).toHaveBeenCalledTimes(1);
        });
    });
});
