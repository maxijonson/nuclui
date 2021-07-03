import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

interface Component<P extends object> {
    (props: P): React.ReactElement | null;
    readonly $$typeof: symbol;
    defaultProps?: Partial<Nui.Props<P>>;
    propTypes?: React.WeakValidationMap<Nui.Props<P>>;
    displayName?: string;
}

/**
 * Creates a suite of basic tests that often come back in most components
 *
 * @param Component The component that will be tested throughout the suite
 * @param props The props that should be given to the component. These should only include the required props. Optional props should be tested on their own. This parameters does **not** test the correct implementation of the required props. It simply provides what is expected to be provided by the client.
 * @returns A suite of multiple tests that can be individually called
 */
const createBasicTests = <P extends object>(
    Component: Component<P>,
    props: P
) => {
    /**
     * Tests that the component is able to mount/unmount without causing any errors
     *
     * @param container The tag that should wrap the component (the container)
     */
    const testRendering = (container = "div") => {
        describe("render", () => {
            it("should render without crashing", () => {
                const wrapper = document.createElement(container);
                ReactDOM.render(<Component {...props} />, wrapper);
                ReactDOM.unmountComponentAtNode(wrapper);
            });
        });
    };

    /**
     * Tests that the component has the correct `displayName` property
     *
     * @param displayName The `displayName` of the component itself
     * @param subDisplayName If any, the `displayName` of the first child of the component. Useful for components that are wrapped by a styled-component
     */
    const testDisplayName = (displayName: string, subDisplayName?: string) => {
        describe("displayName", () => {
            it("should display the correct name", () => {
                expect(Component.displayName).toEqual(displayName);
            });

            if (subDisplayName) {
                it("should display the correct sub component name", () => {
                    expect(
                        mount(<Component {...props} />)
                            .childAt(0)
                            .name()
                    ).toEqual(subDisplayName);
                });
            }
        });
    };

    /**
     * Tests that refs are correctly assigned to the component
     *
     * @param rootNode The tag that should have a ref
     * @param component If the component supports the `component` prop, tests that the `ref` works on a custom tag given by `component` param
     */
    const testRef = (rootNode: string, component?: string) => {
        describe("ref", () => {
            it("should have the ref forwarded to the default node", () => {
                const ref = React.createRef<HTMLElement>();
                const wrapper = mount(<Component {...props} ref={ref} />);
                const node = wrapper.find(rootNode).first().getDOMNode();
                expect(node).toBe(ref.current);
            });

            if (component) {
                it("should have the ref forwarded to the overriden node", () => {
                    const ref = React.createRef<HTMLElement>();
                    const wrapper = mount(
                        <Component {...props} component={component} ref={ref} />
                    );
                    const node = wrapper.find(component).first().getDOMNode();
                    expect(node).toBe(ref.current);
                });
            }
        });
    };

    /**
     * When the tested component supports a `component` prop, tests that this is handled correctly.
     *
     * @param defaultComponent the default tag name of the component when none is given
     * @param component the tag name used to test a custom component
     */
    const testComponent = (defaultComponent: string, component = "article") => {
        describe("component", () => {
            it(`should use ${component} as root node`, () => {
                const wrapper = mount(
                    <Component {...props} component={component} />
                );
                const root = wrapper.find(component).first();
                expect(root.length).toBe(1);
            });

            it(`should use ${defaultComponent} as default root node`, () => {
                const wrapper = mount(<Component {...props} />);
                const root = wrapper.find(defaultComponent).first();
                expect(root.length).toBe(1);
            });

            it(`should use ${defaultComponent} as root node`, () => {
                const wrapper = mount(
                    <Component {...props} component={defaultComponent} />
                );
                const root = wrapper.find(defaultComponent).first();
                expect(root.length).toBe(1);
            });
        });
    };

    /**
     * Tests that the component handles the `className` prop correctly
     *
     * @param rootNode the root tag of the component on which the `className` is added
     * @param className the component's main className
     */
    const testClassName = (rootNode: string, className: string) => {
        describe("className", () => {
            it("should use the default className", () => {
                const wrapper = mount(<Component {...props} />);
                const node = wrapper.find(rootNode).first();
                expect(node.hasClass(className)).toBeTruthy();
            });

            it("should use the default className with the one provided", () => {
                const wrapper = mount(
                    <Component {...props} className="test potato" />
                );
                const node = wrapper.find(rootNode).first();
                expect(node.hasClass(className)).toBeTruthy();
                expect(node.hasClass("test")).toBeTruthy();
                expect(node.hasClass("potato")).toBeTruthy();
            });
        });
    };

    return {
        testRendering,
        testDisplayName,
        testRef,
        testComponent,
        testClassName,
    } as const;
};

export default createBasicTests;
