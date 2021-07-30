/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import { mount } from "enzyme";
import useControllable from "./useControllable";

interface Props<T> {
    value?: T;
    defaultValue: T;
    testChange: T;
    onChange?: (value: T) => void;
    readOnly?: boolean;
}

function Component<T>(props: Props<T>) {
    const [controllableValue, controllableOnChange, readOnly, isControlled] =
        useControllable(props.defaultValue, props);

    React.useEffect(() => {
        controllableOnChange(props.testChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>{`value: ${controllableValue}, readOnly: ${readOnly}, isControlled: ${isControlled}`}</>
    );
}

function getExpectedValue(
    value: string,
    readOnly: boolean,
    isControlled: boolean
) {
    return `value: ${value}, readOnly: ${readOnly}, isControlled: ${isControlled}`;
}

describe("useControllable", () => {
    it("should be controlled", () => {
        const onChange = jest.fn();
        const value = "test";
        const defaultValue = "defaultValue";
        const testChange = "testChange";
        const wrapper = mount(
            <Component
                value={value}
                defaultValue={defaultValue}
                testChange={testChange}
                onChange={onChange}
            />
        );

        expect(wrapper.text()).toBe(getExpectedValue(value, false, true));
        expect(onChange).toHaveBeenCalledWith(testChange, undefined);
    });

    it("should be controlled and read-only when the readOnly prop is true", () => {
        const onChange = jest.fn();
        const value = "test";
        const defaultValue = "defaultValue";
        const testChange = "testChange";
        const wrapper = mount(
            <Component
                value={value}
                defaultValue={defaultValue}
                testChange={testChange}
                readOnly
                onChange={onChange}
            />
        );

        expect(wrapper.text()).toBe(getExpectedValue(value, true, true));
        expect(onChange).not.toHaveBeenCalled();
    });

    it("should be uncontrolled", () => {
        const defaultValue = "defaultValue";
        const testChange = "testChange";
        const wrapper = mount(
            <Component defaultValue={defaultValue} testChange={testChange} />
        );

        expect(wrapper.text()).toBe(getExpectedValue(testChange, false, false));
    });

    it("should be uncontrolled and read-only when the readOnly prop is true", () => {
        const defaultValue = "defaultValue";
        const testChange = "testChange";
        const wrapper = mount(
            <Component
                defaultValue={defaultValue}
                testChange={testChange}
                readOnly
            />
        );

        expect(wrapper.text()).toBe(
            getExpectedValue(defaultValue, true, false)
        );
    });

    it("should be uncontrolled and read-only when no onChange is supplied", () => {
        const value = "test";
        const defaultValue = "defaultValue";
        const testChange = "testChange";
        const wrapper = mount(
            <Component
                value={value}
                defaultValue={defaultValue}
                testChange={testChange}
            />
        );

        expect(wrapper.text()).toBe(getExpectedValue(value, true, false));
    });
});
