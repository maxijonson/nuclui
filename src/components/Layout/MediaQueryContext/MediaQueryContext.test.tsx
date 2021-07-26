import React from "react";
import { mount } from "enzyme";
import _ from "lodash";
import mockConsole from "jest-mock-console";
import { nuiLog } from "@utils";
import { createBasicTests } from "@utils/test";
import MediaQueryContext from "./MediaQueryContext";
import MediaQueryCtx from "./MediaQueryCtx";
import "jest-styled-components";

const { testDisplayName, testRendering } = createBasicTests(
    MediaQueryContext,
    {}
);

const Component = () => {
    const ctx = React.useContext(MediaQueryCtx);
    ctx.registerQuery("(min-width: 620px)");
    return <div className="wrapper">{_.size(ctx.queries)}</div>;
};

describe("MediaQueryContext", () => {
    beforeEach(() => {
        mockConsole("error");
        nuiLog.clearHistory();
    });

    testRendering();
    testDisplayName("NuiMediaQueryContext");

    describe("MediaQueryCtx", () => {
        describe("queries", () => {
            it("should give the default queries", () => {
                const wrapper = mount(<Component />);
                expect(wrapper.find(".wrapper").text()).toBe("0");
            });

            it("should give the provided queries", () => {
                const wrapper = mount(
                    <MediaQueryCtx.Provider
                        value={{
                            queries: { "(min-width: 620px)": true },
                            registerQuery: (_query) => true,
                        }}
                    >
                        <Component />
                    </MediaQueryCtx.Provider>
                );
                expect(wrapper.find(".wrapper").text()).toBe("1");
            });
        });

        describe("registerQuery", () => {
            it("should use the default registerQuery", () => {
                mount(<Component />);
                expect(console.error).toHaveBeenCalledTimes(1);
            });

            it("should use the provided registerQuery", () => {
                const registerQuery = jest.fn();
                mount(
                    <MediaQueryCtx.Provider
                        value={{
                            queries: {},
                            registerQuery,
                        }}
                    >
                        <Component />
                    </MediaQueryCtx.Provider>
                );
                expect(console.error).toHaveBeenCalledTimes(0);
                expect(registerQuery).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe("MediaQueryContext", () => {
        it("should register a new query", () => {
            const wrapper = mount(
                <MediaQueryContext>
                    <Component />
                </MediaQueryContext>
            );
            expect(wrapper.find(".wrapper").text()).toBe("1");
        });
    });
});
