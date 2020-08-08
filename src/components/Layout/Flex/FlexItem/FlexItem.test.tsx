import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { mount, shallow, CommonWrapper } from "enzyme";
import mockConsole from "jest-mock-console";
import FlexItem from "./FlexItem";
import "jest-styled-components";
import Flex from "../Flex";
import { FlexItemProps } from "./types";

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

describe("Flex", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<FlexItem />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should display the correct name", () => {
        expect(FlexItem.displayName).toEqual("NuiFlexItem");
    });

    describe("component", () => {
        it("should use button as root node", () => {
            const wrapper = mount(<FlexItem component="button" />);
            const root = wrapper.find("button").first();
            expect(root.length).toBe(1);
        });

        it("should use div as default root node", () => {
            const wrapper = mount(<FlexItem />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });

        it("should use div as root node", () => {
            const wrapper = mount(<FlexItem component="div" />);
            const root = wrapper.find("div").first();
            expect(root.length).toBe(1);
        });
    });

    describe("ref", () => {
        it("should have the ref forwarded to the default node", () => {
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = mount(<FlexItem ref={ref} />);
            const div = wrapper.find("div").first().getDOMNode();
            expect(div).toBe(ref.current);
        });

        it("should have the ref forwarded to the overriden node", () => {
            const ref = React.createRef<HTMLButtonElement>();
            const wrapper = mount(<FlexItem component="button" ref={ref} />);
            const btn = wrapper.find("button").first().getDOMNode();
            expect(btn).toBe(ref.current);
        });
    });

    describe("className", () => {
        it("should use the default className", () => {
            const wrapper = mount(<FlexItem />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiFlexItem")).toBeTruthy();
        });

        it("should use the default className with the one provided", () => {
            const wrapper = mount(<FlexItem className="test potato" />);
            const div = wrapper.find("div").first();
            expect(div.hasClass("NuiFlexItem")).toBeTruthy();
            expect(div.hasClass("test")).toBeTruthy();
            expect(div.hasClass("potato")).toBeTruthy();
        });
    });

    describe("grow", () => {
        it("should have the default grow value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("flex-grow", "1");
        });

        it("should have the grow value of 2", () => {
            const wrapper = shallow(<FlexItem grow={2} />);
            expect(wrapper).toHaveStyleRule("flex-grow", "2");
        });

        it("should warn when using the grow value of -1", () => {
            mockConsole("warn");
            const wrapper = mount(<FlexItem grow={-1} />);
            expect(wrapper).toHaveStyleRule("flex-grow", "-1");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem grow prop should not be below 0."
            );
        });

        it("should use the parent provided grow value", () => {
            const wrapper = mount(
                <Flex itemGrow={2}>
                    <FlexItem>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            expect(provided).toHaveStyleRule("flex-grow", "2");
        });

        it("should use its own grow value", () => {
            const wrapper = mount(
                <Flex itemGrow={2}>
                    <FlexItem grow={3}>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            expect(provided).toHaveStyleRule("flex-grow", "3");
        });
    });

    describe("order", () => {
        it("should have the default order value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("order", "0");
        });

        it("should have the order value of 1", () => {
            const wrapper = shallow(<FlexItem order={1} />);
            expect(wrapper).toHaveStyleRule("order", "1");
        });

        it("should have the order value of -1", () => {
            const wrapper = shallow(<FlexItem order={-1} />);
            expect(wrapper).toHaveStyleRule("order", "-1");
        });
    });

    describe("shrink", () => {
        it("should have the default shrink value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("flex-shrink", "1");
        });

        it("should have the shrink value of 2", () => {
            const wrapper = shallow(<FlexItem shrink={2} />);
            expect(wrapper).toHaveStyleRule("flex-shrink", "2");
        });

        it("should warn when using the shrink value of -1", () => {
            mockConsole("warn");
            const wrapper = mount(<FlexItem shrink={-1} />);
            expect(wrapper).toHaveStyleRule("flex-shrink", "-1");
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem shrink prop should not be below 0."
            );
        });

        it("should use the parent provided shrink value", () => {
            const wrapper = mount(
                <Flex itemShrink={2}>
                    <FlexItem>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            expect(provided).toHaveStyleRule("flex-shrink", "2");
        });

        it("should use its own shrink value", () => {
            const wrapper = mount(
                <Flex itemShrink={2}>
                    <FlexItem shrink={3}>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            expect(provided).toHaveStyleRule("flex-shrink", "3");
        });
    });

    describe("basis", () => {
        beforeAll(() => resetBps());

        const assertBasis = (
            basis: FlexItemProps["basis"],
            wrapper: CommonWrapper
        ) => {
            expect(wrapper).toHaveStyleRule("flex-basis", basis);
            expect(wrapper).toHaveStyleRule("flex-basis", basis, {
                media: `(min-width: ${bps.sm.media}px)`,
            });
            expect(wrapper).toHaveStyleRule("flex-basis", basis, {
                media: `(min-width: ${bps.md.media}px)`,
            });
            expect(wrapper).toHaveStyleRule("flex-basis", basis, {
                media: `(min-width: ${bps.lg.media}px)`,
            });
            expect(wrapper).toHaveStyleRule("flex-basis", basis, {
                media: `(min-width: ${bps.xl.media}px)`,
            });
        };

        it("should use the default basis value", () => {
            const wrapper = shallow(<FlexItem />);
            _.forEach(bps, ({ media }) => {
                expect(wrapper).not.toHaveStyleRule(
                    "flex-basis",
                    expect.any(String),
                    media ? { media: `(min-width: ${media}px)` } : undefined
                );
            });
        });

        it("should use a numeric basis value", () => {
            const wrapper = shallow(<FlexItem basis={6} />);
            assertBasis("50%", wrapper);
        });

        it("should use a custom basis value", () => {
            const basis = "25px";
            const wrapper = shallow(<FlexItem basis={basis} />);
            assertBasis(basis, wrapper);
        });

        it("should use the parent provided basis value", () => {
            const basis = "25%";
            const wrapper = mount(
                <Flex itemBasis={basis}>
                    <FlexItem>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            assertBasis(basis, provided);
        });

        it("should use its own basis value", () => {
            const basis = "50%";
            const wrapper = mount(
                <Flex itemBasis="25%">
                    <FlexItem basis={basis}>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            assertBasis(basis, provided);
        });

        it("should warn when using non-integer values", () => {
            mockConsole("warn");
            const wrapper = shallow(<FlexItem basis={5.5} />);
            expect(wrapper).toHaveStyleRule("flex-basis", "50%");
            expect(console.warn).toHaveBeenLastCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be an integer. The rounded number will be used"
            );
        });

        it("should clamp non-integer values to the max", () => {
            const wrapper = shallow(<FlexItem basis={12.6} />);
            expect(wrapper).toHaveStyleRule("flex-basis", "100%");
        });

        it("should clamp non-integer values to the min", () => {
            const wrapper = shallow(<FlexItem basis={-0.6} />);
            expect(wrapper).toHaveStyleRule("flex-basis", `0%`);
        });

        it("should warn when using values over max", () => {
            mockConsole("warn");
            const wrapper = shallow(<FlexItem basis={13} />);
            expect(console.warn).toHaveBeenLastCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be between 0 and 12. Clamped value will be used."
            );
            expect(wrapper).toHaveStyleRule("flex-basis", "100%");
        });

        it("should warn when using values under min", () => {
            mockConsole("warn");
            const wrapper = shallow(<FlexItem basis={-1} />);
            expect(console.warn).toHaveBeenLastCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be between 0 and 12. Clamped value will be used."
            );
            expect(wrapper).toHaveStyleRule("flex-basis", `0%`);
        });
    });

    describe("align", () => {
        it("should use the default align value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("align-self", "auto");
        });

        it("should use the auto align value", () => {
            const wrapper = shallow(<FlexItem align="auto" />);
            expect(wrapper).toHaveStyleRule("align-self", "auto");
        });

        it("should use the flexStart align value", () => {
            const wrapper = shallow(<FlexItem align="flexStart" />);
            expect(wrapper).toHaveStyleRule("align-self", "flex-start");
        });

        it("should use the flexEnd align value", () => {
            const wrapper = shallow(<FlexItem align="flexEnd" />);
            expect(wrapper).toHaveStyleRule("align-self", "flex-end");
        });

        it("should use the center align value", () => {
            const wrapper = shallow(<FlexItem align="center" />);
            expect(wrapper).toHaveStyleRule("align-self", "center");
        });

        it("should use the baseline align value", () => {
            const wrapper = shallow(<FlexItem align="baseline" />);
            expect(wrapper).toHaveStyleRule("align-self", "baseline");
        });

        it("should use the stretch align value", () => {
            const wrapper = shallow(<FlexItem align="stretch" />);
            expect(wrapper).toHaveStyleRule("align-self", "stretch");
        });
    });

    describe("spacing", () => {
        it("should use the default spacing value", () => {
            const wrapper = shallow(<FlexItem />);
            expect(wrapper).toHaveStyleRule("padding", "10px");
        });

        it("should use the xs spacing value", () => {
            const wrapper = shallow(<FlexItem spacing="xs" />);
            expect(wrapper).toHaveStyleRule("padding", "5px");
        });

        it("should use the sm spacing value", () => {
            const wrapper = shallow(<FlexItem spacing="sm" />);
            expect(wrapper).toHaveStyleRule("padding", "10px");
        });

        it("should use the md spacing value", () => {
            const wrapper = shallow(<FlexItem spacing="md" />);
            expect(wrapper).toHaveStyleRule("padding", "15px");
        });

        it("should use the lg spacing value", () => {
            const wrapper = shallow(<FlexItem spacing="lg" />);
            expect(wrapper).toHaveStyleRule("padding", "20px");
        });

        it("should use the xl spacing value", () => {
            const wrapper = shallow(<FlexItem spacing="xl" />);
            expect(wrapper).toHaveStyleRule("padding", "30px");
        });

        it("should use the none spacing value", () => {
            const wrapper = shallow(<FlexItem spacing="none" />);
            expect(wrapper).toHaveStyleRule("padding", "0px");
        });

        it("should use the custom spacing value", () => {
            const wrapper = shallow(<FlexItem spacing={7} />);
            expect(wrapper).toHaveStyleRule("padding", "7px");
        });

        it("should use the parent provided spacing value", () => {
            const wrapper = mount(
                <Flex itemSpacing="xs">
                    <FlexItem>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            expect(provided).toHaveStyleRule("padding", "5px");
        });

        it("should use its own spacing value", () => {
            const wrapper = mount(
                <Flex itemSpacing="lg">
                    <FlexItem spacing={7}>Item</FlexItem>
                </Flex>
            );
            const provided = wrapper.find(FlexItem);
            expect(provided).toHaveStyleRule("padding", "7px");
        });
    });

    describe("breakpoints", () => {
        beforeAll(() => resetBps());

        beforeEach(() => {
            bps.xs.basis = undefined;
            bps.sm.basis = undefined;
            bps.md.basis = undefined;
            bps.lg.basis = undefined;
            bps.xl.basis = undefined;
        });

        const assertQueries = (wrapper: CommonWrapper) => {
            _.forEach(bps, ({ media, basis }) => {
                if (basis) {
                    expect(wrapper).toHaveStyleRule(
                        "flex-basis",
                        basis,
                        media ? { media: `(min-width: ${media}px)` } : undefined
                    );
                } else {
                    expect(wrapper).not.toHaveStyleRule(
                        "flex-basis",
                        expect.any(String),
                        media ? { media: `(min-width: ${media}px)` } : undefined
                    );
                }
            });
        };

        _.forEach(
            ["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[],
            (bpKey) => {
                describe(bpKey, () => {
                    it(`should use the default ${bpKey} value`, () => {
                        assertQueries(shallow(<FlexItem />));
                    });

                    it(`should use a numeric ${bpKey} value`, () => {
                        bps[bpKey].basis = "50%";
                        assertQueries(
                            shallow(<FlexItem {...{ [bpKey]: 6 }} />)
                        );
                    });

                    it(`should use a custom ${bpKey} value`, () => {
                        bps[bpKey].basis = "25px";
                        assertQueries(
                            shallow(<FlexItem {...{ [bpKey]: "25px" }} />)
                        );
                    });

                    it(`should use the ${bpKey} value provided by the parent Flex`, () => {
                        const wrapper = mount(
                            <Flex
                                {...{
                                    [`item${_.capitalize(bpKey)}`]: "10px",
                                }}
                            >
                                <FlexItem />
                            </Flex>
                        );

                        bps[bpKey].basis = "10px";
                        assertQueries(wrapper.find(FlexItem));
                    });

                    it(`should use its own ${bpKey} value`, () => {
                        const wrapper = mount(
                            <Flex
                                {...{
                                    [`item${_.capitalize(bpKey)}`]: "10px",
                                }}
                            >
                                <FlexItem {...{ [bpKey]: "25px" }} />
                            </Flex>
                        );

                        bps[bpKey].basis = "25px";
                        assertQueries(wrapper.find(FlexItem));
                    });
                });
            }
        );

        describe("with basis", () => {
            const basis = "1337px";

            beforeEach(() => {
                bps.xs.basis = basis;
                bps.sm.basis = basis;
                bps.md.basis = basis;
                bps.lg.basis = basis;
                bps.xl.basis = basis;
            });

            _.forEach(
                ["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[],
                (bpKey) => {
                    describe(bpKey, () => {
                        it(`should use the basis as default with overriden ${bpKey} value`, () => {
                            bps[bpKey].basis = "25%";
                            assertQueries(
                                shallow(
                                    <FlexItem
                                        basis={basis}
                                        {...{ [bpKey]: "25%" }}
                                    />
                                )
                            );
                        });

                        it(`should use the basis as default with overriden numeric ${bpKey} value`, () => {
                            bps[bpKey].basis = "50%";
                            assertQueries(
                                shallow(
                                    <FlexItem
                                        basis={basis}
                                        {...{ [bpKey]: 6 }}
                                    />
                                )
                            );
                        });
                    });
                }
            );
        });
    });
});
