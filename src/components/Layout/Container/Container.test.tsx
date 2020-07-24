import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow, CommonWrapper } from "enzyme";
import _ from "lodash";
import Container from "./Container";
import "jest-styled-components";

let bps: {
    [bp in Nui.Breakpoint]: { media: number | null; [key: string]: any };
};

const resetBps = () => {
    bps = {
        xs: { media: null }, // xs
        sm: { media: 620 }, // sm
        md: { media: 980 }, // md
        lg: { media: 1280 }, // lg
        xl: { media: 1920 }, // xl
    };
};

describe("Container", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Container />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(Container.displayName).toEqual("NuiContainer");
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
    });

    describe("maxWidth", () => {
        it("should use the default maxWidth", () => {
            const wrapper = mount(<Container>Container</Container>);
            expect(wrapper).toHaveStyleRule("max-width", undefined);
        });

        it("should use the sm maxWidth", () => {
            const wrapper = mount(
                <Container maxWidth="sm">Container</Container>
            );
            expect(wrapper).toHaveStyleRule("max-width", "620px", {
                media: "(min-width: 620px)",
            });
        });

        it("should use the md maxWidth", () => {
            const wrapper = mount(
                <Container maxWidth="md">Container</Container>
            );
            expect(wrapper).toHaveStyleRule("max-width", "980px", {
                media: "(min-width: 980px)",
            });
        });

        it("should use the lg maxWidth", () => {
            const wrapper = mount(
                <Container maxWidth="lg">Container</Container>
            );
            expect(wrapper).toHaveStyleRule("max-width", "1280px", {
                media: "(min-width: 1280px)",
            });
        });

        it("should use the xl maxWidth", () => {
            const wrapper = mount(
                <Container maxWidth="xl">Container</Container>
            );
            expect(wrapper).toHaveStyleRule("max-width", "1920px", {
                media: "(min-width: 1920px)",
            });
        });
    });

    describe("maxPadding", () => {
        beforeAll(() => {
            resetBps();
            bps.xs.padding = 16;
            bps.sm.padding = 25;
            bps.md.padding = 38;
            bps.lg.padding = 50;
            bps.xl.padding = 62;
        });

        beforeEach(() => {
            _.forEach(bps, (bp) => {
                bp.available = false;
            });
        });

        const assertQueries = (wrapper: CommonWrapper) => {
            _.forEach(bps, (bp) => {
                if (bp.available) {
                    expect(wrapper).toHaveStyleRule(
                        "padding-left",
                        `${bp.padding}px`,
                        bp.media
                            ? { media: `(min-width: ${bp.media}px)` }
                            : undefined
                    );
                    expect(wrapper).toHaveStyleRule(
                        "padding-right",
                        `${bp.padding}px`,
                        bp.media
                            ? { media: `(min-width: ${bp.media}px)` }
                            : undefined
                    );
                } else {
                    expect(wrapper).not.toHaveStyleRule(
                        "padding-left",
                        `${bp.padding}px`,
                        bp.media
                            ? { media: `(min-width: ${bp.media}px)` }
                            : undefined
                    );
                    expect(wrapper).not.toHaveStyleRule(
                        "padding-right",
                        `${bp.padding}px`,
                        bp.media
                            ? { media: `(min-width: ${bp.media}px)` }
                            : undefined
                    );
                }
            });
        };

        it("should use the default padding", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;
            bps.xl.available = true;

            assertQueries(shallow(<Container>Container</Container>));
        });

        it("should use the xs maxPadding", () => {
            bps.xs.available = true;

            assertQueries(
                shallow(<Container maxPadding="xs">Container</Container>)
            );
        });

        it("should use the sm maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;

            assertQueries(
                shallow(<Container maxPadding="sm">Container</Container>)
            );
        });

        it("should use the md maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;

            assertQueries(
                shallow(<Container maxPadding="md">Container</Container>)
            );
        });

        it("should use the lg maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;

            assertQueries(
                shallow(<Container maxPadding="lg">Container</Container>)
            );
        });

        it("should use the xl maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;
            bps.xl.available = true;

            assertQueries(
                shallow(<Container maxPadding="xl">Container</Container>)
            );
        });
    });
});
