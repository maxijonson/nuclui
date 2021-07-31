import React from "react";
import { mount } from "enzyme";
import mockConsole from "jest-mock-console";
import useMediaQuery from "./useMediaQuery";

const Component = () => {
    const matches = useMediaQuery({
        test: "(min-width: 600px)",
    });

    return <>{`${matches.test}`}</>;
};

describe("useMediaQuery", () => {
    beforeAll(() => {
        // Suppress MediaQueryContext warnings
        mockConsole("warn");
    });

    it("should initially match the query", () => {
        window.resizeTo(600, 600);
        const wrapper = mount(<Component />);

        expect(wrapper.text()).toBe("true");
    });

    it("should not initially match the query", () => {
        window.resizeTo(599, 599);
        const wrapper = mount(<Component />);

        expect(wrapper.text()).toBe("false");
    });
});
