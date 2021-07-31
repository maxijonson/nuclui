import React from "react";
import { mount } from "enzyme";
import useForceUpdate from "./useForceUpdate";

const Component = () => {
    const count = React.useRef(0);
    const forceUpdate = useForceUpdate();

    count.current += 1;

    React.useEffect(() => {
        forceUpdate();
    }, [forceUpdate]);

    return <>{count.current}</>;
};

describe("useForceUpdate", () => {
    it("should force update a component", () => {
        const wrapper = mount(<Component />);
        expect(wrapper.text()).toBe("2");
    });
});
