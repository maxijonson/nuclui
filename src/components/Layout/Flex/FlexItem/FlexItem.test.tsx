/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { mount, ReactWrapper } from "enzyme";
import mockConsole from "jest-mock-console";
import { nuiLog } from "@utils";
import FlexItem from "./FlexItem";
import "jest-styled-components";
import Flex from "../Flex";
import { FlexItemProps } from "./types";

let bps: {
    [bp in Nui.Breakpoint]: { media: number | null; [key: string]: any };
};

const resetBps = () => {
    bps = {
        xs: { media: null },
        sm: { media: 620 },
        md: { media: 980 },
        lg: { media: 1280 },
        xl: { media: 1920 },
    };
};

describe("FlexItem", () => {
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
        const assertGrow = (
            grow: FlexItemProps["grow"],
            wrapper: ReactWrapper
        ) => {
            const flexItem = wrapper.find(".NuiFlexItem").first();
            expect(flexItem.prop("style")).toHaveProperty("flexGrow", grow);
        };

        it("should have the default grow value", () => {
            assertGrow(undefined, mount(<FlexItem />));
        });

        it("should have the grow value of 2", () => {
            assertGrow(2, mount(<FlexItem grow={2} />));
        });

        it("should warn when using the grow value of -1", () => {
            mockConsole("warn");
            assertGrow(-1, mount(<FlexItem grow={-1} />));
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem grow prop should not be below 0."
            );
        });

        it("should use the parent provided grow value", () => {
            assertGrow(
                2,
                mount(
                    <Flex itemGrow={2}>
                        <FlexItem>Item</FlexItem>
                    </Flex>
                )
            );
        });

        it("should use its own grow value", () => {
            assertGrow(
                3,
                mount(
                    <Flex itemGrow={2}>
                        <FlexItem grow={3}>Item</FlexItem>
                    </Flex>
                )
            );
        });
    });

    describe("order", () => {
        const assertOrder = (
            order: FlexItemProps["order"],
            wrapper: ReactWrapper
        ) => {
            const flexItem = wrapper.find(".NuiFlexItem").first();
            expect(flexItem.prop("style")).toHaveProperty("order", order);
        };

        it("should have the default order value", () => {
            assertOrder(undefined, mount(<FlexItem />));
        });

        it("should have the order value of 1", () => {
            assertOrder(1, mount(<FlexItem order={1} />));
        });

        it("should have the order value of -1", () => {
            assertOrder(-1, mount(<FlexItem order={-1} />));
        });
    });

    describe("shrink", () => {
        const assertShrink = (
            shrink: FlexItemProps["shrink"],
            wrapper: ReactWrapper
        ) => {
            const flexItem = wrapper.find(".NuiFlexItem").first();
            expect(flexItem.prop("style")).toHaveProperty("flexShrink", shrink);
        };

        it("should have the default shrink value", () => {
            assertShrink(undefined, mount(<FlexItem />));
        });

        it("should have the shrink value of 2", () => {
            assertShrink(2, mount(<FlexItem shrink={2} />));
        });

        it("should warn when using the shrink value of -1", () => {
            mockConsole("warn");
            assertShrink(-1, mount(<FlexItem shrink={-1} />));
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem shrink prop should not be below 0."
            );
        });

        it("should use the parent provided shrink value", () => {
            assertShrink(
                2,
                mount(
                    <Flex itemShrink={2}>
                        <FlexItem>Item</FlexItem>
                    </Flex>
                )
            );
        });

        it("should use its own shrink value", () => {
            assertShrink(
                3,
                mount(
                    <Flex itemShrink={2}>
                        <FlexItem shrink={3}>Item</FlexItem>
                    </Flex>
                )
            );
        });
    });

    describe("basis", () => {
        beforeAll(() => resetBps());

        beforeEach(() => nuiLog.clearHistory());

        const assertBasis = (
            basis: FlexItemProps["basis"],
            wrapper: ReactWrapper
        ) => {
            const flexItem = wrapper.find(".NuiFlexItem").first();
            expect(flexItem.prop("style")).toHaveProperty("flexBasis", basis);
        };

        it("should use the default basis value", () => {
            assertBasis(undefined, mount(<FlexItem />));
        });

        it("should use a numeric basis value", () => {
            assertBasis("50%", mount(<FlexItem basis={6} />));
        });

        it("should use a custom basis value", () => {
            const basis = "25px";
            assertBasis(basis, mount(<FlexItem basis={basis} />));
        });

        it("should use the parent provided basis value", () => {
            const basis = "25%";
            assertBasis(
                basis,
                mount(
                    <Flex itemBasis={basis}>
                        <FlexItem>Item</FlexItem>
                    </Flex>
                )
            );
        });

        it("should use its own basis value", () => {
            const basis = "50%";
            assertBasis(
                basis,
                mount(
                    <Flex itemBasis="25%">
                        <FlexItem basis={basis}>Item</FlexItem>
                    </Flex>
                )
            );
        });

        it("should warn when using non-integer values", () => {
            mockConsole("warn");
            assertBasis("50%", mount(<FlexItem basis={5.5} />));
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be an integer. The rounded number will be used"
            );
        });

        it("should warn when using non-integer provided values", () => {
            mockConsole("warn");
            assertBasis(
                "50%",
                mount(
                    <Flex itemBasis={5.5}>
                        <FlexItem />
                    </Flex>
                )
            );
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be an integer. The rounded number will be used"
            );
        });

        it("should clamp non-integer values to the max", () => {
            mockConsole("warn");
            assertBasis("100%", mount(<FlexItem basis={12.6} />));
        });

        it("should clamp non-integer values to the min", () => {
            mockConsole("warn");
            assertBasis("0%", mount(<FlexItem basis={-0.6} />));
        });

        it("should warn when using values over max", () => {
            mockConsole("warn");
            assertBasis("100%", mount(<FlexItem basis={13} />));
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be between 0 and 12. Clamped value will be used."
            );
        });

        it("should warn when using provided values over max", () => {
            mockConsole("warn");
            assertBasis(
                "100%",
                mount(
                    <Flex itemBasis={13}>
                        <FlexItem />
                    </Flex>
                )
            );
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be between 0 and 12. Clamped value will be used."
            );
        });

        it("should warn when using values under min", () => {
            mockConsole("warn");
            assertBasis("0%", mount(<FlexItem basis={-1} />));
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be between 0 and 12. Clamped value will be used."
            );
        });

        it("should warn when using provided values under min", () => {
            mockConsole("warn");
            assertBasis(
                "0%",
                mount(
                    <Flex itemBasis={-1}>
                        <FlexItem />
                    </Flex>
                )
            );
            expect(console.warn).toHaveBeenCalledWith(
                "(NUI)",
                "FlexItem basis, when specified as a number, must be between 0 and 12. Clamped value will be used."
            );
        });
    });

    describe("align", () => {
        const assertAlign = (
            className: string | undefined,
            wrapper: ReactWrapper
        ) => {
            const flexItem = wrapper.find(".NuiFlexItem").first();
            if (!className) {
                return expect(flexItem.prop("className")).not.toContain(
                    "NuiFlexItem--align"
                );
            }
            expect(
                flexItem.hasClass(`NuiFlexItem--align-${className}`)
            ).toBeTruthy();
        };

        it("should use the default align value", () => {
            assertAlign(undefined, mount(<FlexItem />));
        });

        it("should use the auto align value", () => {
            assertAlign(undefined, mount(<FlexItem align="auto" />));
        });

        it("should use the flexStart align value", () => {
            assertAlign("fstart", mount(<FlexItem align="flexStart" />));
        });

        it("should use the flexEnd align value", () => {
            assertAlign("fend", mount(<FlexItem align="flexEnd" />));
        });

        it("should use the center align value", () => {
            assertAlign("center", mount(<FlexItem align="center" />));
        });

        it("should use the baseline align value", () => {
            assertAlign("base", mount(<FlexItem align="baseline" />));
        });

        it("should use the stretch align value", () => {
            assertAlign("stretch", mount(<FlexItem align="stretch" />));
        });
    });

    describe("spacing", () => {
        const assertSpacing = (
            className: string | undefined,
            padding: string | undefined,
            wrapper: ReactWrapper
        ) => {
            const flexItem = wrapper.find(".NuiFlexItem").first();
            if (className) {
                return expect(
                    flexItem.hasClass(`NuiFlexItem--spacing-${className}`)
                ).toBeTruthy();
            }
            expect(flexItem.prop("className")).not.toContain(
                "NuiFlexItem--spacing"
            );
            expect(flexItem.prop("style")).toHaveProperty("padding", padding);
        };

        it("should use the default spacing value", () => {
            assertSpacing(undefined, undefined, mount(<FlexItem />));
        });

        it("should use the xs spacing value", () => {
            assertSpacing("xs", undefined, mount(<FlexItem spacing="xs" />));
        });

        it("should use the sm spacing value", () => {
            assertSpacing(
                undefined,
                undefined,
                mount(<FlexItem spacing="sm" />)
            );
        });

        it("should use the md spacing value", () => {
            assertSpacing("md", undefined, mount(<FlexItem spacing="md" />));
        });

        it("should use the lg spacing value", () => {
            assertSpacing("lg", undefined, mount(<FlexItem spacing="lg" />));
        });

        it("should use the xl spacing value", () => {
            assertSpacing("xl", undefined, mount(<FlexItem spacing="xl" />));
        });

        it("should use the none spacing value", () => {
            assertSpacing(
                "none",
                undefined,
                mount(<FlexItem spacing="none" />)
            );
        });

        it("should use the custom spacing value", () => {
            assertSpacing(undefined, "7px", mount(<FlexItem spacing={7} />));
        });

        it("should use the parent provided spacing value", () => {
            assertSpacing(
                "xs",
                undefined,
                mount(
                    <Flex itemSpacing="xs">
                        <FlexItem>Item</FlexItem>
                    </Flex>
                )
            );
        });

        it("should use its own spacing value", () => {
            assertSpacing(
                undefined,
                "7px",
                mount(
                    <Flex itemSpacing="lg">
                        <FlexItem spacing={7}>Item</FlexItem>
                    </Flex>
                )
            );
        });
    });

    describe("breakpoints", () => {
        const assertBreakpoint = (
            basis: FlexItemProps["basis"],
            wrapper: ReactWrapper
        ) => {
            const flexItem = wrapper.find(".NuiFlexItem").first();
            expect(flexItem.prop("style")).toHaveProperty("flexBasis", basis);
        };

        it("should use the default value (no breakpoints)", () => {
            assertBreakpoint(undefined, mount(<FlexItem />));
        });

        describe.each(["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[])(
            "%s",
            (bpKey) => {
                beforeAll(() => {
                    const size = bps[bpKey].media ?? 100;
                    window.resizeTo(size, size / 2);
                });

                it(`should use a numeric ${bpKey} value`, () => {
                    assertBreakpoint(
                        "50%",
                        mount(<FlexItem {...{ [bpKey]: 6 }} />)
                    );
                });

                it(`should use a custom ${bpKey} value`, () => {
                    assertBreakpoint(
                        "25px",
                        mount(<FlexItem {...{ [bpKey]: "25px" }} />)
                    );
                });

                it(`should use the ${bpKey} value provided by the parent Flex`, () => {
                    assertBreakpoint(
                        "10px",
                        mount(
                            <Flex
                                {...{
                                    [`item${_.capitalize(bpKey)}`]: "10px",
                                }}
                            >
                                <FlexItem />
                            </Flex>
                        )
                    );
                });

                it(`should use its own ${bpKey} value`, () => {
                    assertBreakpoint(
                        "25px",
                        mount(
                            <Flex
                                {...{
                                    [`item${_.capitalize(bpKey)}`]: "10px",
                                }}
                            >
                                <FlexItem {...{ [bpKey]: "25px" }} />
                            </Flex>
                        )
                    );
                });
            }
        );

        describe("with basis", () => {
            const defaultBasis = "1337px";

            beforeEach(() => {
                bps.xs.basis = defaultBasis;
                bps.sm.basis = defaultBasis;
                bps.md.basis = defaultBasis;
                bps.lg.basis = defaultBasis;
                bps.xl.basis = defaultBasis;
            });

            describe.each(["xs", "sm", "md", "lg", "xl"] as Nui.Breakpoint[])(
                "%s",
                (bpKey) => {
                    it(`should use the basis as default with overriden ${bpKey} value`, () => {
                        bps[bpKey].basis = "25%";

                        _.forEach(bps, ({ media }, key) => {
                            const size = media ?? 100;
                            window.resizeTo(size, size / 2);
                            assertBreakpoint(
                                key == bpKey ? "25%" : defaultBasis,
                                mount(
                                    <FlexItem
                                        basis={defaultBasis}
                                        {...{ [bpKey]: "25%" }}
                                    />
                                )
                            );
                        });
                    });

                    it(`should use the basis as default with overriden numeric ${bpKey} value`, () => {
                        bps[bpKey].basis = "50%";

                        _.forEach(bps, ({ media }, key) => {
                            const size = media ?? 100;
                            window.resizeTo(size, size / 2);
                            assertBreakpoint(
                                key == bpKey ? "50%" : defaultBasis,
                                mount(
                                    <FlexItem
                                        basis={defaultBasis}
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
