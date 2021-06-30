import React from "react";
import ReactDOM from "react-dom";
import { mount, ReactWrapper } from "enzyme";
import Container from "./Container";
import "jest-styled-components";
import { ContainerProps } from "./types";

describe("Container", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Container />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Container.displayName).toEqual("NuiStyledContainer");
        expect(
            mount(<Container />)
                .childAt(0)
                .name()
        ).toEqual("NuiContainer");
    });

    describe("component", () => {
        it("should use button as root node", () => {
            const text = "A button container";
            const wrapper = mount(
                <Container component="button">{text}</Container>
            );
            const root = wrapper.find("button").first();
            expect(root.length).toBe(1);
            expect(root.children().text()).toBe(text);
        });

        it("should use div as default root node", () => {
            const text = "A default container";
            const wrapper = mount(<Container>{text}</Container>);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
            expect(root.children().text()).toBe(text);
        });

        it("should use div as root node", () => {
            const text = "A default container";
            const wrapper = mount(
                <Container component="div">{text}</Container>
            );
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
            expect(root.children().text()).toBe(text);
        });
    });

    describe("ref", () => {
        it("should have the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<Container ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });

        it("should have the ref forwarded to the overriden node", () => {
            const ref = React.createRef<HTMLButtonElement>();
            const wrapper = mount(
                <Container component="button" ref={ref}>
                    Container
                </Container>
            );
            const btn = wrapper.find("button").first().getDOMNode();
            expect(btn).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<Container />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiContainer")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<Container className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiContainer")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("maxWidth", () => {
        const assertMaxWidth = (
            maxWidth: ContainerProps["maxWidth"],
            wrapper: ReactWrapper
        ) => {
            const container = wrapper.find(".NuiContainer").first();
            if (!maxWidth) {
                return expect(container.prop("className")).not.toContain(
                    "NuiContainer--maxWidth"
                );
            }
            expect(
                container.hasClass(`NuiContainer--maxWidth-${maxWidth}`)
            ).toBeTruthy();
        };

        it("should use the default maxWidth", () => {
            assertMaxWidth(undefined, mount(<Container />));
        });

        it("should use the xs maxWidth", () => {
            assertMaxWidth("xs", mount(<Container maxWidth="xs" />));
        });

        it("should use the sm maxWidth", () => {
            assertMaxWidth("sm", mount(<Container maxWidth="sm" />));
        });

        it("should use the md maxWidth", () => {
            assertMaxWidth("md", mount(<Container maxWidth="md" />));
        });

        it("should use the lg maxWidth", () => {
            assertMaxWidth("lg", mount(<Container maxWidth="lg" />));
        });

        it("should use the xl maxWidth", () => {
            assertMaxWidth("xl", mount(<Container maxWidth="xl" />));
        });
    });

    describe("maxPadding", () => {
        const assertMaxPadding = (
            maxPadding: ContainerProps["maxPadding"],
            wrapper: ReactWrapper
        ) => {
            const container = wrapper.find(".NuiContainer").first();
            if (!maxPadding) {
                return expect(container.prop("className")).not.toContain(
                    "NuiContainer--maxPadding"
                );
            }
            expect(
                container.hasClass(`NuiContainer--maxPadding-${maxPadding}`)
            ).toBeTruthy();
        };

        it("should use the default padding", () => {
            assertMaxPadding(undefined, mount(<Container />));
        });

        it("should use no padding", () => {
            assertMaxPadding("none", mount(<Container maxPadding="none" />));
        });

        it("should use the xs maxPadding", () => {
            assertMaxPadding("xs", mount(<Container maxPadding="xs" />));
        });

        it("should use the sm maxPadding", () => {
            assertMaxPadding("sm", mount(<Container maxPadding="sm" />));
        });

        it("should use the md maxPadding", () => {
            assertMaxPadding("md", mount(<Container maxPadding="md" />));
        });

        it("should use the lg maxPadding", () => {
            assertMaxPadding("lg", mount(<Container maxPadding="lg" />));
        });

        it("should use the xl maxPadding", () => {
            assertMaxPadding("xl", mount(<Container maxPadding="xl" />));
        });
    });

    describe("fixed", () => {
        const assertFixed = (
            fixed: ContainerProps["fixed"],
            wrapper: ReactWrapper
        ) => {
            const container = wrapper.find(".NuiContainer").first();
            if (!fixed) {
                return expect(container.prop("className")).not.toContain(
                    "NuiContainer--fixed"
                );
            }
            expect(container.hasClass("NuiContainer--fixed")).toBeTruthy();
        };

        it("should use the default fixed prop", () => {
            assertFixed(undefined, mount(<Container />));
        });

        it("should use the true fixed prop", () => {
            assertFixed(true, mount(<Container fixed />));
        });

        it("should use the false fixed prop", () => {
            assertFixed(false, mount(<Container fixed={false} />));
        });
    });
});
