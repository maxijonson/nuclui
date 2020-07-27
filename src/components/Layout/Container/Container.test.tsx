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

    describe("as", () => {
        it("should use button as root node", () => {
            const text = "A button container";
            const wrapper = mount(<Container as="button">{text}</Container>);
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
            const wrapper = mount(<Container as="div">{text}</Container>);
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
                <Container as="button" ref={ref}>
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
        beforeAll(() => {
            resetBps();
        });

        it("should use the default maxWidth", () => {
            const wrapper = mount(<Container />);
            expect(wrapper).toHaveStyleRule("max-width", undefined);
        });

        it("should use the xs maxWidth", () => {
            const wrapper = mount(<Container maxWidth="xs" />);
            expect(wrapper).toHaveStyleRule("max-width", undefined);
            expect(wrapper).toHaveStyleRule("width", "100%");
        });

        it("should use the sm maxWidth", () => {
            const wrapper = mount(<Container maxWidth="sm" />);
            expect(wrapper).toHaveStyleRule("max-width", `${bps.sm.media}px`, {
                media: `(min-width: ${bps.sm.media}px)`,
            });
        });

        it("should use the md maxWidth", () => {
            const wrapper = mount(<Container maxWidth="md" />);
            expect(wrapper).toHaveStyleRule("max-width", `${bps.md.media}px`, {
                media: `(min-width: ${bps.md.media}px)`,
            });
        });

        it("should use the lg maxWidth", () => {
            const wrapper = mount(<Container maxWidth="lg" />);
            expect(wrapper).toHaveStyleRule("max-width", `${bps.lg.media}px`, {
                media: `(min-width: ${bps.lg.media}px)`,
            });
        });

        it("should use the xl maxWidth", () => {
            const wrapper = mount(<Container maxWidth="xl" />);
            expect(wrapper).toHaveStyleRule("max-width", `${bps.xl.media}px`, {
                media: `(min-width: ${bps.xl.media}px)`,
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

            assertQueries(shallow(<Container />));
        });

        it("should use no padding", () => {
            assertQueries(shallow(<Container maxPadding="none" />));
        });

        it("should use the xs maxPadding", () => {
            bps.xs.available = true;

            assertQueries(shallow(<Container maxPadding="xs" />));
        });

        it("should use the sm maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;

            assertQueries(shallow(<Container maxPadding="sm" />));
        });

        it("should use the md maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;

            assertQueries(shallow(<Container maxPadding="md" />));
        });

        it("should use the lg maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;

            assertQueries(shallow(<Container maxPadding="lg" />));
        });

        it("should use the xl maxPadding", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;
            bps.xl.available = true;

            assertQueries(shallow(<Container maxPadding="xl" />));
        });
    });

    describe("fixed", () => {
        beforeAll(() => resetBps());

        beforeEach(() => {
            _.forEach(bps, (bp) => {
                bp.available = false;
            });
        });

        const assertQueries = (wrapper: CommonWrapper) => {
            _.forEach(bps, (bp, key) => {
                if (key == "xs") return;

                if (bp.available) {
                    expect(wrapper).toHaveStyleRule(
                        "max-width",
                        `${bp.media}px`,
                        bp.media
                            ? { media: `(min-width: ${bp.media}px)` }
                            : undefined
                    );
                } else {
                    expect(wrapper).not.toHaveStyleRule(
                        "max-width",
                        `${bp.media}px`,
                        bp.media
                            ? { media: `(min-width: ${bp.media}px)` }
                            : undefined
                    );
                }
            });
        };

        it("should use the max-width of every breakpoints", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;
            bps.xl.available = true;

            assertQueries(shallow(<Container fixed />));
        });

        it("should use the max-width up to xs", () => {
            bps.xs.available = true;

            assertQueries(shallow(<Container fixed maxWidth="xs" />));
        });

        it("should use the max-width up to sm", () => {
            bps.xs.available = true;
            bps.sm.available = true;

            assertQueries(shallow(<Container fixed maxWidth="sm" />));
        });

        it("should use the max-width up to md", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;

            assertQueries(shallow(<Container fixed maxWidth="md" />));
        });

        it("should use the max-width up to lg", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;

            assertQueries(shallow(<Container fixed maxWidth="lg" />));
        });

        it("should use the max-width up to xl", () => {
            bps.xs.available = true;
            bps.sm.available = true;
            bps.md.available = true;
            bps.lg.available = true;
            bps.xl.available = true;

            assertQueries(shallow(<Container fixed maxWidth="xl" />));
        });
    });
});
