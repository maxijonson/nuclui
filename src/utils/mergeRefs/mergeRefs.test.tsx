import { mount } from "enzyme";
import React from "react";
import mergeRefs from "./mergeRefs";

type Ref =
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null;

interface Props {
    ref1: Ref;
    ref2: Ref;
    ref3: Ref;
}

describe("mergeRefs", () => {
    it("should merge refs", () => {
        const Component = (props: Props) => {
            const { ref1, ref2, ref3 } = props;
            const merged = mergeRefs(ref1, ref2, ref3);
            return <div ref={merged} children="test" />;
        };
        const ref1 = React.createRef<HTMLDivElement>();
        const ref2 = React.createRef<HTMLDivElement>();
        const ref3 = React.createRef<HTMLDivElement>();

        mount(<Component ref1={ref1} ref2={ref2} ref3={ref3} />);

        expect(ref1.current?.innerHTML).toBe("test");
        expect(ref2.current?.innerHTML).toBe("test");
        expect(ref3.current?.innerHTML).toBe("test");
    });

    it("should return null when no refs are given", () => {
        const Component = () => {
            const merged = mergeRefs();
            return <>{`${merged === null}`}</>;
        };
        const wrapper = mount(<Component />);
        expect(wrapper.text()).toBe("true");
    });

    it("should return the single ref when only one is given", () => {
        const Component = () => {
            const ref = React.useRef<HTMLDivElement>(null);
            const merged = mergeRefs(ref);
            if (typeof merged !== "object") return null;
            return (
                <div ref={merged}>{`${merged?.current === ref.current}`}</div>
            );
        };
        const wrapper = mount(<Component />);
        expect(wrapper.text()).toBe("true");
    });
});
